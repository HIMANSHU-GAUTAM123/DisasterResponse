import React, { useEffect, useState } from 'react';
import SocialFeed from '../components/SocialFeed';
import { getSocialFeed } from '../services/api';
import { getSocket } from '../services/socket';

const Social = () => {
  const [feed, setFeed] = useState([]);

  const fetchFeed = async () => {
    setFeed(await getSocialFeed());
  };

  useEffect(() => {
    fetchFeed();
    const socket = getSocket();
    socket.on('social:update', fetchFeed);
    return () => socket.off('social:update', fetchFeed);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Social Media Feed</h2>
      <SocialFeed feed={feed} />
    </div>
  );
};

export default Social; 