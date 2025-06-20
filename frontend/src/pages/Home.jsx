import React, { useEffect, useState } from 'react';
import DisasterList from '../components/DisasterList';
import DisasterForm from '../components/DisasterForm';
import { getDisasters, updateDisaster, deleteDisaster } from '../services/api';
import { getSocket } from '../services/socket';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [disasters, setDisasters] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const fetchDisasters = async () => {
    setDisasters(await getDisasters());
    console.log('Disasters:', disasters);
  };

  useEffect(() => {
    fetchDisasters();
    const socket = getSocket();
    socket.on('disaster:update', fetchDisasters);
    return () => socket.off('disaster:update', fetchDisasters);
  }, []);

  const handleDisasterClick = (disaster) => {
    navigate(`/disaster/${disaster.id}`);
  };

  const handleEdit = (disaster) => {
    setEditing(disaster);
    setShowEdit(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this disaster?')) {
      await deleteDisaster(id);
      fetchDisasters();
    }
  };

  const handleEditSubmit = async (data) => {
    await updateDisaster(editing.id, data);
    setShowEdit(false);
    setEditing(null);
    fetchDisasters();
  };

  return (
    <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, color: '#1976d2' }}>All Reported Disasters</h2>
      <DisasterList
        disasters={disasters}
        onDisasterClick={handleDisasterClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showEdit && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            padding: '32px 28px 24px 28px',
            minWidth: 0,
            width: '100%',
            maxWidth: 420,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}>
            <button
              onClick={() => setShowEdit(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#888',
                cursor: 'pointer',
                zIndex: 2
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 style={{ margin: '0 0 18px 0', textAlign: 'center', fontWeight: 700, color: '#1976d2' }}>Edit Disaster</h3>
            <DisasterForm initialData={editing} onSubmit={handleEditSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 