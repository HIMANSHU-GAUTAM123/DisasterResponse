import React, { useState, useEffect } from 'react';
import { getNearbyResources, getDisasters } from '../services/api';

const cardStyle = {
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: 20,
  marginBottom: 18,
  display: 'flex',
  flexDirection: 'column',
  gap: 6
};

const Resources = () => {
  const [query, setQuery] = useState({ lat: '', lng: '', radius_km: 5 });
  const [results, setResults] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [selectedDisasterId, setSelectedDisasterId] = useState('');

  useEffect(() => {
    (async () => {
      setDisasters(await getDisasters());
    })();
  }, []);

  const handleChange = e => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleDisasterSelect = async e => {
    const id = e.target.value;
    setSelectedDisasterId(id);
    if (!id) {
      setResults([]);
      setQuery({ lat: '', lng: '', radius_km: 5 });
      return;
    }
    const disaster = disasters.find(d => String(d.id) === String(id));
    if (disaster) {
      const lat = disaster.lat !== undefined && disaster.lat !== null ? String(disaster.lat) : '';
      const lng = disaster.lng !== undefined && disaster.lng !== null ? String(disaster.lng) : '';
      setQuery({ lat, lng, radius_km: 5 });
      // Fetch resources for this disaster
      if (lat && lng) {
        const data = await getNearbyResources(parseFloat(lat), parseFloat(lng), 5);
        setResults(data);
      } else {
        setResults([]);
      }
    }
  };

  const handleRadiusOrFieldChange = e => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = async e => {
    e.preventDefault();
    const lat = parseFloat(query.lat);
    const lng = parseFloat(query.lng);
    const radius_km = parseFloat(query.radius_km);
    if (!isNaN(lat) && !isNaN(lng) && !isNaN(radius_km)) {
      const data = await getNearbyResources(lat, lng, radius_km);
      setResults(data);
    } else {
      alert('Please enter valid numbers for latitude, longitude, and radius.');
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ color: '#1976d2', fontWeight: 700, marginBottom: 18 }}>Resources</h2>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ fontWeight: 500, minWidth: 160 }}>Select Disaster Location:</label>
        <select value={selectedDisasterId} onChange={handleDisasterSelect} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 220 }}>
          <option value="">-- Select Disaster --</option>
          {disasters.map(d => (
            <option key={d.id} value={d.id}>{d.title} ({d.location || 'No location'})</option>
          ))}
        </select>
      </div>
      {!selectedDisasterId && (
        <div style={{ color: '#888', textAlign: 'center', margin: '48px 0', fontSize: 18 }}>
          Select an option from the dropdown to find the nearest resources.
        </div>
      )}
      {selectedDisasterId && (
        <>
          <form onSubmit={handleSearch} style={{ marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center', background: '#f5f7fa', padding: 16, borderRadius: 8, justifyContent: 'center' }}>
            <input name="lat" value={query.lat} onChange={handleRadiusOrFieldChange} placeholder="Latitude" type="number" step="any" required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: 120 }} />
            <input name="lng" value={query.lng} onChange={handleRadiusOrFieldChange} placeholder="Longitude" type="number" step="any" required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: 120 }} />
            <input name="radius_km" value={query.radius_km} onChange={handleRadiusOrFieldChange} placeholder="Radius (km)" type="number" step="any" required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: 120 }} />
            <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Search Nearby</button>
          </form>
          <h3 style={{ margin: '24px 0 12px 0', color: '#1976d2' }}>Nearby Resources</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
            {results.map(r => (
              <div key={r.id} style={cardStyle}>
                <div style={{ fontWeight: 600, fontSize: 18 }}>{r.name}</div>
                <div style={{ color: '#1976d2', fontWeight: 500 }}>{r.location}</div>
                <div style={{ color: '#444' }}>Type: {r.type}</div>
                <div style={{ color: r.available ? '#388e3c' : '#d32f2f', fontWeight: 500 }}>{r.available ? 'Available' : 'Unavailable'}</div>
                <div style={{ fontSize: 13, color: '#555' }}>Lat: {r.lat || (r.geography && r.geography.coordinates ? r.geography.coordinates[1] : 'N/A')}, Lng: {r.lng || (r.geography && r.geography.coordinates ? r.geography.coordinates[0] : 'N/A')}</div>
              </div>
            ))}
            {results.length === 0 && <div style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center', padding: 32 }}>No resources found for this area.</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default Resources; 