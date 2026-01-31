const API_URL = '/api'; // Use Vite proxy

export const api = {
  login: (email, password) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  signup: (userData) =>
    fetchAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getChallenge: () =>
    fetchAPI('/challenge'),

  updateChallenge: (date, taskId, value) =>
    fetchAPI('/challenge/log', {
      method: 'POST',
      body: JSON.stringify({ date, tasks: { [taskId]: value } })
    })
};

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}
