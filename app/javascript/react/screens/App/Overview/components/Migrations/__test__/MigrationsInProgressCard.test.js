import React from 'react';
import { shallow, mount } from 'enzyme';

import MigrationsInProgressCard from '../MigrationsInProgressCard';
import { transformationPlans } from '../../../overview.transformationPlans.fixtures';
import {
  MIGRATIONS_FILTERS,
  TRANSFORMATION_PLAN_REQUESTS_URL,
  FETCH_TRANSFORMATION_PLANS_URL
} from '../../../OverviewConstants';
import { TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES } from '../../../../Mappings/screens/MappingWizard/MappingWizardConstants';

describe('when the request is denied', () => {
  const plan = { ...transformationPlans.resources[7], transformation_mapping: { transformation_mapping_items: [] } };
  const [deniedRequest] = plan.miq_requests;
  const allRequestsWithTasks = [{ ...deniedRequest, miq_request_tasks: [] }];
  const baseProps = {
    plan,
    allRequestsWithTasks
  };

  test('the card renders an error view', () => {
    const wrapper = shallow(<MigrationsInProgressCard {...baseProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the cancel button acknowledges the dismissal and switches the view to completed migrations', async () => {
    const acknowledgeDeniedPlanRequestAction = jest.fn(() => Promise.resolve());
    const setMigrationsFilterAction = jest.fn();
    const wrapper = mount(
      <MigrationsInProgressCard
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

  test('the card renders an error view', () => {
    const wrapper = shallow(<MigrationsInProgressCard {...baseProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('clicking the cancel button initiates cancel at the request level and refreshes plans', async () => {
    const cancelPlanRequestAction = jest.fn(() => Promise.resolve());
    const fetchTransformationPlansAction = jest.fn();
    const wrapper = mount(
      <MigrationsInProgressCard
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
