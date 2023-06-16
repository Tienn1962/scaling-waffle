import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import IngredientBadges from ".";

it("renders the badges", () => {
  const badges = ["bread", "chicken", "egg"];

  const component = render(
    <IngredientBadges
      badges={badges}
      onClick={() => {}}
    />
  );

  expect(component).toMatchSnapshot();
});

it("renders a single badge with 'any' when passed an empty array", () => {
  const component = render(
    <IngredientBadges
      badges={[]}
      onClick={() => {}}
    />
  );
  expect(component).toMatchSnapshot();
});

it("fires a click event", () => {
  const callback = jest.fn();

  render(
    <IngredientBadges
      badges={["bread"]}
      onClick={callback}
    />
  );

  fireEvent.click(screen.getByRole("button"));
  expect(callback).toHaveBeenCalled();
});
