import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("checking .h-100 css class", () => {
  //const { getByText } = render(<App />);
  //const linkElement = getByText(/Register Your School/i);

  const { container } = render(<App />);
  expect(container.querySelector(".h-100")).toBeInTheDocument();
});
