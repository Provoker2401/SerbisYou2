import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PetCareSubcategory from '../screens/PetCareSubcategory';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('PetCareSubcategory', () => {
  test('renders without errors', () => {
    render(<PetCareSubcategory />);
  });

  it('renders all necessary texts and buttons correctly', () => {
    const { getByText, getByTestId, getAllByText } = render(<PetCareSubcategory />);

    // Check if all texts are rendered
    expect(getByText('Pet Care')).toBeTruthy();
    expect(getByText('Dog Training')).toBeTruthy();
    expect(getByText('Pet Grooming')).toBeTruthy();
    expect(getByText('Pet Sitting')).toBeTruthy();

    // Check if necessary buttons are rendered
    expect(getByTestId('dogTrainingBtn')).toBeTruthy();
    expect(getByTestId('petGroomingBtn')).toBeTruthy();
    expect(getByTestId('petSittingBtn')).toBeTruthy();

    // Validate 'Starts From' text elements
    const startsFromTextElements = getAllByText('Starts From');
    expect(startsFromTextElements.length).toBeGreaterThan(0);
    startsFromTextElements.forEach((element) => {
      expect(element).toBeTruthy();
    });

    // Validate price text elements
    expect(getByText('Php 750')).toBeTruthy(); //Dog Training
    expect(getByText('Php 250')).toBeTruthy(); // Pet Grooming
    expect(getByText('Php 100')).toBeTruthy(); // Pet Sitting
  });

  it('navigates to DogTrainingSubcategoryBlue when Dog Training button is pressed', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<PetCareSubcategory />);
    const dogTrainingBtn = getByTestId('dogTrainingBtn');

    fireEvent.press(dogTrainingBtn);

    expect(navigateMock).toHaveBeenCalledWith('DogTrainingSubcategoryBlue');
  });

  it('navigates to PetGroomingSubcategoryDog when Pet Grooming button is pressed', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<PetCareSubcategory />);
    const petGroomingBtn = getByTestId('petGroomingBtn');

    fireEvent.press(petGroomingBtn);

    expect(navigateMock).toHaveBeenCalledWith('PetGroomingSubcategoryDog');
  });

  it('navigates to PetSittingSubcategoryDog when Pet Sitting button is pressed', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: navigateMock });

    const { getByTestId } = render(<PetCareSubcategory />);
    const petSittingBtn = getByTestId('petSittingBtn');

    fireEvent.press(petSittingBtn);

    expect(navigateMock).toHaveBeenCalledWith('PetSittingSubcategoryDog');
  });
});
