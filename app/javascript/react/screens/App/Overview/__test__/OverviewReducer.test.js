import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_TRANSFORMATION_PLANS,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_CANCEL_PLAN_REQUEST
} from '../OverviewConstants';
import overviewReducer, { initialState } from '../OverviewReducer';
import { transformationPlans } from '../overview.transformationPlans.fixtures';
import { cancelRequestResponse } from '../overview.cancelRequest.fixtures';

const initialStateWithInfraMapping = Immutable({
  ...initialState,
  transformationMappings: [{ id: '1' }]
});

describe('fetching transformation plans', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_PENDING`
    };
    const state = overviewReducer(initialStateWithInfraMapping, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
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
      ...initialStateWithInfraMapping,
      isFetchingTransformationPlans: true,
      isRejectedTransformationPlans: true,
      errorTransformationPlans: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      transformationPlans: payload.data.resources
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialStateWithInfraMapping,
      isFetchingTransformationPlans: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      isRejectedTransformationPlans: true,
      errorTransformationPlans: 'error'
    });
  });
});

test('sets the active migration filter', () => {
  const activeFilter = 'foo';
  const action = {
    type: V2V_SET_MIGRATIONS_FILTER,
    payload: activeFilter
  };
  const state = overviewReducer(initialStateWithInfraMapping, action);

  expect(state.migrationsFilter).toBe(activeFilter);
});

describe('cancelling a request', () => {
  const url = '/api/requests/1';

  test('is pending', () => {
    const action = {
      type: `${V2V_CANCEL_PLAN_REQUEST}_PENDING`,
      payload: url
    };

    const state = overviewReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isCancellingPlanRequest: true,
      requestsProcessingCancellation: [url]
    });
  });

  test('is successful', () => {
    const payload = {
      data: cancelRequestResponse
    };
    const action = {
      type: `${V2V_CANCEL_PLAN_REQUEST}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isCancellingPlanRequest: true,
      isRejectedCancelPlanRequest: true,
      errorCancelPlanRequest: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual(initialState);
  });

  test('is rejected', () => {
    const action = {
      type: `${V2V_CANCEL_PLAN_REQUEST}_REJECTED`,
      payload: 'error',
      meta: { url }
    };
    const prevState = Immutable({
      ...initialState,
      isCancellingPlanRequest: true,
      requestsProcessingCancellation: [url]
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedCancelPlanRequest: true,
      errorCancelPlanRequest: 'error',
      requestsProcessingCancellation: []
    });
  });
});
