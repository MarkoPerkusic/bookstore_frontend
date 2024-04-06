import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { setAuthToken } from './Utils';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

const handleLogin = async () => {
  try {
	const { email, password } = formData;
    const bodyFormData = new URLSearchParams();
    bodyFormData.append('username', email);
    bodyFormData.append('password', password);

    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyFormData
    });

    if (response.ok) {
      const data = await response.json();
      const { role, name, access_token } = data;

      setAuthToken(access_token);
      localStorage.setItem('userName', name);

      switch (role) {
        case 'customer':
          navigate('/profile');
          break;
        case 'admin':
          navigate('/librarian/clients');
          break;
        case 'librarian':
          navigate('/librarian/clients');
          break;
        default:
          console.error('Unknown role:', role);
          break;
      }
    } else {
      // Login failed, show error message to the user
      const errorMessage = await response.text();
      console.error('Login failed:', errorMessage);
      // You can display the error message to the user or handle it in any other way
    }
  } catch (error) {
    console.error('Error logging in:', error);
    // Display a generic error message to the user or handle the error in any other way
  }
};

  return (
    <div className="form-container">
      <h2>Login</h2>
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit" onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;

