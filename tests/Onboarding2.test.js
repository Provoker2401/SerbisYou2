import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Onboarding2 from '../screens/Onboarding2';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<Onboarding2 />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Onboarding2 />);
    expect(getByText('Plumber & expert nearby you')).toBeTruthy();
    expect(
      getByText('Get more hands on board to help you do work faster and cleaner')
    ).toBeTruthy();
  });

  it('navigates to homepage on button press', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: mockNavigate });

    const { getByTestId } = render(<Onboarding2 />);
    fireEvent.press(getByTestId('next-btn'));
    expect(mockNavigate).toHaveBeenCalledWith("Onboarding3");
  });

  test("renders without errors", () => {
    render(<Onboarding2 />);
  });
});
