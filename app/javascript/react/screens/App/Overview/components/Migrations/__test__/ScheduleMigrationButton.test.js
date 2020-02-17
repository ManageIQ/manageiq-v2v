import React from 'react';
import { mount, shallow } from 'enzyme';
import ScheduleMigrationButton from '../ScheduleMigrationButton';

describe('When initialized with cold migration plan', () => {
  const plan = {
    options: { id: 1, status: 'Ok', href: 'url', config_info: { warm_migration: false } }
  };
  const baseProps = {
    plan,
    loading: false,
    isMissingMapping: false,
    toggleScheduleMigrationModal: jest.fn(() => Promise.resolve())
  };

  test('renders Schedule Migration button', () => {
    const wrapper = shallow(<ScheduleMigrationButton {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders Schedule Retry button', () => {
    baseProps.plan.status = 'Error';
    const wrapper = shallow(<ScheduleMigrationButton {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the schedule button launches modal window', async () => {
    const wrapper = mount(<ScheduleMigrationButton {...baseProps} />);
    wrapper.find('button').simulate('click');
    await expect(baseProps.toggleScheduleMigrationModal).toHaveBeenCalledWith({ plan });
  });
});

describe('When initialized with warm migration plan', () => {
  const plan = {
    options: { id: 1, status: 'Ok', href: 'url', config_info: { warm_migration: true } }
  };
  const baseProps = {
    plan,
    loading: false,
    isMissingMapping: false,
    toggleScheduleMigrationModal: jest.fn(() => Promise.resolve())
  };

  test('renders Schedule Cutover button', () => {
    const wrapper = shallow(<ScheduleMigrationButton {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders Schedule Retry button', () => {
    baseProps.plan.status = 'Error';
    const wrapper = shallow(<ScheduleMigrationButton {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the schedule button launches modal window', async () => {
    const wrapper = mount(<ScheduleMigrationButton {...baseProps} />);
    wrapper.find('button').simulate('click');
    await expect(baseProps.toggleScheduleMigrationModal).toHaveBeenCalledWith({ plan });
  });
});
