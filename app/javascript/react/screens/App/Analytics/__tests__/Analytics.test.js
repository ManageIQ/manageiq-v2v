import React from 'react';
import { shallow } from 'enzyme';
import Analytics from '../Analytics';

describe('Analytics component', () => {
  it('renders correctly', () => {
    const component = shallow(<Analytics />);
    expect(component).toMatchSnapshot();
  });
});
