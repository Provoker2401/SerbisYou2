import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TermsAndConditions from "../screens/TermsAndConditions";

describe("Privacy Policy component", () => {
  test("renders correctly", () => {
    render(<TermsAndConditions />);
  });

  test("renders specified text correctly", () => {
    // Render the component
    const { getByText } = render(<TermsAndConditions />);

    // Check if the text "Cardholder’s Name" is rendered
    const test = getByText("AGREEMENT TO OUR LEGAL TERMS");

    // Assert that the text is present in the component
    expect(test).toBeTruthy();
  });

  test("renders specified text correctly", () => {
    // Render the component
    const { getByText } = render(<TermsAndConditions />);

    // Check if the text "Cardholder’s Name" is rendered
    const test = getByText("TABLE OF CONTENTS");

    // Assert that the text is present in the component
    expect(test).toBeTruthy();
  });

  test("renders specified text correctly", () => {
    // Render the component
    const { getByText } = render(<TermsAndConditions />);

    // Check if the text "Cardholder’s Name" is rendered
    const test = getByText("1. OUR SERVICES");

    // Assert that the text is present in the component
    expect(test).toBeTruthy();
  });
  test("renders specified text correctly", () => {
    // Render the component
    const { getByText } = render(<TermsAndConditions />);

    // Check if the text "Cardholder’s Name" is rendered
    const test = getByText("2. INTELLECTUAL PROPERTY RIGHTS");

    // Assert that the text is present in the component
    expect(test).toBeTruthy();
  });

  test("renders specified text correctly", () => {
    // Render the component
    const { getByText } = render(<TermsAndConditions />);

    // Check if the text "Cardholder’s Name" is rendered
    const test = getByText("3. USER REGISTRATION");

    // Assert that the text is present in the component
    expect(test).toBeTruthy();
  });

  test("renders specified text correctly", () => {
    // Render the component
    const { getByText } = render(<TermsAndConditions />);

    // Check if the text "Cardholder’s Name" is rendered
    const test = getByText("You are responsible for what you post or upload:");

    // Assert that the text is present in the component
    expect(test).toBeTruthy();
  });
  
  test("renders specified text correctly", () => {
    // Render the component
    const { getByText } = render(<TermsAndConditions />);

    // Check if the text "Cardholder’s Name" is rendered
    const test = getByText("4. PURCHASES AND PAYMENT");
    const test1 = getByText("5. POLICY");
    const test2 = getByText("6. USER DATA");
    const test3 = getByText("7. CONTACT US");
    const test4 = getByText("Notifications");
    const test5 = getByText("Account");



    // Assert that the text is present in the component
    expect(test).toBeTruthy();
    expect(test1).toBeTruthy();
    expect(test2).toBeTruthy();
    expect(test3).toBeTruthy();
    expect(test4).toBeTruthy();
    expect(test5).toBeTruthy();
  });
});
