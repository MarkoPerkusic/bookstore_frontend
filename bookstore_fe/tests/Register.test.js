import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegistrationPage from './RegistrationPage';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Registration successful!' }),
  })
);

describe('RegistrationPage component', () => {
  test('registers a new user', async () => {
    // Rendering components
    const { getByLabelText, getByText } = render(<RegistrationPage />);

    // Simulation of user data entry
    fireEvent.change(getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });

    // Simulation of clicking the registration button
    fireEvent.click(getByText('Register'));

    // Checking if the fetch function is called with the correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          password: 'password123',
        }),
      });
    });

    // Checking whether the appropriate message is displayed after successful registration
    expect(getByText('Registration successful!')).toBeInTheDocument();
  });
});

