const { supabase } = require('../supabase/client');

async function seedSampleData() {
  // Sample disasters
  const disasters = [
    { title: 'Flood in Mock City', description: 'Severe flooding reported.', location: 'Mock City', tags: ['flood'], geography: 'SRID=4326;POINT(77.2 28.6)' },
    { title: 'Earthquake in Demo Town', description: 'Major earthquake felt.', location: 'Demo Town', tags: ['earthquake'], geography: 'SRID=4326;POINT(78.0 27.5)' }
  ];
  await supabase.from('disasters').insert(disasters);

  // Sample resources
  const resources = [
    { name: 'Rescue Boat', type: 'boat', location: 'Mock City', available: true, tags: ['rescue'], geography: 'SRID=4326;POINT(77.21 28.61)' },
    { name: 'Medical Team', type: 'medical', location: 'Demo Town', available: true, tags: ['medical'], geography: 'SRID=4326;POINT(78.01 27.51)' }
  ];
  await supabase.from('resources').insert(resources);

  console.log('Sample data seeded.');
}

if (require.main === module) {
  seedSampleData();
}

module.exports = { seedSampleData }; 