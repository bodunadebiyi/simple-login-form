import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Input from '../components/Input';

describe('App', () => {
  describe('when app is mounted', () => {
    it('renders without crashing', () => {
      const component = shallow(<App />);
      expect(component.exists()).toBe(true);
    });
  });

  describe('when email input field is filled', () => {
    it('stores email value in state', () => {
      const component = shallow(<App />).dive();
      const emailField = component
        .find(Input)
        .first()
        .dive()
        .dive()
        .find('input');
      
      emailField.simulate('change', { target: { value: 'test@email.com'} });
      expect(component.state('email')).toEqual('test@email.com');
    });
  });

  describe('when password input field in filled', () => {
    let component;
    let passwordField;

    beforeEach(() => {
      component = shallow(<App />).dive();
      passwordField = component
      .find(Input)
      .last()
      .dive()
      .dive()
      .find('input');
    });

    it('stores password value in state', () => {
      passwordField.simulate('change', { target: { value: 'password'} });
      expect(component.state('password')).toEqual('password');
    });

    it('runs password validator', () => {
      const instance = component.instance();
      jest.spyOn(instance, 'runPasswordValidator');
      passwordField.simulate('change', { target: { value: 'password'} });

      expect(instance.runPasswordValidator).toHaveBeenCalled();
    });

    describe('when password is complex', () => {
      it('passwordStrength is greater than 2', () => {
        passwordField.simulate('change', { target: { value: '123Compl!@#xPass!!'} });
        expect(component.state('passwordStrength') > 2).toBe(true);
      });
    });

    describe('when password is overtly simple', () => {
      it('passwordStrength is less than 2', () => {
        passwordField.simulate('change', { target: { value: 'password'} });
        expect(component.state('passwordStrength') < 2).toBe(true);
      });
    });
  });

  describe('when form is submitted', () => {
    let component;
    let passwordField;
    let emailField;
    let form;

    beforeEach(() => {
      component = shallow(<App />).dive();
      emailField = component
        .find(Input)
        .first()
        .dive()
        .dive()
        .find('input');
      passwordField = component
        .find(Input)
        .last()
        .dive()
        .dive()
        .find('input');
      form = component.find('form');
    })

    describe('when form is invalid', () => {
      describe('when email field is empty', () => {
        it('displays email error field', () => {
          emailField.simulate('change', { target: { value: '' } });
          passwordField.simulate('change', { target: { value: '123pass#@!' } })
          form.simulate('submit', { preventDefault: () => {} });
  
          const notificationError = component
            .findWhere(n => n.props().children === 'Email is required.')
            .find('li');
  
          expect(notificationError.exists()).toBe(true);
        });
      });
  
      describe('when password field is empty', () => {
        it('displays password empty error field', () => {
          emailField.simulate('change', { target: { value: 'test@email.com' } });
          passwordField.simulate('change', { target: { value: '' } })
          form.simulate('submit', { preventDefault: () => {} });
  
          const notificationError = component
            .findWhere(n => n.props().children === 'password is required.')
            .find('li');
  
          expect(notificationError.exists()).toBe(true);
        });
      });
  
      describe('when password is weak', () => {
        it('displays password is weak error field', () => {
          emailField.simulate('change', { target: { value: 'test@email.com' } });
          passwordField.simulate('change', { target: { value: 'test123!@#' } })
          component.setState({ passwordStrength: 2 });
          form.simulate('submit', { preventDefault: () => {} });
  
          const notificationError = component
            .findWhere(n => n.props().children === 'password is weak.')
            .find('li');
  
          expect(notificationError.exists()).toBe(true);
        });
      });
  
      describe('when password is invalid', () => {
        it('displays password is invalid error field', () => {
          emailField.simulate('change', { target: { value: 'test@email.com' } });
          passwordField.simulate('change', { target: { value: 'aa' } })
          form.simulate('submit', { preventDefault: () => {} });
  
          const notificationError = component
            .findWhere(n => n.props().children === 'password is invalid.')
            .find('li');
  
          expect(notificationError.exists()).toBe(true);
        });
      });
    });

    describe('when form is valid', () => {
      it('alerts the user that registration is complete', () => {
        emailField.simulate('change', { target: { value: 'test@email.com' } });
        passwordField.simulate('change', { target: { value: '123Pass!@#' } })
        form.simulate('submit', { preventDefault: () => {} });

        expect(global.alert).toHaveBeenCalledWith('Registration complete');
      });
    });
  });
});