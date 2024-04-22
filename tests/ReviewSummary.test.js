import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ReviewSummary from "../screens/ReviewSummary";
import { useNavigation } from "@react-navigation/native";

// Mocking Firebase Firestore
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
  auth: {
    currentUser: {
      uid: 'mockedUserID'
    }
  }
}));

// Mocking navigation context

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mocking context hooks
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

jest.mock("../DateTimeContext", () => ({
  useDateTimeContext: jest.fn(() => ({
    selectedDateContext: "2024-04-13",
    selectedTimeContext: "10:00 AM",
  })),
}));

jest.mock("../UserDetailsContext", () => ({
  useUserDetailsContext: jest.fn(() => ({
    userData: {}, // Mock the userData object here if needed
  })),
}));

jest.mock("../EditLocationContext", () => ({
  useEditLocation: jest.fn(() => ({
    locationData: {
      // Mock the locationData object here if needed
      cityAddress: "Mocked City Address",
      specificLocation: "Mocked Specific Location",
      streetValue: "Mocked Street",
      houseValue: "Mocked House",
      floorValue: "Mocked Floor",
      noteValue: "Mocked Note",
      label: "Mocked Label",
      otherLabel: "Mocked Other Label",
    },
  })),
}));

describe("ReviewSummary component", () => {
  test("renders correctly", () => {
    // Define the mock route parameters
    const mockRouteParams = {
      sliderValue: 12,
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
    };

    // Render the component with mocked dependencies
    const { getByText } = render(
      <ReviewSummary route={{ params: mockRouteParams }} />
    );

    // Verify that certain text elements are rendered
    expect(getByText("Book Now")).toBeTruthy();
  });

  test("renders correctly with booking details", () => {
    // Define the mock route parameters
    const mockRouteParams = {
      sliderValue: 12,
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
    };

    // Render the component with mocked dependencies
    const { getByText } = render(
      <ReviewSummary route={{ params: mockRouteParams }} />
    );

    // Verify that certain text elements are rendered
    expect(getByText("Booking details")).toBeTruthy();
  });

  test("renders correctly with service details", () => {
    // Define the mock route parameters
    const mockRouteParams = {
      sliderValue: 12,
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
    };

    // Render the component with mocked dependencies
    const { getByText } = render(
      <ReviewSummary route={{ params: mockRouteParams }} />
    );

    // Verify that certain text elements are rendered
    expect(getByText("Service details")).toBeTruthy();
  });

  test("renders correctly with Payment Method", () => {
    // Define the mock route parameters
    const mockRouteParams = {
      sliderValue: 12,
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
    };

    // Render the component with mocked dependencies
    const { getByText } = render(
      <ReviewSummary route={{ params: mockRouteParams }} />
    );

    // Verify that certain text elements are rendered
    expect(getByText("Payment Method")).toBeTruthy();
  });


  test("navigates to PaymentMethod screen when 'Change' button is pressed", () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    // Define the mock route parameters
    const mockRouteParams = {
      sliderValue: 12,
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
    };

    // Mock the navigation object
    const mockNavigation = {
      navigate: jest.fn(),
    };

    // Render the component with mocked dependencies
    const { getByText, getByTestId } = render(
      <ReviewSummary
        route={{ params: mockRouteParams }}
        navigation={mockNavigation}
      />
    );

    // Find the "Change" button using its text content
    const changeButton = getByText("Change");
    expect(changeButton).toBeTruthy();

    // Simulate a press event on the "Change" button
    fireEvent.press(changeButton);

    // Assert that the navigation function is called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith("PaymentMethod");
  });
});
