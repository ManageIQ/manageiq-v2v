import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../Settings';

describe('Settings component', () => {
  it('renders correctly', () => {
    const component = shallow(<Settings match={{ path: '/settings' }} />);
    expect(component).toMatchSnapshot();
  });
});
