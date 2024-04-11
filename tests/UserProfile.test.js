import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UserProfile from "../screens/UserProfile";
import { useNavigation } from "@react-navigation/native";

// Mocking firebase/firestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  onSnapshot: jest.fn(),
}));

// Mocking firebase/auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  currentUser: { uid: "mockedUserId" }, // Mocking auth.currentUser
}));

// Mocking useNavigation hook

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
  }));
  
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
}));

describe("User Profile component", () => {
  const mockNavigate = jest.fn();
  test("renders correctly", () => {
    render(<UserProfile />);
  });
  test("Pressing the Plumbing navigates to pluming subcategory", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(<UserProfile />);

    // Find the Pressable element by its text content
    const editpressable = getByText("Edit Profile");

    // Simulate a press event on the Pressable element
    fireEvent.press(editpressable);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("EditProfile");
  });
});
