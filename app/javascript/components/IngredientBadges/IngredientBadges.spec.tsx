import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import IngredientBadges from ".";

it("renders the badges", () => {
  const badges = ["bread", "chicken", "egg"];

  const component = render(<IngredientBadges badges={badges} />);

  expect(component).toMatchSnapshot();
});

it("renders a single badge with 'any' when passed an empty array", () => {
  const component = render(<IngredientBadges badges={[]} />);
  expect(component).toMatchSnapshot();
});
