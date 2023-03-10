// import { render, screen, fireEvent } from '@testing-library/react';
// import Header from '../components/Header';

// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

// describe('Header', () => {

//     test('App title text is rendered', () => {
//         render(<Header />);
//         expect(screen.getByText('Out of the Nest')).toBeInTheDocument();
//       });

//     test('Login, sign up, and create post buttons are rendered', () => {
//         render(<Header />);
//         expect(screen.getByText('Login')).toBeInTheDocument();
//         expect(screen.getByText('Sign Up')).toBeInTheDocument();
//         expect(screen.getByText('Create post')).toBeInTheDocument();
//     });

//     test('Clicking on create post button navigates to the create post page', () => {
//         const navigateMock = jest.fn();
//         jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

//         render(<Header />);

//         const createPostButton = screen.getByText('Create post');
//         fireEvent.click(createPostButton);

//         expect(navigateMock).toHaveBeenCalledWith('/create');
//     });
// });
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('Header component', () => {
  beforeEach(() => {
    useNavigate.mockClear();
    useLocation.mockClear();
  });

  test('App title text is rendered', () => {
    useLocation.mockReturnValueOnce({ pathname: '/' });
    const { getByText } = render(<Header />);
    expect(getByText('Out of the Nest')).toBeInTheDocument();
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
