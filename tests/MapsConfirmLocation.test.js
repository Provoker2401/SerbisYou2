import React from "react";
import { useContext } from "react";
import { render } from "@testing-library/react-native";
import MapsConfirmLocation from "../screens/MapsConfirmLocation";
import { AddressSelectedContext } from "../AddressSelectedContext";
import { useEditLocation } from "../EditLocationContext";

// Import the mocked hook
import { useAddressSelectedContext } from "../AddressSelectedContext";

// Mock the useAddressSelectedContext hook
jest.mock("../AddressSelectedContext", () => ({
  useAddressSelectedContext: jest.fn(), // Mocking useAddressSelectedContext hook
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  onSnapshot: jest.fn(),
}));

// Mocking Firebase Auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  currentUser: { uid: "mockedUserId" }, // Mocking auth.currentUser
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../ReviewSummaryContext", () => ({
  useReviewSummaryContext: jest.fn(() => ({
    reviewData: {
      property: "Property",
      materials: "Materials",
      inputValues: [],
      multipliedValue: 0,
      title: "Title",
      category: "Category",
      logo: "Logo",
      location: "Location",
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
  })),
}));

jest.mock("../EditLocationContext", () => ({
  useEditLocation: jest.fn(), // Mocking useEditLocation hook
}));

describe("Maps confirm component", () => {
  test("renders correctly with different selected coordinates", () => {
    const mockLocationData = {
      cityAddress: "Mock City",
      specificLocation: "Mock Specific Location",
      streetValue: "Mock Street",
      houseValue: "Mock House",
      floorValue: "Mock Floor",
      noteValue: "Mock Note",
      label: "Mock Label",
      otherLabel: "Mock Other Label",
    };

    // useEditLocation.mockReturnValue(mockLocationData);
  });


});
