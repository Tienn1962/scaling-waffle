import { act, render } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Recipes from ".";
import { Provider } from "react-redux";
import { store } from "../../stores/search";

jest.mock("axios");

const recipes = [
  {
    id: 1,
    author: "John Recipe",
    prep_time: 10,
    cook_time: 10,
    ratings: 5.0,
    title: "Potatoes with chicken",
    ingredients: [{ title: "3 potatoes" }, { title: "chicken breast" }],
  },
  {
    id: 2,
    author: "Jane Recipe",
    prep_time: 10,
    cook_time: 10,
    ratings: 5.0,
    title: "Tomatoes with beef",
    ingredients: [{ title: "3 tomatoes" }, { title: "beef" }],
  },
];

const response = { data: { recipes, pagination: { count: 2, limit: 1 } } };

(axios.get as jest.Mock).mockResolvedValue(response);

it("renders a list of recipes", async () => {
  const component = await act(async () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Recipes />
        </MemoryRouter>
      </Provider>
    )
  );

  expect(component).toMatchSnapshot();
});
