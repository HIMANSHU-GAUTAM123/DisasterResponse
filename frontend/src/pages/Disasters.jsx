import React, { useState } from 'react';
import DisasterForm from '../components/DisasterForm';
import { createDisaster } from '../services/api';

const Disasters = () => {
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (data) => {
    await createDisaster(data);
    alert('Disaster reported successfully!');
    setFormKey(k => k + 1); // Reset the form
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Report a Disaster</h2>
      <DisasterForm key={formKey} onSubmit={handleSubmit} />
    </div>
  );
};

export default Disasters; 