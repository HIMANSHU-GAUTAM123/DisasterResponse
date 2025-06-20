import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDisasters } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DisasterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disaster, setDisaster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const all = await getDisasters();
      const found = all.find(d => String(d.id) === String(id));
      setDisaster(found);
      setLoading(false);
    })();
  }, [id]);

  let lat = null, lng = null;
  if (disaster && (disaster.lat || disaster.lng)) {
    lat = parseFloat(disaster.lat);
    lng = parseFloat(disaster.lng);
  } else if (disaster && disaster.geography) {
    // Parse "POINT(lng lat)"
    const match = disaster.geography.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
    if (match) {
      lng = parseFloat(match[1]);
      lat = parseFloat(match[2]);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 24, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}>← Back</button>
      {loading ? (
        <div>Loading...</div>
      ) : disaster ? (
        <>
          <h2 style={{ color: '#1976d2', fontWeight: 700 }}>{disaster.title}</h2>
          <div style={{ marginBottom: 12, color: '#444' }}>{disaster.description}</div>
          <div style={{ marginBottom: 8 }}><b>Location:</b> {disaster.location || '[Not specified]'}</div>
          <div style={{ marginBottom: 8 }}><b>Tags:</b> {disaster.tags && disaster.tags.join(', ')}</div>
          <div style={{ marginBottom: 8 }}><b>Reported at:</b> {disaster.created_at ? new Date(disaster.created_at).toLocaleString() : 'N/A'}</div>
          {disaster.image_url && (
            <div style={{ margin: '18px 0' }}>
              <img src={disaster.image_url} alt="Disaster" style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }} />
            </div>
          )}
          {lat && lng && (
            <div style={{ height: 320, margin: '18px 0', borderRadius: 8, overflow: 'hidden' }}>
              <MapContainer center={[lat, lng]} zoom={10} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                <Marker position={[lat, lng]}>
                  <Popup>{disaster.title}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </>
      ) : (
        <div style={{ color: 'red' }}>Disaster not found.</div>
      )}
    </div>
  );
};

export default DisasterDetail; 