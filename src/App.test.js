/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./page/SignUp", () => () => <div>SignUp Component Mock</div>);

describe("App component", () => {
  it("renders SignUp component", () => {
    const { getByText } = render(<App />);
    expect(getByText("SignUp Component Mock")).toBeInTheDocument();
  });
});
