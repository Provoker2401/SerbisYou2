import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchingDistanceRadius from "../screens/SearchingDistanceRadius";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("Searching Distance Radius component", () => {
  test("renders correctly", () => {
    const routeParams = { latitude: 40.7128, longitude: -74.006 };

    render(<SearchingDistanceRadius route={{ params: routeParams }} />);
  });
});
