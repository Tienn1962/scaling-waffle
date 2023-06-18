import React from "react";
import { render } from "@testing-library/react";
import Show from ".";

it("renders the children when passed true", () => {
  const component = render(
    <Show
      if={true}
      fallback={<p>Bye!</p>}
    >
      <p>Hello!</p>
    </Show>
  );

  expect(component).toMatchSnapshot();
});

it("renders the fallback prop when false", () => {
  const component = render(
    <Show
      if={false}
      fallback={<p>Bye!</p>}
    >
      <p>Hello!</p>
    </Show>
  );

  expect(component).toMatchSnapshot();
});
