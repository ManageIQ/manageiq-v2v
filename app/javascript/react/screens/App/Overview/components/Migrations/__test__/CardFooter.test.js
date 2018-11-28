import React from 'react';
import { mount } from 'enzyme';

import CardFooter from '../CardFooter';

describe('CardFooter', () => {
  test('handles button clicks', () => {
    const onButtonClick = jest.fn();
    const wrapper = mount(<CardFooter onButtonClick={onButtonClick} />);

    wrapper.find('Button').simulate('click');
    expect(onButtonClick).toHaveBeenCalled();
    wrapper.unmount();
  });

  test('disables the button', () => {
    const wrapper = mount(<CardFooter disabled />);

    expect(wrapper.find('Button').props().disabled).toBeTruthy();
    wrapper.unmount();
  });

  test('displays the button text', () => {
    const text = 'hello';
    const wrapper = mount(<CardFooter buttonText={text} />);

    expect(wrapper.text()).toBe(text);
  });
});
