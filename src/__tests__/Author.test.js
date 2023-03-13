import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Author from "../components/PostContent/Author";

describe("Author component", () => {
  test("renders the input field correctly", () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(
      <Author postData={{}} setPostdata={setPostdata} />
    );
    const inputField = getByLabelText("Author *");
    expect(inputField).toBeInTheDocument();
  });

  test("calls setPostdata function with correct value when input changes", () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(
      <Author postData={{}} setPostdata={setPostdata} />
    );
    const inputField = getByLabelText("Author *");
    fireEvent.change(inputField, { target: { value: "Author 1" } });
    expect(setPostdata).toHaveBeenCalledWith({ author: "Author 1" });
  });
});
