import { render, fireEvent } from "@testing-library/react";
import Extracurriculars from "../components/PostContent/Extracurriculars";

describe("Extracurriculars component", () => {
  test("renders the input field correctly", () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(
      <Extracurriculars postData={{}} setPostdata={setPostdata} />
    );
    const inputField = getByLabelText("Extracurriculars *");
    expect(inputField).toBeInTheDocument();
  });

  test("should update extracurriculars value when input is changed", () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(
      <Extracurriculars
        postData={{ extracurriculars: "" }}
        setPostdata={setPostdata}
      />
    );
    const input = getByLabelText("Extracurriculars *");

    fireEvent.change(input, {
      target: { value: "Lorem ipsum dolor sit amet" },
    });

    expect(setPostdata).toHaveBeenCalledWith({
      extracurriculars: "Lorem ipsum dolor sit amet",
    });
  });
});
