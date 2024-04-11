import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EditProfile from "../screens/EditProfile";
import * as ImagePicker from "expo-image-picker";

// Mock for react-navigation/native
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mock for firebase/auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  updateEmail: jest.fn(),
}));

// Mock for firebase/firestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

// Mock for expo-image-picker
jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

// Mock for firebase/storage
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadString: jest.fn(),
  getDownloadURL: jest.fn(),
  uploadBytes: jest.fn(),
}));

// Mock for react-native-toast-message
jest.mock("react-native-toast-message", () => ({
  showMessage: jest.fn(),
}));

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  launchImageLibraryAsync: jest.fn(),
}));

describe("EditProfile component", () => {
  test("renders correctly", () => {
    // Render the component
    render(<EditProfile />);
  });

  test("renders name input", () => {
    const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

    // Check if TextInput is rendered with the correct placeholder
    const textInput = getByPlaceholderText("Name");
    expect(textInput).toBeDefined();
  });

  test("renders email input", () => {
    const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

    // Check if TextInput is rendered with the correct placeholder
    const textInput = getByPlaceholderText("Email");
    expect(textInput).toBeDefined();
  });
  test("renders phone input", () => {
    const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

    // Check if TextInput is rendered with the correct placeholder
    const textInput = getByPlaceholderText("+63***********");
    expect(textInput).toBeDefined();
  });

  test("renders Save Changes button", () => {
    const { getByTestId } = render(<EditProfile />);
    const saveChangesButtonWrapper = getByTestId("saveChangesButtonWrapper");

    expect(saveChangesButtonWrapper).toBeTruthy();
  });
});
