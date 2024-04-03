import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>WELCOME!</h1>
      <div>
        <h2>Login</h2>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <h2>Registration</h2>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default HomePage;

