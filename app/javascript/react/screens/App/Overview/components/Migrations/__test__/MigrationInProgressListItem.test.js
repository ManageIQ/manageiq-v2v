import React from 'react';
import { shallow, mount } from 'enzyme';

import MigrationInProgressListItem from '../MigrationInProgressListItem';
import { transformationPlans } from '../../../overview.transformationPlans.fixtures';
import {
  MIGRATIONS_FILTERS,
  TRANSFORMATION_PLAN_REQUESTS_URL,
  FETCH_TRANSFORMATION_PLANS_URL
} from '../../../OverviewConstants';

describe('when the request is denied', () => {
  const plan = { ...transformationPlans.resources[7], transformation_mapping: { transformation_mapping_items: [] } };
  const [deniedRequest] = plan.miq_requests;
  const allRequestsWithTasks = [{ ...deniedRequest, miq_request_tasks: [] }];
  const baseProps = {
    plan,
    allRequestsWithTasks
  };

  test('renders an error view', () => {
    const wrapper = shallow(<MigrationInProgressListItem {...baseProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the cancel button acknowledges the dismissal and switches the view to completed migrations', async () => {
    const acknowledgeDeniedPlanRequestAction = jest.fn(() => Promise.resolve());
    const setMigrationsFilterAction = jest.fn();
    const wrapper = mount(
      <MigrationInProgressListItem
        {...baseProps}
        acknowledgeDeniedPlanRequestAction={acknowledgeDeniedPlanRequestAction}
        setMigrationsFilterAction={setMigrationsFilterAction}
      />
    );

    wrapper.find('Button').simulate('click');

    await expect(acknowledgeDeniedPlanRequestAction).toHaveBeenCalled();
    expect(setMigrationsFilterAction).toHaveBeenCalledWith(MIGRATIONS_FILTERS.completed);

    wrapper.unmount();
  });
});

describe('if there are no conversion hosts available', () => {
  const plan = { ...transformationPlans.resources[5], transformation_mapping: { transformation_mapping_items: [] } };
  const [request] = plan.miq_requests;
  const allRequestsWithTasks = [{ ...request, miq_request_tasks: [{ conversion_host_id: null }] }];
  const baseProps = {
    plan,
    allRequestsWithTasks,
    requestsProcessingCancellation: []
  };

  test('renders an error view', () => {
    const wrapper = shallow(<MigrationInProgressListItem {...baseProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the cancel button initiates cancel at the request level and refreshes plans', async () => {
    const cancelPlanRequestAction = jest.fn(() => Promise.resolve());
    const fetchTransformationPlansAction = jest.fn();
    const wrapper = mount(
      <MigrationInProgressListItem
        {...baseProps}
        cancelPlanRequestAction={cancelPlanRequestAction}
        fetchTransformationPlansAction={fetchTransformationPlansAction}
        fetchTransformationPlansUrl={FETCH_TRANSFORMATION_PLANS_URL}
      />
    );

    wrapper.find('Button').simulate('click');

    await expect(cancelPlanRequestAction).toHaveBeenCalledWith(TRANSFORMATION_PLAN_REQUESTS_URL, request.id);
    expect(fetchTransformationPlansAction).toHaveBeenCalledWith({
      url: FETCH_TRANSFORMATION_PLANS_URL,
      archived: false
    });
  });
});

describe('warm migration without cutover date set', () => {
  const plan = {
    ...transformationPlans.resources[8],
    transformation_mapping: { transformation_mapping_items: [] },
    infraMappingName: 'name'
  };
  const [request] = plan.miq_requests;
  const allRequestsWithTasks = [{ ...request, miq_request_tasks: [{ conversion_host_id: 1 }] }];
  const baseProps = {
    plan,
    allRequestsWithTasks,
    requestsProcessingCancellation: [],
    loading: false
  };

  test('renders an in progress view', () => {
    const wrapper = shallow(<MigrationInProgressListItem {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the schedule cutover button launches modal window', async () => {
    const toggleScheduleMigrationModal = jest.fn(() => Promise.resolve());
    const wrapper = mount(
      <MigrationInProgressListItem {...baseProps} toggleScheduleMigrationModal={toggleScheduleMigrationModal} />
    );

    wrapper.find('button').simulate('click');
    await expect(toggleScheduleMigrationModal).toHaveBeenCalledWith({ plan });
  });
});

describe('warm migration with cutover date set', () => {
  const plan = {
    ...transformationPlans.resources[9],
    transformation_mapping: { transformation_mapping_items: [] },
    infraMappingName: 'name'
  };
  const [request] = plan.miq_requests;
  const allRequestsWithTasks = [{ ...request, miq_request_tasks: [{ conversion_host_id: 1 }] }];
  const baseProps = {
    plan,
    allRequestsWithTasks,
    requestsProcessingCancellation: [],
    loading: false
  };

  test('renders an in progress view', () => {
    const wrapper = shallow(<MigrationInProgressListItem {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the edit cutover button launches modal window', async () => {
    const toggleScheduleMigrationModal = jest.fn(() => Promise.resolve());
    const wrapper = mount(
      <MigrationInProgressListItem {...baseProps} toggleScheduleMigrationModal={toggleScheduleMigrationModal} />
    );

    wrapper.find('a[id^="edit_cutover"]').simulate('click');
    await expect(toggleScheduleMigrationModal).toHaveBeenCalledWith({ plan });
  });

  test('clicking the delete cutover button launches confirmation window', async () => {
    const showConfirmModalAction = jest.fn(() => Promise.resolve());
    const wrapper = mount(
      <MigrationInProgressListItem {...baseProps} showConfirmModalAction={showConfirmModalAction} />
    );

    wrapper.find('a[id^="delete_cutover"]').simulate('click');
    await expect(showConfirmModalAction).toHaveBeenCalled();
  });
});
