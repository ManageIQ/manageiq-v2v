import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../Settings';

describe('Settings component', () => {
  const fetchProductFeaturesAction = jest
    .fn()
    .mockReturnValue(Promise.resolve({ identity: { miq_groups: [{ product_features: ['everything'] }] } }));

  it('renders correctly', () => {
    const component = shallow(
      <Settings match={{ path: '/settings' }} fetchProductFeaturesAction={fetchProductFeaturesAction} />
    );
    expect(component).toMatchSnapshot();
  });
});
