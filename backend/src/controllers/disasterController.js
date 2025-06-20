const { supabase } = require('../supabase/client');
const { extractLocationFromText } = require('../services/geminiService');
const { geocodeLocation } = require('../services/geocodingService');

// Helper: emit update to all clients
function emitDisasterUpdate(io) {
  io.emit('disaster:update');
}

// Helper: audit log
async function logAudit(action, user, disasterId, details = {}) {
  await supabase.from('audit_logs').insert({
    action,
    user,
    disaster_id: disasterId,
    details,
    timestamp: new Date().toISOString()
  });
}

// Create disaster
async function createDisaster(req, res) {
  let { title, description, location, lat, lng, tags, image_url } = req.body;
  const user = req.user?.role || 'unknown';
  const now = new Date().toISOString();
  let image_verified = null;

  
if (!location) {
  try {
   const extract = await extractLocationFromText(description);
    console.log('Extracted location from text:', extract);
    location = extract;
    console.log('Location:', location);
    const geo = await geocodeLocation(location);
    console.log('Geocoded location:', geo);
    lat = geo.lat;
    lng = geo.lng;
  } catch (e) {
    // fallback to 0,0 if extraction/geocoding fails
    lat = lat || 0;
    lng = lng || 0;
    console.error('Error in extractLocationFromText or geocodeLocation:', e);
  }
}
else{
  const geo = await geocodeLocation(location);
  console.log('Geocoded location:', geo);
  lat = geo.lat;
  lng = geo.lng;
}
// ... existing code ...

  // If image_url provided, verify image
  if (image_url) {
    try {
      const verification = await require('../services/geminiService').verifyImage(image_url);
      image_verified = verification;
    } catch (e) {
      image_verified = { error: 'Verification failed' };
    }
  }

  const { data, error } = await supabase
    .from('disasters')
    .insert([{ title, description, location, tags, geography: `SRID=4326;POINT(${lng} ${lat})`, created_by: user, updated_by: user, created_at: now, updated_at: now, image_url, image_verified }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  await logAudit('create', user, data[0].id, { title });
  emitDisasterUpdate(req.io);
  res.status(201).json(data[0]);
}

// Read all disasters (with optional geospatial filter)
async function getDisasters(req, res) {
  const { lat, lng, radius_km } = req.query;
  let query =   supabase.from('disasters_with_latlng').select('*');
  if (lat && lng && radius_km) {
    query = query.filter('geography', 'st_dwithin', `SRID=4326;POINT(${lng} ${lat}),${radius_km * 1000}`);
  }
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
}

// Update disaster
async function updateDisaster(req, res) {
  const { id } = req.params;
  const { title, description, location, lat, lng, tags } = req.body;
  const user = req.user?.role || 'unknown';
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('disasters')
    .update({ title, description, location, tags, geography: `SRID=4326;POINT(${lng} ${lat})`, updated_by: user, updated_at: now })
    .eq('id', id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  await logAudit('update', user, id, { title });
  emitDisasterUpdate(req.io);
  res.json(data[0]);
}

// Delete disaster
async function deleteDisaster(req, res) {
  const { id } = req.params;
  const user = req.user?.role || 'unknown';
  const { error } = await supabase.from('disasters').delete().eq('id', id);
  console.log('Error:', error);
  if (error) return res.status(400).json({ error: error.message });
  await logAudit('delete', user, id);
  emitDisasterUpdate(req.io);
  res.status(204).send();
}

module.exports = { createDisaster, getDisasters, updateDisaster, deleteDisaster }; 