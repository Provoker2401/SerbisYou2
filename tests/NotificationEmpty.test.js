import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationsEmpty from "../screens/NotificationsEmpty";


jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  onSnapshot: mockOnSnapshot,
}));

describe("<NotificationsEmpty />", () => {
  test("renders without errors", () => {
    render(<NotificationsEmpty />);
  });
});
