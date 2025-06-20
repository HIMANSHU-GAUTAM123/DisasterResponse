function getMockFeed() {
  // Simulate a feed of disaster-related tweets
  return [
    { id: 1, user: 'RescueOrg', text: 'Flooding reported in Mock City. Stay safe!', timestamp: Date.now() },
    { id: 2, user: 'WeatherAlert', text: 'Severe storm warning for Demo Town.', timestamp: Date.now() },
    { id: 3, user: 'Citizen', text: 'Roads blocked due to landslide in Testville.', timestamp: Date.now() },
    { id: 4, user: 'ReliefTeam', text: 'Food and water distribution at Central Park, Mock City.', timestamp: Date.now() - 1000000 },
    { id: 5, user: 'FireDept', text: 'Wildfire contained near Sample Forest. Area safe now.', timestamp: Date.now() - 2000000 },
    { id: 6, user: 'LocalNews', text: 'Power outage reported in Northside after heavy rains.', timestamp: Date.now() - 3000000 },
    { id: 7, user: 'Volunteer', text: 'Volunteers needed at Demo Town Community Center.', timestamp: Date.now() - 4000000 },
    { id: 8, user: 'HealthOrg', text: 'Mobile clinic set up for flood victims in Mock City.', timestamp: Date.now() - 5000000 },
    { id: 9, user: 'Citizen2', text: 'Sharing photos of rescue operations in Testville.', timestamp: Date.now() - 6000000 },
    { id: 10, user: 'WeatherAlert', text: 'Heatwave expected next week. Stay hydrated!', timestamp: Date.now() - 7000000 }
  ];
}

module.exports = { getMockFeed }; 