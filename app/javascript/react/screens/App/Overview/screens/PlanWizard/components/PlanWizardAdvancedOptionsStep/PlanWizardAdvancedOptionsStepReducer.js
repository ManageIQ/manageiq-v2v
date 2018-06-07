import Immutable from 'seamless-immutable';

import { validatePlaybooks } from './PlanWizardAdvancedOptionsStepValidators';

import {
  FETCH_V2V_PLAYBOOKS,
  SET_V2V_ADVANCED_OPTIONS_STEP_VMS,
  RESET_V2V_ADVANCED_OPTIONS_STEP_VMS
} from './PlanWizardAdvancedOptionsStepConstants';

const initialState = Immutable({
  playbooks: [],
  isFetchingPlaybooks: false,
  isRejectedPlaybooks: false,
  errorPlaybooks: null,
  vms: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_PLAYBOOKS}_PENDING`:
      return state.set('isFetchingPlaybooks', true).set('isRejectedPlaybooks', false);
    case `${FETCH_V2V_PLAYBOOKS}_FULFILLED`:
      validatePlaybooks(action.payload.data.resources);
      return state
        .set('playbooks', action.payload.data.resources)
        .set('isFetchingPlaybooks', false)
        .set('isRejectedPlaybooks', false)
        .set('errorPlaybooks', null);
    case `${FETCH_V2V_PLAYBOOKS}_REJECTED`:
      return state
        .set('errorPlaybooks', action.payload)
        .set('isFetchingPlaybooks', false)
        .set('isRejectedPlaybooks', true);
    case SET_V2V_ADVANCED_OPTIONS_STEP_VMS:
      return state.set('vms', action.payload);
    case RESET_V2V_ADVANCED_OPTIONS_STEP_VMS:
      return state.set('vms', []);
    default:
      return state;
  }
};
