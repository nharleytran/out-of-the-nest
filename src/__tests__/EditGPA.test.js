import { render, fireEvent } from "@testing-library/react";
import EditGPA from "../components/PostContent/EditGPA";

describe("EditGPA", () => {
  it("updates the GPA value when user enters a new value", () => {
    const setPostdata = jest.fn();
    const gpa = "3.5";
    const { getByLabelText } = render(
      <EditGPA postData={{}} setPostdata={setPostdata} gpa={gpa} />
    );
    const input = getByLabelText("GPA *");
    fireEvent.change(input, { target: { value: "3.8" } });
    expect(setPostdata).toHaveBeenCalledWith({ gpa: "3.8" });
  });
});
