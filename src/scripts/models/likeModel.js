import { BASE_URL } from "../api/api";

export async function likeCerita(cerita_id, token) {
  const response = await fetch(`${BASE_URL}/like`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cerita_id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Gagal like cerita');
  }

  const data = await response.json();
  return data.message;
}

export async function unlikeCerita(cerita_id, token) {
  const response = await fetch(`${BASE_URL}/unlike`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cerita_id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Gagal unlike cerita');
  }

  const data = await response.json();
  return data.message;
}
