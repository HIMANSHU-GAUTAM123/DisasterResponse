import React, { useEffect, useState } from 'react';

const FEEDS = [
  {
    name: 'FEMA News',
    url: 'https://www.fema.gov/rss/updates.xml'
  },
  {
    name: 'Red Cross News',
    url: 'https://www.redcross.org/content/redcross/en/about-us/news-and-events/news-releases/_jcr_content/par/newsfeed.rss.xml'
  }
];

function fetchRssJson(feedUrl) {
  // Use rss2json public API for demo (no API key required for public feeds)
  return fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`)
    .then(res => res.json());
}

const Browse = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(FEEDS.map(feed => fetchRssJson(feed.url).then(data => ({ name: feed.name, items: data.items || [] }))))
      .then(results => setUpdates(results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Official Updates</h2>
      {loading && <p>Loading...</p>}
      {updates.map(feed => (
        <div key={feed.name} style={{ marginBottom: 24 }}>
          <h3>{feed.name}</h3>
          <ul>
            {feed.items.map(item => (
              <li key={item.guid || item.link}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                <br />
                <small>{new Date(item.pubDate).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Browse; 