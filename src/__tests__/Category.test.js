import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Category from "../components/PostContent/Category";

describe("Category component", () => {
  test("renders the select field correctly", async () => {
    const categories = [
      { _id: "1", name: "Category 1" },
      { _id: "2", name: "Category 2" },
      { _id: "3", name: "Category 3" },
    ];
    const setPostdata = jest.fn();
    const { getByLabelText } = render(
      <Category
        categoryvalue=""
        categories={categories}
        postData={{}}
        setPostdata={setPostdata}
      />
    );
    const selectField = getByLabelText(
      "Select a category to submit your post to *"
    );
    expect(selectField).toBeInTheDocument();
  });
});
