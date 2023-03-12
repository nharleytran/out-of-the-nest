import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe('Header component', () => {
  
  beforeEach(() => {
    useNavigate.mockClear();
    useLocation.mockClear();
  });

  test('Renders search component when on feed page', () => {
    useLocation.mockReturnValueOnce({ pathname: '/feed' });
    const { getByPlaceholderText } = render(<Header />);
    expect(getByPlaceholderText('Look for posts')).toBeInTheDocument();
  });

  test('Navigates to create post page when create post button is clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValueOnce(navigateMock);
    useLocation.mockReturnValueOnce({ pathname: '/' });
    const { getByText } = render(<Header />);
    fireEvent.click(getByText('Create post'));
    expect(navigateMock).toHaveBeenCalledWith('/create');
  });

  test('Sign Up button renders on home page', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValueOnce(navigateMock);
    useLocation.mockReturnValueOnce({ pathname: '/' });
    const { getByText } = render(<Header />);
    expect(getByText('Sign Up'));
  });

  test('Login button renders on home page', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValueOnce(navigateMock);
    useLocation.mockReturnValueOnce({ pathname: '/' });
    const { getByText } = render(<Header />);
    expect(getByText('Login'));
  });

  test('Create post button renders on home page', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValueOnce(navigateMock);
    useLocation.mockReturnValueOnce({ pathname: '/' });
    const { getByText } = render(<Header />);
    expect(getByText('Create post'));
  });

});
