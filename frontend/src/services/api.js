const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function getDisasters() {
  const res = await fetch(`${baseUrl}/disasters`);
  return res.json();
}

export async function createDisaster(data, role = 'admin') {
  const res = await fetch(`${baseUrl}/disasters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-role': role },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateDisaster(id, data, role = 'admin') {
  const res = await fetch(`${baseUrl}/disasters/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-role': role },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteDisaster(id, role = 'admin') {
  await fetch(`${baseUrl}/disasters/${id}`, {
    method: 'DELETE',
    headers: { 'x-role': role }
  });
}

export async function getSocialFeed() {
  const res = await fetch(`${baseUrl}/social-media`);
  return res.json();
}

export async function geocodeLocation(locationName) {
  const res = await fetch(`${baseUrl}/geocode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locationName })
  });
  return res.json();
}

export async function verifyImage(imageUrl) {
  const res = await fetch(`${baseUrl}/verify-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl })
  });
  return res.json();
}

export async function getNearbyResources(lat, lng, radius_km) {
  const res = await fetch(`${baseUrl}/resources/nearby?lat=${lat}&lng=${lng}&radius_km=${radius_km}`);
  return res.json();
}

export async function reverseGeocode(lat, lng) {
  const res = await fetch(`${baseUrl}/geocode/reverse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng })
  });
  return res.json();
} 