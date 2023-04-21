import React from "react";
import { render, fireEven, screen } from "@testing-library/react";
import { useNavigate, useLocation, BrowserRouter, MemoryRouter } from "react-router-dom";
import Header from "../components/Header";
import { AuthProvider } from '../context/AuthContext';


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("Header component", () => {
  beforeEach(() => {
    useNavigate.mockClear();
    useLocation.mockClear();
  });
  test("dummy test", () => {
    expect(true).toBe(true);
  });

  test("renders Create post button", () => {
    useLocation.mockReturnValueOnce({ pathname: "/feed" });
    render(<Header />);
    const createPostButton = screen.getByText("Create post");
    expect(createPostButton).toBeInTheDocument();
  });

  test('renders log in button when user is not logged in', () => {
    useLocation.mockReturnValueOnce({ pathname: "/feed" });
    const userIsLoggedIn = false;
  
    const authValue = {
      user: userIsLoggedIn ? { name: 'Test User' } : null,
    };
  
    render(
      <AuthProvider value={authValue}>
        <Header />
      </AuthProvider>
    );
  
    if (userIsLoggedIn) {
      const logOutButton = screen.getByText('Logout');
      expect(logOutButton).toBeInTheDocument();
    } else {
      const logInButton = screen.getByText('Login');
      expect(logInButton).toBeInTheDocument();
    }
  });
});
