import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Onboarding1 from '../screens/Onboarding1';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<Onboarding1 />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Onboarding1 />);
    expect(getByText('We’re here for your household needs!')).toBeTruthy();
    expect(
      getByText('Get quality and professional service right to your doorsteps')
    ).toBeTruthy();
  });

  it('navigates to homepage on button press', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: mockNavigate });

    const { getByTestId } = render(<Onboarding1 />);
    fireEvent.press(getByTestId('next-btn'));
    expect(mockNavigate).toHaveBeenCalledWith('BottomTabsRoot', { screen: 'Homepage' });
  });

  test("renders without errors", () => {
    render(<Onboarding1 />);
  });
});
