import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Welcome from './index';

describe('Nav component', () => {
  it('renders the navigation', () => {
    const wrapper = mount(<Welcome />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
