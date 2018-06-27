import Immutable from 'seamless-immutable';

import { POST_V2V_MIGRATION_PLANS, POST_V2V_MIGRATION_REQUESTS } from './PlanWizardResultsStepConstants';

const initialState = Immutable({
  isPostingPlans: true,
  isRejectedPostingPlans: false,
  errorPostingPlans: null,
  migrationPlansResult: {}
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
