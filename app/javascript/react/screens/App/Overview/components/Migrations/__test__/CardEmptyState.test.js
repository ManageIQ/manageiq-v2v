import React from 'react';
import { mount } from 'enzyme';

import CardEmptyState from '../CardEmptyState';

describe('CardEmptyState', () => {
  test('renders a spinner', () => {
    const wrapper = mount(<CardEmptyState showSpinner />);

    expect(wrapper.find('Spinner')).toBeTruthy();
    wrapper.unmount();
  });

  test('renders an icon', () => {
    const wrapper = mount(<CardEmptyState iconType="pf" iconName="ok" />);

    expect(wrapper.find('Icon')).toBeTruthy();
    wrapper.unmount();
  });

  test('renders info', () => {
    const info = 'hello';
    const wrapper = mount(<CardEmptyState emptyStateInfo={info} />);

    expect(wrapper.find('EmptyStateInfo')).toBeTruthy();
    expect(wrapper.text()).toBe(info);
    wrapper.unmount();
  });
});
