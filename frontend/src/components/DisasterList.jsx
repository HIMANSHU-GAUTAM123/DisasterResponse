import React, { useState } from 'react';

const DisasterList = ({ disasters, onDisasterClick, onEdit, onDelete }) => {
  console.log('Disasters:', disasters);
  const [filter, setFilter] = useState({ tag: '', location: '' });

  const filtered = disasters.filter(d =>
    (!filter.tag || (d.tags && d.tags.includes(filter.tag))) &&
    (!filter.location || (d.location && d.location.toLowerCase().includes(filter.location.toLowerCase())))
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <input placeholder="Filter by tag" value={filter.tag} onChange={e => setFilter({ ...filter, tag: e.target.value })} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', flex: 1 }} />
        <input placeholder="Filter by location" value={filter.location} onChange={e => setFilter({ ...filter, location: e.target.value })} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', flex: 1 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {filtered.map(d => (
          <div
            key={d.id}
            onClick={() => onDisasterClick && onDisasterClick(d)}
            style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              padding: 20,
              cursor: 'pointer',
              border: '2px solid transparent',
              transition: 'border 0.2s',
              minHeight: 160,
              position: 'relative'
            }}
            onMouseOver={e => (e.currentTarget.style.border = '2px solid #1976d2')}
            onMouseOut={e => (e.currentTarget.style.border = '2px solid transparent')}
          >
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{d.title}</div>
            <div style={{ color: '#1976d2', fontWeight: 500, marginBottom: 4 }}>{d.location || <span style={{ color: '#888' }}>[No location]</span>}</div>
            <div style={{ color: '#444', marginBottom: 8, fontSize: 15 }}>{d.description}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>Tags: {d.tags && d.tags.join(', ')}</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>Reported at: {d.created_at ? new Date(d.created_at).toLocaleString() : 'N/A'}</div>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>
              Lat: {d.lat !== undefined ? d.lat : (d.geography && d.geography.coordinates ? d.geography.coordinates[1] : 'N/A')},
              Lng: {d.lng !== undefined ? d.lng : (d.geography && d.geography.coordinates ? d.geography.coordinates[0] : 'N/A')}
            </div>
            {onDelete && (
              <div style={{ position: 'absolute', top: 16, right: 16 }} onClick={e => e.stopPropagation()}>
                <button onClick={() => onDelete(d.id)} style={{ background: '#fff1f0', color: '#d32f2f', border: '1px solid #ffbdbd', borderRadius: 5, padding: '4px 10px', fontWeight: 500, cursor: 'pointer' }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ color: '#888', marginTop: 32, textAlign: 'center' }}>No disasters found.</div>}
    </div>
  );
};

export default DisasterList; 