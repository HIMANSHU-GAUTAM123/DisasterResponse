const { supabase } = require('../supabase/client');

async function getCache(key) {
  const { data, error } = await supabase
    .from('cache')
    .select('*')
    .eq('key', key)
    .single();
  if (error || !data) return null;
  const now = Date.now();
  if (now - new Date(data.created_at).getTime() > 3600000) {
    // TTL expired
    await supabase.from('cache').delete().eq('key', key);
    return null;
  }
  return data.value;
}

async function setCache(key, value) {
  await supabase
    .from('cache')
    .upsert({ key, value, created_at: new Date().toISOString() });
}

module.exports = { getCache, setCache }; 