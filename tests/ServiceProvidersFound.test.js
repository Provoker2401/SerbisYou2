import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ServiceProvidersFound from "../screens/ServiceProvidersFound";
import { useNavigation } from "@react-navigation/native";

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

const latitude = 37.7749;
const longitude = -122.4194;
const bookingID = "mockBookingID";
const serviceBookingUID = "mockServiceBookingUID";
const title = "Mock Title";
const category = "Mock Category";
const acceptedByProvider = true;

// Create the mockRouteParams object with the mock values
const mockRouteParams = {
  latitude,
  longitude,
  bookingID,
  serviceBookingUID,
  title,
  category,
  acceptedByProvider,
};

describe("Serviceprovider found component", () => {
  test("renders with mock values", () => {
    // Render the component with mocked route params
    render(<ServiceProvidersFound route={{ params: mockRouteParams }} />);
  });

  test("Pressing the Proceed to Bookings navigates to Homepage", () => {
    // Mock navigation
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    // Render HomePage component
    const { getByText } = render(
      <ServiceProvidersFound route={{ params: mockRouteParams }} />
    );

    // Find the Pressable element by its text content
    const changePressable = getByText(" Proceed to Bookings");

    // Simulate a press event on the Pressable element
    fireEvent.press(changePressable);

    // Assert that navigation function is called with expected screen name
    expect(mockNavigate).toHaveBeenCalledWith("BottomTabsRoot", {
      screen: "BookingsActive",
    });
  });

  test("renders Text component with correct styles and content", () => {
    // Render the component
    const { getByText } = render(
      <ServiceProvidersFound route={{ params: mockRouteParams }} />
    );
    // Find the Text component by its content
    const textElement = getByText("Congratulations!");

    // Assert that the Text component is rendered
    expect(textElement).toBeTruthy();
  });

  test("renders profile correctly ", () => {
    // Render the component
    const { getByTestId } = render(
        <ServiceProvidersFound route={{ params: mockRouteParams }} />
      );
    // Find the Image component by its test ID
    const imageElement = getByTestId("image-23581");

    // Assert that the Image component is rendered
    expect(imageElement).toBeTruthy();
  });
});
