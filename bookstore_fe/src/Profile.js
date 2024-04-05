import React, { useEffect, useState } from 'react';
import { getAuthToken, getBorrowedBooks } from './Utils';
import './styles.css';

function Profile() {
  const [userName, setUserName] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAuthToken();
        const books = await getBorrowedBooks(token);
        setBorrowedBooks(books);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      console.error('User name not found in local storage');
    }

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Hello, {userName}</p>
      <h3>Borrowed Books:</h3>
      <ul>
        {borrowedBooks.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
