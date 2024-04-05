// Set JWT token u local store
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

// Get JWT token from local store
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Delete JWT token from local store
export const removeAuthToken = () => {
  localStorage.removeItem('token'); // Uklanjanje tokena iz localStorage
};


export const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getBorrowedBooks = async () => {
  try {
    return await fetchWithToken('http://localhost:8000/profile', { method: 'GET' });
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

export const getUserName = async () => {
  try {
    const response = await fetch('http://localhost:8000/profile');
    if (response.ok) {
      const data = await response.json();
      return data.name;
    } else {
      throw new Error('Failed to fetch user name');
    }
  } catch (error) {
    throw new Error('Error retrieving user name:', error.message);
  }
};