import { render, fireEvent } from "@testing-library/react";
import LikeDislike from "../components/LikeDislike";

describe("LikeDislike component", () => {
  test("renders the like count", () => {
    const { getByText } = render(<LikeDislike like={5} />);
    const likeCount = getByText("5 endorsements");
    expect(likeCount).toBeInTheDocument();
  });

  test("calls handleLike when the like button is clicked", () => {
    const handleLike = jest.fn();
    const { getByLabelText } = render(
      <LikeDislike like={0} handleLike={handleLike} />
    );
    const likeButton = getByLabelText("like");
    fireEvent.click(likeButton);
    expect(handleLike).toHaveBeenCalled();
  });

  test("calls handleDislike when the like button is clicked twice", () => {
    const handleLike = jest.fn();
    const handleDislike = jest.fn();
    const { getByLabelText } = render(
      <LikeDislike like={0} handleLike={handleLike} handleDislike={handleDislike} />
    );
    const likeButton = getByLabelText("like");
    fireEvent.click(likeButton);
    expect(handleLike).toHaveBeenCalled();
    fireEvent.click(likeButton);
    expect(handleDislike).toHaveBeenCalled();

  });
});
