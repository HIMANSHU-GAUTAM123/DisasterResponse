const axios = require('axios');
const { supabase } = require('../supabase/client');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function geocodeLocation(locationName) {
  const cacheKey = `geocode-${Buffer.from(locationName).toString('base64')}`;

  // Check cache first
  const { data: cached } = await supabase
    .from('cache')
    .select('value')
    .eq('key', cacheKey)
    .gt('created_at', new Date(Date.now() - 3600000).toISOString()) // 1 hour TTL
    .single();

  if (cached) return cached.value;

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: locationName,
          key: GOOGLE_MAPS_API_KEY
        }
      }
    );

    if (response.data.status !== 'OK' || !response.data.results.length) {
      throw new Error('No location found');
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    const result = { lat, lng };

    // Cache the result
    await supabase
      .from('cache')
      .upsert({
        key: cacheKey,
        value: result,
        created_at: new Date().toISOString()
      });

    return result;
  } catch (error) {
    console.error(`Geocoding failed for ${locationName}: ${error}`);
    throw new Error(`Geocoding failed: ${error.message}`);
  }
}

async function reverseGeocode(lat, lng) {
  if (!GOOGLE_MAPS_API_KEY) {
    // Mock response
    return { place: `Lat: ${lat}, Lng: ${lng}` };
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
  const res = await axios.get(url);
  const result = res.data.results[0];
  return { place: result ? result.formatted_address : '' };
}

module.exports = { geocodeLocation, reverseGeocode }; 