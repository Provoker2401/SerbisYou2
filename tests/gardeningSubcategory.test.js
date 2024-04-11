import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GardeningSubcategory from '../screens/GardeningSubcategory';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('GardeningSubcategory', () => {
  test('renders without errors', () => {
    render(<GardeningSubcategory />);
  });

  it('renders all necessary texts correctly', () => {
    const { getByText, getByTestId, getAllByText } = render(<GardeningSubcategory />);

    // Check if all necessary texts are rendered
    expect(getByText('Gardening')).toBeTruthy();
    expect(getByText('Garden Maintenance')).toBeTruthy();
    expect(getByText('Landscape Design and Planning')).toBeTruthy();
    expect(getByText('Irrigation System Installation / Repairs')).toBeTruthy();
    expect(getByText('Pest and Disease Management')).toBeTruthy();

    const startsFromTextElements = getAllByText('Starts From');
    expect(startsFromTextElements.length).toBeGreaterThan(0); // Ensure at least one element is found
    startsFromTextElements.forEach((element) => {
      expect(element).toBeTruthy(); // Validate each found element
    });
    
    expect(getByText('Php 200')).toBeTruthy(); //Garden Maintenance
    expect(getByText('Php 1000')).toBeTruthy(); // Landscape Design and Planning
    expect(getByText('Php 2250')).toBeTruthy(); // Irrigation System Intallation/Repairs
    expect(getByText('Php 750')).toBeTruthy(); // Pest and Disease Management

     // Check if necessary buttons are rendered
    expect(getByTestId('gardenMaintenanceBtn')).toBeTruthy();
    expect(getByTestId('landscapeDesignBtn')).toBeTruthy();
    expect(getByTestId('irrigationSystemBtn')).toBeTruthy();
    expect(getByTestId('pestDiseaseBtn')).toBeTruthy();
  });

  it('navigates to GardenMaintenanceSubcategory when Garden Maintenance button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<GardeningSubcategory />);
    const gardenMaintenanceBtn = getByTestId('gardenMaintenanceBtn');

    fireEvent.press(gardenMaintenanceBtn);

    expect(navigateMock).toHaveBeenCalledWith('GardenMaintenanceSubcategory');
  });

  it('navigates to LandscapeDesignSubcategory when Landscape Design button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<GardeningSubcategory />);
    const landscapeDesignBtn = getByTestId('landscapeDesignBtn');

    fireEvent.press(landscapeDesignBtn);

    expect(navigateMock).toHaveBeenCalledWith('LandscapeDesignSubcategory');
  });

  it('navigates to IrrigationSystemSubcategory when Irrigation System button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<GardeningSubcategory />);
    const irrigationSystemBtn = getByTestId('irrigationSystemBtn');

    fireEvent.press(irrigationSystemBtn);

    expect(navigateMock).toHaveBeenCalledWith('IrrigationSystemSubcategory');
  });

  it('navigates to PestDiseaseManagementSubc when Pest and Disease Management button is pressed', () => {
    const navigateMock = jest.fn(); // Mock the navigate function
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<GardeningSubcategory />);
    const pestDiseaseBtn = getByTestId('pestDiseaseBtn');

    fireEvent.press(pestDiseaseBtn);

    expect(navigateMock).toHaveBeenCalledWith('PestDiseaseManagementSubc');
  });


});