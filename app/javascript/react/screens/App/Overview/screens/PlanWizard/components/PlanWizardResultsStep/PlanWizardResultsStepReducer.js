import Immutable from 'seamless-immutable';

import { POST_V2V_MIGRATION_PLANS } from './PlanWizardResultsStepConstants';

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
    default:
      return state;
  }
};
