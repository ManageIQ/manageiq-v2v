import React from 'react';
import { shallow } from 'enzyme';
import ScheduleMigrationModal from '../ScheduleMigrationModal';

describe('When initialized with warm migration plan', () => {
  const plan = {
    status: 'Ok',
    options: { config_info: { warm_migration: true } }
  };
  const baseProps = {
    scheduleMigrationModal: true,
    toggleScheduleMigrationModal: jest.fn(() => Promise.resolve()),
    scheduleMigrationPlan: plan,
    scheduleMigration: jest.fn(() => Promise.resolve()),
    scheduleMigrationNow: jest.fn(() => Promise.resolve()),
    scheduleCutover: jest.fn(() => Promise.resolve()),
    fetchTransformationPlansAction: jest.fn(() => Promise.resolve()),
    fetchTransformationPlansUrl: 'http://some-url/'
  };

  test('renders schedule cutover modal', () => {
    const wrapper = shallow(<ScheduleMigrationModal {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('modal buttons work correctly', async () => {
    const wrapper = shallow(<ScheduleMigrationModal {...baseProps} />);
    wrapper.find('Button[bsStyle="primary"]').simulate('click');
    expect(baseProps.scheduleCutover).toHaveBeenCalled();
    wrapper.find('Button[bsStyle="default"]').simulate('click');
    expect(baseProps.toggleScheduleMigrationModal).toHaveBeenCalled();
  });
});

describe('When initialized with cold migration plan', () => {
  const plan = {
    status: 'Ok',
    options: { config_info: { warm_migration: false } }
  };
  const baseProps = {
    scheduleMigrationModal: true,
    toggleScheduleMigrationModal: jest.fn(() => Promise.resolve()),
    scheduleMigrationPlan: plan,
    scheduleMigration: jest.fn(() => Promise.resolve()),
    scheduleMigrationNow: jest.fn(() => Promise.resolve()),
    scheduleCutover: jest.fn(() => Promise.resolve()),
    fetchTransformationPlansAction: jest.fn(() => Promise.resolve()),
    fetchTransformationPlansUrl: 'http://some-url/'
  };

  test('renders schedule migration modal', () => {
    const wrapper = shallow(<ScheduleMigrationModal {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('modal buttons work correctly', async () => {
    const wrapper = shallow(<ScheduleMigrationModal {...baseProps} />);
    wrapper.find('Button[bsStyle="primary"]').simulate('click');
    expect(baseProps.scheduleMigration).toHaveBeenCalled();
    wrapper.find('Button[bsStyle="default"]').simulate('click');
    expect(baseProps.toggleScheduleMigrationModal).toHaveBeenCalled();
  });
});

describe('When initialized with failed cold migration plan', () => {
  const plan = {
    status: 'Error',
    options: { config_info: { warm_migration: false } }
  };
  const baseProps = {
    scheduleMigrationModal: true,
    toggleScheduleMigrationModal: jest.fn(() => Promise.resolve()),
    scheduleMigrationPlan: plan,
    scheduleMigration: jest.fn(() => Promise.resolve()),
    scheduleMigrationNow: jest.fn(() => Promise.resolve()),
    scheduleCutover: jest.fn(() => Promise.resolve()),
    fetchTransformationPlansAction: jest.fn(() => Promise.resolve()),
    fetchTransformationPlansUrl: 'http://some-url/'
  };

  test('renders schedule retry modal', () => {
    const wrapper = shallow(<ScheduleMigrationModal {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
