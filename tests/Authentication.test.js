import { render, fireEvent} from "@testing-library/react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { messaging } from "@react-native-firebase/messaging";
import axios from "axios";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Authentication from "../screens/Authentication";

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  }));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
    createStackNavigator: jest.fn(),
}));

jest.mock("@react-native-firebase/messaging", () => ({
    messaging: jest.fn(() => ({
        getToken: jest.fn().mockResolvedValue("mockFcmToken"),
    })),
}));

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

jest.mock("@react-native-firebase/messaging", () => ({
  messaging: jest.fn(),
}));

jest.mock("axios");

describe("<Authentication />", () => {
  test("renders without errors", async () => {
    // Mocking a successful response from the server
    axios.post.mockResolvedValueOnce({
      data: {
        /* Mock response data for success */
      },
    });

    const route = {
      params: {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "1234567890",
        password: "password",
      },
    };

    render(<Authentication route={route} />);

    // Your test assertions here
  });

  test("displays success toast when OTP is sent successfully", async () => {
    const mockToastShow = jest.spyOn(Toast, "show").mockImplementation(); // Mock the Toast.show function

    const mockedPhone = "1234567890";

    const route = {
      params: {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "1234567890",
        password: "password",
      },
    };

    axios.post.mockResolvedValueOnce({ data: {} });
    const { getByTestId } = render(<Authentication route={route} />);

    // Simulate sending verification code
    fireEvent.press(getByTestId("send-verification-button"));

    // Assert that success toast is displayed
    expect(mockToastShow).toHaveBeenCalledWith({
      type: "success",
      position: "top",
      text1: "Verification",
      text2: "OTP has been sent❗",
      visibilityTime: 5000,
    });
  });

  test("displays success toast when verification is successful", async () => {
    // Mock successful response from axios
    axios.post.mockResolvedValueOnce({ data: {} });

    // Mock route params
    const route = {
      params: {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "1234567890",
        password: "password",
      },
    };

    // Render the Authentication component
    const { getByTestId } = render(<Authentication route={route} />);

    // Trigger the verification process
    fireEvent.press(getByTestId("send-verification-button"));

    // Assertions
    await expect(axios.post).toHaveBeenCalledWith(
      "https://us-central1-testingauth-9126f.cloudfunctions.net/verifyOTP",
      {
        otp: "", // Adjust the OTP value based on the received value
        phoneNumber: "1234567890", // Make sure to use the correct phone number
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Assert that success toast is displayed
    expect(Toast.show).toHaveBeenCalledWith({
        position: "top",
        text1: "Verification", // Adjusted to "Verification"
        text2: "OTP has been sent❗",
        type: "success", // Adjusted to "success"
        visibilityTime: 5000,
      });
  });




});
