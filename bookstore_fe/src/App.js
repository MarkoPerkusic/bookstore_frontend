import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import Profile from './Profile';
import AdminProfile from './AdminProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/" element={<HomePage />} />
		  <Route path="/profile" element={<Profile />} />
		  <Route path="/librarian/clients" element={<AdminProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

