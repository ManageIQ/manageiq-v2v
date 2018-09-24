import Immutable from 'seamless-immutable';

import {
  POST_V2V_MIGRATION_PLANS,
  POST_V2V_MIGRATION_REQUESTS,
  PUT_V2V_MIGRATION_PLANS
} from './PlanWizardResultsStepConstants';

const initialState = Immutable({
  isPostingPlans: false,
  isRejectedPostingPlans: false,
  errorPostingPlans: null,
  migrationPlansResult: {},
  isPuttingPlans: false,
  isRejectedPuttingPlans: false,
  errorPuttingPlans: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${POST_V2V_MIGRATION_PLANS}_PENDING`:
      return state.set('isPostingPlans', true);
    case `${POST_V2V_MIGRATION_PLANS}_FULFILLED`:
      return state
        .set('migrationPlansResult', action.payload.data)
        .set('isRejectedPostingPlans', false)
        .set('isPostingPlans', false);
    case `${POST_V2V_MIGRATION_PLANS}_REJECTED`:
      return state
        .set('errorPostingPlans', action.payload)
        .set('isRejectedPostingPlans', true)
        .set('isPostingPlans', false);
    case `${PUT_V2V_MIGRATION_PLANS}_PENDING`:
      return state.set('isPuttingPlans', true);
    case `${PUT_V2V_MIGRATION_PLANS}_FULFILLED`:
      return state
        .set('migrationPlansResult', action.payload)
        .set('isRejectedPuttingPlans', false)
        .set('isPuttingPlans', false);
    case `${PUT_V2V_MIGRATION_PLANS}_REJECTED`:
      return state
        .set('errorPuttingPlans', action.payload)
        .set('isRejectedPuttingPlans', true)
        .set('isPuttingPlans', false);
    case `${POST_V2V_MIGRATION_REQUESTS}_PENDING`:
      return state.set('isPostingRequests', true);
    case `${POST_V2V_MIGRATION_REQUESTS}_FULFILLED`:
      return state
        .set('migrationRequestsResult', action.payload.data)
        .set('isRejectedPostingRequests', false)
        .set('isPostingRequests', false);
    case `${POST_V2V_MIGRATION_REQUESTS}_REJECTED`:
      return state
        .set('errorPostingRequests', action.payload)
        .set('isRejectedPostingRequests', true)
        .set('isPostingRequests', false);
    default:
      return state;
  }
};
