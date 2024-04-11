const { render } = require("@testing-library/react-native");
const BookingDetails = require("../screens/BookingDetails").default;

// Mock SafeAreaProvider
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }) => <>{children}</>,
}));

// Mock expo-clipboard
jest.mock("expo-clipboard", () => ({
  getString: jest.fn(),
  setString: jest.fn(),
}));

// Mock Firebase
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  updateEmail: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("Booking Details component", () => {
  const route = {
    params: {
        itemID: "test",
        statusOrder: "test",
    },
  };
  test("renders correctly", () => {
    // Render the component
    render(<BookingDetails route={route} />);
  });

  

});
