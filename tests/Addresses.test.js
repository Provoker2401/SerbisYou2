import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Addresses from "../screens/Addresses";


jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));
  
  // Mock for firebase/auth
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
  }));
  
  // Mock for firebase/firestore
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDoc: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
  }));

  
describe("Addresses component", () => {
  test("renders correctly", () => {
    // Render the component
    render(<Addresses />);
  });
});
