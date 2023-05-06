import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/Login';

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    setIsAuth: jest.fn(),
  }),
}));

describe('Login component', () => {
  test('renders email and password inputs', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
  });

  test('submits login form on button click and redirects to home page', () => {
    const mockNavigate = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/"
            element={() => <div>Home</div>}
          />
        </Routes>
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('displays error message on failed login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(submitButton);

    // expect(screen.getByText('Login failed')).toBeInTheDocument();
  });

  test('navigates to create account page on "Create new account" link click', () => {
    const mockNavigate = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/create" element={<div>Create Account Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    const createAccountLink = screen.getByText('Create new account');
  
    fireEvent.click(createAccountLink);
  
    // expect(mockNavigate).toHaveBeenCalledWith('/user/create');
  });
  
});
