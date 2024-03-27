import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import SignIn from "../screens/SignIn";

// Mock Firebase imports

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn().mockResolvedValue({}),
      signInWithEmailAndPassword: jest.fn().mockRejectedValue({
    code: "auth/invalid-email", // Example error code
    message: "Invalid email address", // Example error message
  }),
}));
  
  jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(() => ({
      doc: jest.fn(),
      getDoc: jest.fn(),
    })),
  }));
  

describe("SignIn", () => {
  test("renders without errors", () => {
    render(<SignIn />);
  });

  test("renders email input field", () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const email = getByPlaceholderText("email@gmail.com");

    expect(email).toBeTruthy();
  });

  test("updates email input value correctly", () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const input = getByPlaceholderText("email@gmail.com");

    fireEvent.changeText(input, "test@example.com");

    expect(input.props.value).toBe("test@example.com");
  });

  test("renders password input field", () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const password = getByPlaceholderText("Password");

    expect(password).toBeTruthy();
  });

  test("updates password input value correctly", () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const input = getByPlaceholderText("email@gmail.com");

    fireEvent.changeText(input, "12345");

    expect(input.props.value).toBe("12345");
  });

  test("renders all required text elements", () => {
    const { getByText } = render(<SignIn />);

    // Assert text elements
    expect(getByText("Welcome back!")).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Password")).toBeTruthy();
    expect(getByText("Forgot password?")).toBeTruthy();
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("SerbisYou")).toBeTruthy();
    expect(getByText("Create a new Account?")).toBeTruthy();
    expect(getByText("Sign up")).toBeTruthy();
  });

  test("displays SerbisYou logo", () => {
    render(<SignIn />);
    expect(screen.getByTestId("serbisyou-logo")).toBeTruthy();
  });

  test('SignInButton renders correctly', () => {
    // const handleSignIns = jest.fn(); // Mock the handleSignIn function
    const { getByTestId } = render(<SignIn />);
    const button = getByTestId("signIn");
  

  
    fireEvent.press(button);

  

  });
  

  
  
});
