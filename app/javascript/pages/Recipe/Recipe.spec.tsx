import axios from "axios";
import React from "react";
import { render } from "@testing-library/react";
import Recipe from ".";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("axios");

it("renders a recipe with its ingredients", async () => {
  const recipe = {
    author: "John Recipe",
    prep_time: 10,
    cook_time: 10,
    ratings: 5.0,
    title: "Potatoes with chicken",
    ingredients: [{ title: "3 potatoes" }, { title: "chicken breast" }],
  };

  const response = { data: { recipe } };

  (axios.get as jest.Mock).mockResolvedValue(response);

  const component = await act(async () =>
    render(
      <MemoryRouter>
        <Recipe />
      </MemoryRouter>
    )
  );

  expect(component).toMatchSnapshot();
});
