import React from "react";
import { render } from "@testing-library/react";
import Loading from ".";

it("renders the spinner when loading is true", () => {
  const component = render(<Loading />);

  expect(component).toMatchSnapshot();
});
