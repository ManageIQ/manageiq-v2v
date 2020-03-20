import React from 'react';
import { shallow } from 'enzyme';
import CutoverTimeInfoItem from '../CutoverTimeInfoItem';

describe('When initialized with warm migration plan', () => {
  const plan = { options: { config_info: { warm_migration: true } } };
  const planRequest = { options: { cutover_datetime: '2020-02-07T11:52:45-06:00' } };
  const baseProps = {
    plan,
    planRequest
  };

  test('renders info item', () => {
    const wrapper = shallow(<CutoverTimeInfoItem {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('When initialized with cold migration plan', () => {
  const plan = { options: { config_info: {} } };
  const planRequest = { options: {} };
  const baseProps = {
    plan,
    planRequest
  };

  test('returns null', () => {
    const wrapper = shallow(<CutoverTimeInfoItem {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
