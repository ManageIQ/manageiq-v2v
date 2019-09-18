import Immutable from 'seamless-immutable';
import { V2V_POST_EDIT_PLAN_NAME } from './EditPlanNameConstants';

const initialState = Immutable({
  alertText: '',
  savingPlan: false,
  savingPlanRejected: false,
  savingPlanError: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${V2V_POST_EDIT_PLAN_NAME}_PENDING`:
      return state
        .set('savingPlan', true)
        .set('savingPlanRejected', false)
        .set('savingPlanError', null);
    case `${V2V_POST_EDIT_PLAN_NAME}_FULFILLED`:
      return state
        .set('savingPlan', false)
        .set('savingPlanRejected', false)
        .set('savingPlanError', null);
    case `${V2V_POST_EDIT_PLAN_NAME}_REJECTED`:
      return state
        .set('savingPlan', false)
        .set('savingPlanRejected', true)
        .set('savingPlanError', action.payload);
    default:
      return state;
  }
};
