import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ChangePassword from "../screens/ChangePassword";
import { useNavigation } from "@react-navigation/native";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  updatePassword: jest.fn(),
  EmailAuthProvider: {
    credential: jest.fn(),
  },
  reauthenticateWithCredential: jest.fn(),
}));

// Mock for @react-navigation/native
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("Change Password component", () => {
  test("renders correctly", () => {
    // Render the component
    render(<ChangePassword />);
  });

  test("renders TextInput with placeholder and EyeOff icon", () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);

    // Check if TextInput is rendered with the correct placeholder
    const textInput = getByPlaceholderText("Current Password");
    expect(textInput).toBeDefined();

    // Check if EyeOff icon is rendered
    const eyeOffIcon = getByTestId("eye-off-icon");
    expect(eyeOffIcon).toBeDefined();
  });

  test("renders TextInput with placeholder and EyeOff icon", () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);

    // Check if TextInput is rendered with the correct placeholder
    const textInput = getByPlaceholderText("Enter Your New Password");
    expect(textInput).toBeDefined();

    // Check if EyeOff icon is rendered
    const eyeOffIcon = getByTestId("eye-off-icon2");
    expect(eyeOffIcon).toBeDefined();
  });

  test("renders TextInput with placeholder and EyeOff icon", () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);

    // Check if TextInput is rendered with the correct placeholder
    const textInput = getByPlaceholderText("Confirm New Password");
    expect(textInput).toBeDefined();

    // Check if EyeOff icon is rendered
    const eyeOffIcon = getByTestId("eye-off-icon3");
    expect(eyeOffIcon).toBeDefined();
  });

  test('renders strength bars based on password length and complexity', () => {
    // Render the component
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    
    // Find the TextInput
    const textInput = getByPlaceholderText('Enter Your New Password');
    
    // Simulate entering a password with length 8 or more, containing an uppercase letter and special character
    fireEvent.changeText(textInput, 'TestPass@123');

    // Check if the strength bar is rendered
    const strongBar = getByTestId('strong-bar');
    expect(strongBar).toBeDefined();
  })

  test('renders average strength bar based on password length and complexity', () => {
    // Render the component
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    
    // Find the TextInput
    const textInput = getByPlaceholderText('Enter Your New Password');
    
    // Simulate entering a password with length 8 or more, containing an uppercase letter but no special character
    fireEvent.changeText(textInput, 'testPass123');

    // Check if the average strength bar is rendered
    const averageBar = getByTestId('average-bar');
    expect(averageBar).toBeDefined();
  });

  test('renders error message when passwords do not match', () => {
    // Render the component with newPassword and confirmPassword that do not match
    const { getByText, getByPlaceholderText } = render(
      <ChangePassword />
    );

    const newPasswordInput = getByPlaceholderText('Enter Your New Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm New Password');

    fireEvent.changeText(newPasswordInput, 'password1');
    fireEvent.changeText(confirmPasswordInput, 'password2');
    
    // Check if the error message is rendered
    const errorMessage = getByText('Both passwords must match❗');
    expect(errorMessage).toBeDefined();
  });

  test("renders Change button", () => {
    const { getByTestId } = render(<ChangePassword />);
    const changeButtonWrapper = getByTestId("changeButtonWrapper");

    expect(changeButtonWrapper).toBeTruthy();
  });




});
