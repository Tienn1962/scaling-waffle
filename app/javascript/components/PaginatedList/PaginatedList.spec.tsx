import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PaginatedList from ".";

it("renders a list of items with a template", () => {
  const component = render(
    <PaginatedList
      data={["Hello world!", "Goodbye world!"]}
      count={2}
      limit={50}
      item={(datum) => <div key={datum}>{datum}</div>}
      onPageChange={() => {}}
    />
  );

  expect(component).toMatchSnapshot();
});

it("emits an event on page change", async () => {
  const callback = jest.fn();

  render(
    <PaginatedList
      data={["Hello world!", "Goodbye world!"]}
      count={2}
      limit={1}
      item={(datum) => <div key={datum}>{datum}</div>}
      onPageChange={(page) => {
        callback();
      }}
    />
  );

  const secondPageLink = screen.getByText("2");
  fireEvent.click(secondPageLink);
  expect(callback).toHaveBeenCalled();
});
