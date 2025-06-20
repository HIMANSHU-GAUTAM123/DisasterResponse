const { supabase } = require('../supabase/client');

async function getNearbyResources(req, res) {
  const { lat, lng, radius_km } = req.query;
  
  // Validate inputs
  if (!lat || !lng || !radius_km) {
    return res.status(400).json({ error: 'lat, lng, and radius_km are required' });
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  const radiusNum = parseFloat(radius_km);

  if (isNaN(latNum) || isNaN(lngNum) || isNaN(radiusNum)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers' });
  }

  try {
    const { data, error } = await supabase
      .rpc('get_nearby_resources', {
        lat: latNum,
        lng: lngNum,
        radius_meters: radiusNum * 1000  // Convert km to meters
      });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ 
      error: 'Geospatial query failed',
      details: err.message 
    });
  }
}
module.exports = { getNearbyResources };