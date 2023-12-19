import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SignUp from "../page/SignUp";

describe("SignUp Component", () => {
  it("renders the form elements properly", () => {
    render(<SignUp />);
    // Check if essential form elements are present
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it("allows entering text into form fields", async () => {
    render(<SignUp />);
    const nameInput = screen.getByLabelText(/Name/i);
    const mobileInput = screen.getByLabelText(/Mobile/i);
    const addressInput = screen.getByLabelText(/Address/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(mobileInput, { target: { value: "1234567890" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(mobileInput).toHaveValue("1234567890");
    expect(addressInput).toHaveValue("123 Main St");
  });

  it("submits form data on button click", async () => {
    render(<SignUp />);
    const nameInput = screen.getByLabelText(/Name/i);
    const mobileInput = screen.getByLabelText(/Mobile/i);
    const addressInput = screen.getByLabelText(/Address/i);
    const submitButton = screen.getByText(/Sign In/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(mobileInput, { target: { value: "1234567890" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });

    fireEvent.click(submitButton);

    // Simulate API call and test if the component handles it correctly
    // This may involve mocking Axios calls using libraries like axios-mock-adapter

    // Add assertions for the expected behavior after form submission
  });
});
