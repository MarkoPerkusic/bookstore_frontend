import React, { useState, useEffect } from 'react';
import { getAuthToken, fetchWithToken, addBook, fetchBorrowedBooks, deleteBook } from './Utils';

function AdminProfile() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bookName, setBookName] = useState('');

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
          setClients(data.map(user => ({ id: user.id, email: user.email })));
        } else {
          console.error('Failed to fetch clients:', response.statusText);
		  console.log('Response status code:', response.ok);
		  console.log(response);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }
    fetchClients();
  }, []);
  
  const handleClientSelect = async (clientId) => {
	  try {
		  const token = getAuthToken();
		  const response = await fetchWithToken(`http://localhost:8000/librarian/clients/${clientId}/books`,
			  {
				  method: 'GET',
				  headers: {Authorization: `Bearer ${token}`}
			  });
		  if (response.ok) {
			  const data = await response.json();
			  setBorrowedBooks(data);
			  setSelectedClient(clientId);
			}
		  } catch (error) {
			  console.error('Error fetching borrowed books:', error);
		  }
	  };

  const handleAddBook = async () => {
    try {		
      const success = await addBook(selectedClient, bookName);
      if (success) {
        console.log('Book added successfully.');
        // We refresh the list of borrowed books after adding a new book
        fetchBorrowedBooks(selectedClient);
      } else {
        console.error('Failed to add book.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  
  const handleDeleteBook = async (bookName) => {
    try {
      const success = await deleteBook(selectedClient, bookName);
      if (success) {
        console.log('Book deleted successfully.');
		// We refresh the list of borrowed books after returning a book
        fetchBorrowedBooks(selectedClient);
      } else {
        console.error('Failed to delete book.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
  <div>
    <h2>Admin Profile</h2>
    <h3>List of Clients</h3>
    <ul>
      {clients.map(client => (
        <li key={client.id} onClick={() => handleClientSelect(client.id)} style={{ cursor: 'pointer' }}>
          {client.email}
        </li>
      ))}
    </ul>
    {selectedClient && (
      <>
        <h3>Borrowed Books for {clients.find(client => client.id === selectedClient).email}</h3>
        <ul>
          {borrowedBooks.map(book => (
            <li key={book.id}>
              {book.title} <button onClick={() => handleDeleteBook(book.title)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <input type="text" value={bookName} onChange={e => setBookName(e.target.value)} placeholder="Enter book name" />
          <button onClick={handleAddBook}>Add Book</button>
        </div>
      </>
    )}
  </div>
);
}

export default AdminProfile;
