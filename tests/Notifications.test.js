// Notifications.test.js

import React from 'react';
import { render } from '@testing-library/react-native';
import Notifications from "../screens/Notifications";
import { getFirestore, getAuth, onSnapshot } from 'firebase/firestore';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock Firebase
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  onSnapshot: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  currentUser: { uid: 'mockedUserId' }, // Mocking auth.currentUser
}));

describe('Notifications component', () => {
  test('renders correctly', () => {
    // Render the component
    render(
      <SafeAreaProvider>
        <Notifications />
      </SafeAreaProvider>
    );
  });
});
