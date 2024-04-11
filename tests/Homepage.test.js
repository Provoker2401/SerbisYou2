import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomePage from "../screens/Homepage";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import Spinner from "react-native-loading-spinner-overlay";
import messaging from "@react-native-firebase/messaging";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

// Mocking the behavior of messaging.requestPermission
jest.mock("@react-native-firebase/messaging", () => ({
  __esModule: true,
  default: () => ({
    requestPermission: jest.fn().mockResolvedValue({
      settings: {
        notification: "authorized",
      },
    }),
    AuthorizationStatus: {
      AUTHORIZED: "AUTHORIZED",
      PROVISIONAL: "PROVISIONAL",
    },
  }),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("<HomePage />", () => {
  test("renders without errors", () => {
    render(<HomePage />);
  });

  test("Pressing the Plumbing navigates to pluming subcategory", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(<HomePage />);

    // Find the Pressable element by its text content
    const plumbingPressable = getByText("Plumbing");

    // Simulate a press event on the Pressable element
    fireEvent.press(plumbingPressable);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("PlumbingSubcategory");
  });

  test("Pressing the Electrical navigates to Electrical subcategory", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(<HomePage />);

    // Find the Pressable element by its text content
    const electricalpressable = getByText("Electrical");

    // Simulate a press event on the Pressable element
    fireEvent.press(electricalpressable);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("ElectricalSubcategory");
  });

  test("Pressing the Cleaning navigates to Cleaning subcategory", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(<HomePage />);

    // Find the Pressable element by its text content
    const CleaningSubcategory = getByText("Cleaning");

    // Simulate a press event on the Pressable element
    fireEvent.press(CleaningSubcategory);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("CleaningSubcategory");
  });

  test("Pressing the Pet Care navigates to Pet Care subcategory", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(<HomePage />);

    // Find the Pressable element by its text content
    const petcareSub = getByText("Pet Care");

    // Simulate a press event on the Pressable element
    fireEvent.press(petcareSub);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("PetCareSubcategory");
  });

  test("Pressing the Gardening navigates to Gardening subcategory", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(<HomePage />);

    // Find the Pressable element by its text content
    const gardeningSub = getByText("Gardening");

    // Simulate a press event on the Pressable element
    fireEvent.press(gardeningSub);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("GardeningSubcategory");
  });

  test("Pressing the Carpentry navigates to Carpenty subcategory", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(<HomePage />);

    // Find the Pressable element by its text content
    const carpentrySub = getByText("Carpentry");

    // Simulate a press event on the Pressable element
    fireEvent.press(carpentrySub);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("CarpentrySubcategory");
  });
});
