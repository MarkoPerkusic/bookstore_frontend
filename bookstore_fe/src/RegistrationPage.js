import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function RegistrationPage() {
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
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

  const handleRegistration = async () => {
    try {
      // Registration API endpoint
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Successfully registered user, redirect to login page
        navigate('/login');
      } else {
        // Registration failed, handle the error
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Registration</h2>
      <div className="input-group">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="first_name" value={formData.first_name} onChange={handleChange} />
      </div>
      <div className="input-group">
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="last_name" value={formData.last_name} onChange={handleChange} />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit" onClick={handleRegistration}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default RegistrationPage;

