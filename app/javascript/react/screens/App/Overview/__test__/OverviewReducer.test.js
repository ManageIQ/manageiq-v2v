import Immutable from 'seamless-immutable';

import { FETCH_V2V_TRANSFORMATION_PLANS, V2V_SET_MIGRATIONS_FILTER } from '../OverviewConstants';
import overviewReducer, { initialState } from '../OverviewReducer';
import { transformationPlans } from '../overview.transformationPlans.fixtures';

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

test('sets the active migration filter', () => {
  const activeFilter = 'foo';
  const action = {
    type: V2V_SET_MIGRATIONS_FILTER,
    payload: activeFilter
  };
  const state = overviewReducer(initialState, action);

  expect(state.migrationsFilter).toBe(activeFilter);
});
