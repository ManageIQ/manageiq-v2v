import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS,
  FETCH_V2V_TRANSFORMATION_PLANS
} from '../OverviewConstants';
import overviewReducer, { initialState } from '../OverviewReducer';
import { transformationPlanRequests } from '../overview.transformationPlanRequests.fixtures';
import { transformationPlans } from '../overview.transformationPlans.fixtures';

describe('fetching transformation plan requests', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS}_PENDING`
    };
    const state = overviewReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isFetchingTransformationPlanRequests: true
    });
  });

  test('is successful', () => {
    const payload = {
      data: transformationPlanRequests
    };
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingTransformationPlanRequests: true,
      isRejectedTransformationPlanRequests: true,
      errorTransformationPlanRequests: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      transformationPlanRequests: payload.data.resources
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingTransformationPlanRequests: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedTransformationPlanRequests: true,
      errorTransformationPlanRequests: 'error'
    });
  });
});

describe('fetching transformation plans', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_PENDING`
    };
    const state = overviewReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isFetchingTransformationPlans: true
    });
  });

  test('is successful', () => {
    const payload = {
      data: transformationPlans
    };
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingTransformationPlans: true,
      isRejectedTransformationPlans: true,
      errorTransformationPlans: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      transformationPlans: payload.data.resources
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingTransformationPlans: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedTransformationPlans: true,
      errorTransformationPlans: 'error'
    });
  });
});
