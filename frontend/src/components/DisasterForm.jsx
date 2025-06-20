import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const DisasterForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    location: initialData.location || '',
    tags: initialData.tags ? initialData.tags.join(',') : ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...form, tags: form.tags.split(',').map(t => t.trim()) });
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, margin: '0 auto', p: 4, borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <Typography variant="h5" fontWeight={700} color="primary" mb={2} textAlign="center">
        Report a Disaster
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
          required
          multiline
          minRows={3}
          fullWidth
        />
        <Typography variant="body2" color="text.secondary" fontStyle="italic" mb={1}>
          If the location is mentioned in the description, you can leave the location field empty. The AI will extract it automatically.
        </Typography>
        <TextField
          name="location"
          label="Location (optional)"
          value={form.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="tags"
          label="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2, fontWeight: 600 }}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default DisasterForm; 