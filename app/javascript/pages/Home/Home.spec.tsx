import React from "react";
import { render, screen } from "@testing-library/react";
import Home from ".";
// needed because of the use of <Link /> on the page
import { MemoryRouter } from "react-router-dom";

it("renders the home page", () => {
  const component = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(component).toMatchSnapshot();
});

it("links to the list of recipes", () => {
  const _ = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByRole("button").getAttribute("href")).toBe("/recipes");
});
