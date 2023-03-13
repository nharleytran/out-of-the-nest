import { render, fireEvent } from "@testing-library/react";
import Gpa from "../components/PostContent/Gpa";

describe("Gpa component", () => {
  test("renders the input field correctly", () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(
      <Gpa postData={{}} setPostdata={setPostdata} />
    );
    const inputField = getByLabelText("GPA *");
    expect(inputField).toBeInTheDocument();
  });

  test("calls setPostdata function with correct value when GPA is changed", () => {
    // Define test data
    const setPostdata = jest.fn();
    const postData = { gpa: "" };

    // Render the component
    const { getByLabelText } = render(
      <Gpa postData={postData} setPostdata={setPostdata} />
    );

    // Simulate a GPA change
    const inputField = getByLabelText("GPA *");
    fireEvent.change(inputField, { target: { value: "3.7" } });

    // Assert that the setPostdata function was called with the expected arguments
    expect(setPostdata).toHaveBeenCalledWith({ gpa: 3.7 });
  });

  test("does not call setPostdata function when invalid GPA is entered", () => {
    // Define test data
    const setPostdata = jest.fn();
    const postData = { gpa: "" };

    // Render the component
    const { getByLabelText } = render(
      <Gpa postData={postData} setPostdata={setPostdata} />
    );

    // Simulate an invalid GPA change
    const inputField = getByLabelText("GPA *");
    fireEvent.change(inputField, { target: { value: "abc" } });

    // Assert that the setPostdata function was not called
    expect(setPostdata).not.toHaveBeenCalled();
  });
});
