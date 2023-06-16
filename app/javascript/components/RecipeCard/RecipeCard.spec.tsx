import React from "react";
import { render } from "@testing-library/react";
import RecipeCard from ".";

it("renders a card", () => {
  const component = render(
    <RecipeCard
      title="The spiciest potato"
      ratings={4.9}
      prepTime={30}
      cookTime={30}
      ingredients={["1 potato"]}
    />
  );

  expect(component).toMatchSnapshot();
});
