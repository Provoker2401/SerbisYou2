import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CarpentrySubcategory from '../screens/CarpentrySubcategory';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('CarpentrySubcategory', () => {
  test('renders without errors', () => {
    render(<CarpentrySubcategory />);
  });

  it('renders all necessary texts and buttons correctly', () => {
    const { getByText, getByTestId, getAllByText } = render(<CarpentrySubcategory />);

    // Check if all texts are rendered
    expect(getByText('Carpentry')).toBeTruthy();
    expect(getByText('Installation')).toBeTruthy();
    expect(getByText('Repairs / Replacement')).toBeTruthy();
    expect(getByText('Furniture Assembly and Disassembly')).toBeTruthy();

    // Check for 'Starts From' and price text elements
    const startsFromTextElements = getAllByText('Starts From');
    expect(startsFromTextElements.length).toBeGreaterThan(0);
    startsFromTextElements.forEach((element) => {
      expect(element).toBeTruthy();
    });

    const php200TextElements = getAllByText('Php 200'); //Installation and Repairs/Replacement
    expect(php200TextElements.length).toBeGreaterThan(0);
    php200TextElements.forEach((element) => {
      expect(element).toBeTruthy();
    });

    expect(getByText('Php 300')).toBeTruthy(); // Furniture Assembly price

    // Check if necessary buttons are rendered
    expect(getByTestId('installationBtn')).toBeTruthy();
    expect(getByTestId('repairsReplacementBtn')).toBeTruthy();
    expect(getByTestId('furnitureAssemblyBtn')).toBeTruthy();
  });

  it('navigates to CarpentryInstallationSubcategory when Installation button is pressed', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<CarpentrySubcategory />);
    const installationBtn = getByTestId('installationBtn');

    fireEvent.press(installationBtn);

    expect(navigateMock).toHaveBeenCalledWith('CarpentryInstallationSubcate');
  });

  it('navigates to CarpentryRepairsSubcategory when Repairs / Replacement button is pressed', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<CarpentrySubcategory />);
    const repairsReplacementBtn = getByTestId('repairsReplacementBtn');

    fireEvent.press(repairsReplacementBtn);

    expect(navigateMock).toHaveBeenCalledWith('CarpentryRepairsSubcategory');
  });

  it('navigates to CarpentryFurnitureSubcategor when Furniture Assembly button is pressed', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<CarpentrySubcategory />);
    const furnitureAssemblyBtn = getByTestId('furnitureAssemblyBtn');

    fireEvent.press(furnitureAssemblyBtn);

    expect(navigateMock).toHaveBeenCalledWith('CarpentryFurnitureSubcategor');
  });
});
