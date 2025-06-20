import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const getAvatarColor = (user) => {
  // Simple hash to pick a color
  const colors = ['#1976d2', '#388e3c', '#fbc02d', '#d32f2f', '#7b1fa2', '#0288d1'];
  let hash = 0;
  for (let i = 0; i < user.length; i++) hash += user.charCodeAt(i);
  return colors[hash % colors.length];
};

const SocialFeed = ({ feed }) => (
  <Stack spacing={2} sx={{ maxWidth: 500, margin: '0 auto' }}>
    {feed.map(item => (
      <Card key={item.id} variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 2 }}>
        <Avatar sx={{ bgcolor: getAvatarColor(item.user), mr: 2 }}>
          {item.user[0].toUpperCase()}
        </Avatar>
        <CardContent sx={{ flex: 1, p: 0 }}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={700}>
            @{item.user}
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            {item.text}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(item.timestamp).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Stack>
);

export default SocialFeed; 