import Immutable from 'seamless-immutable';
import planReducer, { initialState } from '../PlanReducer';
import { RESET_PLAN_STATE, FETCH_V2V_PLAN } from '../PlanConstants';

describe('RESET_PLAN_STATE', () => {
  test('clears planRequestTasks and vms', () => {
    const action = { type: RESET_PLAN_STATE };
    const prevState = Immutable({
      ...initialState,
      planRequestTasks: ['stuff'],
      vms: ['moar stuffs']
    });
    const state = planReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      planRequestTasks: [],
      vms: []
    });
  });
});

describe('FETCH_V2V_PLAN', () => {
  test('fetching a plan is pending', () => {
    const action = { type: `${FETCH_V2V_PLAN}_PENDING` };
    const prevState = Immutable({
      ...initialState,
      isRejectedPlan: true
    });
    const state = planReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isFetchingPlan: true,
      isRejectedPlan: false
    });
  });

  test('fetching a plan is fulfilled', () => {
    const payload = {
      data: {
        name: 'things'
      }
    };
    const action = {
      type: `${FETCH_V2V_PLAN}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingPlan: true,
      isRejectedPlan: true,
      errorPlan: 'error'
    });
    const state = planReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      plan: payload.data,
      planName: payload.data.name,
      isFetchingPlan: false,
      isRejectedPlan: false,
      errorPlan: null
    });
  });

  test('fetching a plan is rejected', () => {
    const payload = 'error';
    const action = {
      type: `${FETCH_V2V_PLAN}_REJECTED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingPlan: true
    });
    const state = planReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isFetchingPlan: false,
      isRejectedPlan: true,
      errorPlan: payload
    });
  });
});
