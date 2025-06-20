import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const defaultPosition = [28.6, 77.2]; // Example: Delhi

const MapView = ({ disasters = [], resources = [] }) => {
  // Get positions for disasters/resources
  const disasterMarkers = disasters
    .filter(d => d.geography)
    .map(d => {
      // Parse "POINT(lng lat)" format
      const match = d.geography.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
      if (!match) return null;
      const [lng, lat] = [parseFloat(match[1]), parseFloat(match[2])];
      return { ...d, lat, lng };
    })
    .filter(Boolean);

  const resourceMarkers = resources
    .filter(r => r.geography)
    .map(r => {
      const match = r.geography.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
      if (!match) return null;
      const [lng, lat] = [parseFloat(match[1]), parseFloat(match[2])];
      return { ...r, lat, lng };
    })
    .filter(Boolean);

  const center = disasterMarkers.length
    ? [disasterMarkers[0].lat, disasterMarkers[0].lng]
    : defaultPosition;

  return (
    <div style={{ height: 400, margin: '16px 0' }}>
      <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {disasterMarkers.map(d => (
          <Marker key={d.id} position={[d.lat, d.lng]}>
            <Popup>
              <b>{d.title}</b><br />
              {d.location}<br />
              {d.description}
            </Popup>
          </Marker>
        ))}
        {resourceMarkers.map(r => (
          <Marker key={r.id} position={[r.lat, r.lng]}>
            <Popup>
              <b>{r.name}</b> ({r.type})<br />
              {r.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView; 