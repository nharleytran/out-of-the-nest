import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from 'react-router-dom';
import Personalize from "../components/Personalize";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

describe("Personalize component", () => {
  const mockPosts = [
    { id: 1, title: "Post 1", author: "Author 1" },
    { id: 2, title: "Post 2", author: "Author 2" },
  ];

  test("renders button with correct text", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Personalize posts={mockPosts} />
      </MemoryRouter>
    );
    expect(getByText("See how you compare to other posters here!")).toBeInTheDocument();
  });
});
