import React from 'react';
import { shallow } from 'enzyme';
import PasswordStrengthIndicator from '../../components/PasswordStrengthIndicator';

describe('PasswordStrengthIndicator', () => {
  describe('when component is mounted', () => {
    it('renders without crashing', () => {
      const component = shallow(<PasswordStrengthIndicator />);
      expect(component.exists()).toBe(true);
    });

    it('matches snapshot', () => {
      const component = shallow(<PasswordStrengthIndicator strength={0} />);
      expect(component).toMatchSnapshot();
    })
  });

  describe('when password strength is 0', () => {
    it('displays a password verdict of "Invalid"', () => {
      const component = shallow(<PasswordStrengthIndicator strength={0} />);
      const passwordVerdictText = component.dive().find('span').props().children;

      expect(passwordVerdictText.includes('Invalid')).toBe(true);
    });
  });

  describe('when password strength is 2', () => {
    let component;
    
    beforeEach(() => {
      component = shallow(<PasswordStrengthIndicator strength={2} />);
    });

    it('displays a password verdict of "Weak"', () => {
      const passwordVerdictText = component.dive().find('span').props().children;
      expect(passwordVerdictText.includes('Weak')).toBe(true);
    });

    it('expects bars div to contain a className of passwordIsWeak', () => {
      const barsDivClassName = component.dive().find('#bars').props().className;
      expect(barsDivClassName.includes('passwordIsWeak')).toBe(true);
    })
  });

  describe('when password strength is 3', () => {
    let component;
    
    beforeEach(() => {
      component = shallow(<PasswordStrengthIndicator strength={3} />);
    });

    it('displays a password verdict of "Good"', () => {
      const passwordVerdictText = component.dive().find('span').props().children;
      expect(passwordVerdictText.includes('Good')).toBe(true);
    });

    it('expects bars div to contain a className of passwordIsGood', () => {
      const barsDivClassName = component.dive().find('#bars').props().className;
      expect(barsDivClassName.includes('passwordIsGood')).toBe(true);
    })
  });

  describe('when password strength is 4', () => {
    let component;
    
    beforeEach(() => {
      component = shallow(<PasswordStrengthIndicator strength={4} />);
    });

    it('displays a password verdict of "VeryGood"', () => {
      const passwordVerdictText = component.dive().find('span').props().children;
      expect(passwordVerdictText.includes('Very Good')).toBe(true);
    });

    it('expects bars div to contain a className of passwordIsVeryGood', () => {
      const barsDivClassName = component.dive().find('#bars').props().className;
      expect(barsDivClassName.includes('passwordIsVeryGood')).toBe(true);
    })
  });
});