import React from "react";
import { render } from "@testing-library/react-native";
import EditAddressIconComplete from "../screens/EditAddressIconComplete";

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
describe("EditAddressIconComplete component", () => {
  test("renders with mock values", () => {
    // Mock route params
    const mockRouteParams = {
      loc: "Mock Selected Location",
      city: "Mock Selected City",
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
      floor: "Mock Selected Floor",
      houseNumber: "Mock Selected House Number",
      label: "Mock Selected Label",
      otherLabel: "Mock Selected Other Label",
      note: "Mock Selected Note",
      street: "Mock Selected Street",
      value: "Mock Selected Value",
    };

    // Render the component with mocked route params
    const { getByText } = render(
      <EditAddressIconComplete route={{ params: mockRouteParams }} />
    );

    // Find elements by their text content or test IDs and assert their presence
    expect(getByText("Mock Selected Location")).toBeTruthy();
    expect(getByText("Mock Selected City")).toBeTruthy();
    // Assert other elements as needed
  });

  test("renders with mock values", () => {
    // Mock route params
    const mockRouteParams = {
      loc: "Mock Selected Location",
      city: "Mock Selected City",
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
      floor: "Mock Selected Floor",
      houseNumber: "Mock Selected House Number",
      label: "Mock Selected Label",
      otherLabel: "Mock Selected Other Label",
      note: "Mock Selected Note",
      street: "Mock Selected Street",
      value: "Mock Selected Value",
    };

    // Render the component with mocked route params
    render(<EditAddressIconComplete route={{ params: mockRouteParams }} />);
  });
});
