import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CleaningSubcategory from '../screens/CleaningSubcategory';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('CleaningSubcategory', () => {

  test('renders without errors', () => {
    render(<CleaningSubcategory />);
  });

  it('renders all necessary texts and buttons correctly', () => {
    const { getByText, getByTestId, getAllByText } = render(<CleaningSubcategory />);

    // Check if all texts are rendered
    expect(getByText('Cleaning')).toBeTruthy();
    expect(getByText('Standard Cleaning')).toBeTruthy();
    expect(getByText('Deep Cleaning')).toBeTruthy();
    expect(getByText('Electronic Appliance Cleaning')).toBeTruthy();
    expect(getByText('Pest Control')).toBeTruthy

    const startsFromTextElements = getAllByText('Starts From');
    expect(startsFromTextElements.length).toBeGreaterThan(0); // Ensure at least one element is found
    startsFromTextElements.forEach((element) => {
      expect(element).toBeTruthy(); // Validate each found element
    });

    const php200TextElements = getAllByText('Php 200'); //Standard Cleaning and Deep Cleaning
    expect(php200TextElements.length).toBeGreaterThan(0); // Ensure at least one element is found
    php200TextElements.forEach((element) => {
      expect(element).toBeTruthy(); // Validate each found element
    });

    expect(getByText('Php 150')).toBeTruthy(); //Electronic Appliance Cleaning
    expect(getByText('Php 500')).toBeTruthy(); //Pest Control

    // Check if necessary buttons are rendered
    expect(getByTestId('standardCleaningBtn')).toBeTruthy();
    expect(getByTestId('deepCleaningBtn')).toBeTruthy();
    expect(getByTestId('electronicApplianceCleaningBtn')).toBeTruthy();
    expect(getByTestId('pestControlBtn')).toBeTruthy();
  });

  it('navigates to StandardCleaningSubcategory when Standard Cleaning button is pressed', () => {
       // Arrange
       const navigateMock = jest.fn(); // Mock the navigate function
       jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });
   
       // Act
       const { getByTestId } = render(<CleaningSubcategory />);
       const standardCleaningBtn = getByTestId('standardCleaningBtn');
       fireEvent.press(standardCleaningBtn);
   
       // Assert
       expect(navigateMock).toHaveBeenCalledWith('StandardCleaningSubcategory');
  });


  it('navigates to DeepCleaningSubcategory when Standard Cleaning button is pressed', () => {
    // Arrange
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    // Act
    const { getByTestId } = render(<CleaningSubcategory />);
    const deepCleaningBtn = getByTestId('deepCleaningBtn');
    fireEvent.press(deepCleaningBtn);

    // Assert
    expect(navigateMock).toHaveBeenCalledWith('DeepCleaningSubcategory');
});

it('navigates to ElectronicApplianceCleaningSubcategory when Electronic Appliance Cleaning button is pressed', () => {
  const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

  const { getByTestId } = render(<CleaningSubcategory />);
  const electronicApplianceBtn = getByTestId('electronicApplianceCleaningBtn');

  fireEvent.press(electronicApplianceBtn);

  expect(navigateMock).toHaveBeenCalledWith('ElectronicApplianceCleaning');
});

it('navigates to PestControlSubcategory when Pest Control button is pressed', () => {
  const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

  const { getByTestId } = render(<CleaningSubcategory />);
  const pestControlBtn = getByTestId('pestControlBtn');

  fireEvent.press(pestControlBtn);

  expect(navigateMock).toHaveBeenCalledWith('PestControlSubcategory');
});

});
