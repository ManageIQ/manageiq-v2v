import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Overview from './index';
import { coreComponents } from '../../../components';
import componentRegistry from '../../../components/componentRegistry';

jest.mock('../../../components/componentRegistry');

componentRegistry.registerMultiple(coreComponents);

describe('Overview component', () => {
  it('renders the overview', () => {
    const wrapper = mount(<Overview />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
