import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './LoginPage';

describe('Login component', () => {
  test('renders login form', () => {
    render(<Login />);
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('allows user to login with valid credentials', async () => {
    // Mock login function
    const mockLogin = jest.fn();

    render(<Login login={mockLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Wait for login function to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  test('displays error message for invalid credentials', async () => {
    // Mock login function to return error
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

    render(<Login login={mockLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Wait for error message to be displayed
    await waitFor(() => {
      const errorMessage = screen.getByText('Invalid credentials');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

