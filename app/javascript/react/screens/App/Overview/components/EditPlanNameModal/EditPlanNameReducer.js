import Immutable from 'seamless-immutable';
import {
  V2V_EDIT_PLAN_TITLE_SHOW_ALERT,
  V2V_EDIT_PLAN_TITLE_HIDE_ALERT,
  V2V_POST_EDIT_PLAN_TITLE
} from './EditPlanNameConstants';

const initialState = Immutable({
  alertText: '',
  savingPlan: false,
  savingPlanRejected: false,
  savingPlanError: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_EDIT_PLAN_TITLE_SHOW_ALERT:
      return Immutable.merge(state, action.payload);
    case V2V_EDIT_PLAN_TITLE_HIDE_ALERT:
      return state.set('alertText', '');
    case `${V2V_POST_EDIT_PLAN_TITLE}_PENDING`:
      return state
        .set('savingPlan', true)
        .set('savingPlanRejected', false)
        .set('savingPlanError', null);
    case `${V2V_POST_EDIT_PLAN_TITLE}_FULFILLED`:
      return state
        .set('savingPlan', false)
        .set('savingPlanRejected', false)
        .set('savingPlanError', null);
    case `${V2V_POST_EDIT_PLAN_TITLE}_REJECTED`:
      return state
        .set('savingPlan', false)
        .set('savingPlanRejected', true)
        .set('savingPlanError', action.payload);
    default:
      return state;
  }
};
