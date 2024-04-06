import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ElectricalSubcategory from '../screens/ElectricalSubcategory';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('ElectricalSubcategory', () => {
  test('renders without errors', () => {
    render(<ElectricalSubcategory />);
  });

  it('renders all necessary texts correctly', () => {
    const { getByText, getByTestId, getAllByText } = render(<ElectricalSubcategory />);

    // Check if all necessary texts are rendered
    expect(getByText('Electrical')).toBeTruthy();
    expect(getByText('Installation')).toBeTruthy();
    expect(getByText('Repairs / Replacement')).toBeTruthy();

    const startsFromTextElements = getAllByText('Starts From');
    expect(startsFromTextElements.length).toBeGreaterThan(0); // Ensure at least one element is found
    startsFromTextElements.forEach((element) => {
      expect(element).toBeTruthy(); // Validate each found element
    });

    expect(getByText('Php 750')).toBeTruthy(); //Installation
    expect(getByText('Php 500')).toBeTruthy(); //Repairs/Replacement

    // Check if necessary buttons are rendered
    expect(getByTestId('electricalRepairsBtn')).toBeTruthy();
    expect(getByTestId('electricalInstallationBtn')).toBeTruthy();
  });

  it('navigates to ElectricalInstallationSubcat when Installation button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<ElectricalSubcategory />);
    const installationBtn = getByTestId('electricalInstallationBtn');

    fireEvent.press(installationBtn);

    expect(navigateMock).toHaveBeenCalledWith('ElectricalInstallationSubcat');
  });

  it('navigates to ElectricalRepairsSubcategory when Repairs / Replacement button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<ElectricalSubcategory />);
    const repairsBtn = getByTestId('electricalRepairsBtn');

    fireEvent.press(repairsBtn);

    expect(navigateMock).toHaveBeenCalledWith('ElectricalRepairsSubcategory');
  });

});
