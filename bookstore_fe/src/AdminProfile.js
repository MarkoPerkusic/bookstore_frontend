import React, { useState, useEffect } from 'react';
import { getAuthToken, fetchWithToken } from './Utils';

function AdminProfile() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const token = getAuthToken();
        const response = await fetchWithToken('http://localhost:8000/librarian/clients', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }
    fetchClients();
  }, []);

  return (
    <div>
      <h2>Admin Profile</h2>
      <h3>List of Clients</h3>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.name} - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProfile;
