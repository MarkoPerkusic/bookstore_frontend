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
  localStorage.removeItem('token');
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

    return response;
	
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getBorrowedBooks = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch('http://localhost:8000/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch borrowed books');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

export const fetchBorrowedBooks = async (selectedClient) => {
  try {
    const token = getAuthToken();
    const response = await fetchWithToken(
	`http://localhost:8000/librarian/clients/${selectedClient}/books`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch borrowed books:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    return [];
  }
};

export const addBook = async (clientId, bookName) => {
  try {
    const token = getAuthToken();
    const response = await fetchWithToken(
	`http://localhost:8000/librarian/clients/${clientId}/books/add?book_name=${bookName}`, 
	{
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    }
	);
    if (response.ok) {
      return true;
    } else {
      console.error('Failed to add book:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error adding book:', error);
    return false;
  }
};

export const deleteBook = async (clientId, bookName) => {
  try {
    const token = getAuthToken();
    const response = await fetchWithToken(
	`http://localhost:8000/librarian/clients/${clientId}/books/${bookName}/delete`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      return true;
    } else {
      console.error('Failed to delete book:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    return false;
  }
};

