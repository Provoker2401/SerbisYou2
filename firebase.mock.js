// firebase.mock.js

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Mock firebase/auth module
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    // Mock signInWithEmailAndPassword function
    signInWithEmailAndPassword: jest.fn((email, password) => Promise.resolve({ email, password })),
  })),
}));

// Mock firebase/firestore module
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({
    // Mock doc function
    doc: jest.fn(() => ({
      // Mock getDoc function
      getDoc: jest.fn(() => Promise.resolve({ /* mocked document data */ })),
    })),
  })),
}));
