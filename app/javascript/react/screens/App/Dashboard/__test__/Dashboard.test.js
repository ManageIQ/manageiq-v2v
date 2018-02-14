import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dashboard from '../Dashboard';

describe('Dashboard component', () => {
  it('renders the dashboard', () => {
    const wrapper = mount(<Dashboard />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
