import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Onboarding3 from '../screens/Onboarding3';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));


describe('<Onboarding3 />', () => {
    it('renders correctly', () => {
      const { getByText } = render(<Onboarding3 />);
      expect(getByText('Professional home cleaning')).toBeTruthy();
      expect(
        getByText('Get discovered right from home and get paid for what you love doing')
      ).toBeTruthy();
    });
  
    it('navigates to homepage on button press', () => {
      const mockNavigate = jest.fn();
      jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: mockNavigate });
  
      const { getByTestId } = render(<Onboarding3 />);
      fireEvent.press(getByTestId('next-btn'));
      expect(mockNavigate).toHaveBeenCalledWith("SignIn");
    });
  
    test("renders without errors", () => {
      render(<Onboarding3 />);
    });
  });