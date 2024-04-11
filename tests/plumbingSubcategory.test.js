import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PlumbingSubcategory from '../screens/PlumbingSubcategory';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('PlumbingSubcategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<PlumbingSubcategory />);
  });

  it('renders all necessary texts and buttons correctly', () => {
    const { getByText, getByTestId, getAllByText } = render(<PlumbingSubcategory />);

    // Check if key texts are rendered
    expect(getByText('Plumbing')).toBeTruthy();
    expect(getByText('Installation')).toBeTruthy();
    expect(getByText('Repairs / Replacement')).toBeTruthy();
    const startsFromTextElements = getAllByText('Starts From');
    expect(startsFromTextElements.length).toBeGreaterThan(0); // Ensure at least one element is found
    startsFromTextElements.forEach((element) => {
      expect(element).toBeTruthy(); // Validate each found element
    });
    const php800TextElements = getAllByText('Php 800');  // Intallation and Repairs/Replacement
    expect(php800TextElements.length).toBeGreaterThan(0); // Ensure at least one element is found
    php800TextElements.forEach((element) => {
      expect(element).toBeTruthy(); // Validate each found element
    });

    // Check if necessary buttons are rendered
    expect(getByTestId('plumbingInstallationBtn')).toBeTruthy();
    expect(getByTestId('plumbingRepairsBtn')).toBeTruthy();
  });

  it('navigates to PlumbingInstallationSubcategory when Installation button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<PlumbingSubcategory />);
    const installationBtn = getByTestId('plumbingInstallationBtn');

    fireEvent.press(installationBtn);

    expect(navigateMock).toHaveBeenCalledWith('PlumbingInstallationSubcateg');
  });

  it('navigates to PlumbingRepairsSubcategory when Repairs / Replacement button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<PlumbingSubcategory />);
    const repairsBtn = getByTestId('plumbingRepairsBtn');

    fireEvent.press(repairsBtn);

    expect(navigateMock).toHaveBeenCalledWith('PlumbingRepairsSubcategory');
  });

});
