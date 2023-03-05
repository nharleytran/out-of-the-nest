import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Header', () => {

    test('App title text is rendered', () => {
        render(<Header />);
        expect(screen.getByText('Out of the Nest')).toBeInTheDocument();
      });

    test('Login, sign up, and create post buttons are rendered', () => {
        render(<Header />);
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText('Create post')).toBeInTheDocument();
    });

    test('Clicking on create post button navigates to the create post page', () => {
        const navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(<Header />);

        const createPostButton = screen.getByText('Create post');
        fireEvent.click(createPostButton);

        expect(navigateMock).toHaveBeenCalledWith('/create');
    });
});
