import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../components/Input';

describe('Input Component', () => {
  describe('when component is mounted', () => {
    it('renders without crashing', () => {
      const component = shallow(<Input />)
      expect(component.exists()).toBe(true);
    });

    it('matches snapshot', () => {
      const props = {
        label: 'My Input',
        inputProps: {
          id: 'my_input',
          type: 'text'
        }
      }
      
      const component = shallow(<Input {...props} />)
      expect(component).toMatchSnapshot();
    });
  });

  describe('when label prop is present', () => {
    it('expects label html component to be present', () => {
      const props = { label: 'my label' };
      const component = shallow(<Input {...props} />);
      const label = component.dive().find('label');

      expect(label.exists()).toBe(true);
    });
  });

  describe('when label prop is NOT present', () => {
    it('expects label html component to NOT be present', () => {
      const component = shallow(<Input />);
      const label = component.dive().find('label');

      expect(label.exists()).toBe(false);
    });
  });

  describe('when input is changed', () => {
    it('expects onChange handler to be called', () => {
      const props = {
        label: 'email',
        inputProps: {
          onChange: jest.fn(),
          name: 'email',
          type: 'text'
        }
      };

      const component = shallow(<Input {...props} />);
      component.dive().find('input').simulate('change');

      expect(props.inputProps.onChange).toHaveBeenCalled();
    });
  });
});
