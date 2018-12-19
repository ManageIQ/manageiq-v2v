import Immutable from 'seamless-immutable';

import { V2V_VALIDATE_VMS, V2V_VM_STEP_RESET, QUERY_V2V_PLAN_VMS } from './PlanWizardVMStepConstants';
import { _formatConflictVms, _formatInvalidVms, _formatValidVms } from './helpers';

const initialState = Immutable({
  isValidatingVms: false,
  numPendingValidationRequests: 0,
  isRejectedValidatingVms: false,
  validationServiceCalled: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: [],
  isQueryingVms: false,
  isVmsQueryRejected: false,
  vmsQueryError: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${V2V_VALIDATE_VMS}_PENDING`:
      return state
        .set('isValidatingVms', true)
        .set('isRejectedValidatingVms', false)
        .set('numPendingValidationRequests', state.numPendingValidationRequests + 1);
    case `${V2V_VALIDATE_VMS}_FULFILLED`: {
      const { payload, meta } = action;
      const numPendingRequests = state.numPendingValidationRequests - 1;
      if (payload && payload.data) {
        const newValidVms = _formatValidVms(payload.data.valid) || [];
        const newInvalidVms = _formatInvalidVms(payload.data.invalid) || [];
        const newConflictedVms = _formatConflictVms(payload.data.conflicted) || [];
        return state
          .set('valid_vms', meta.combineRequests ? [...state.valid_vms, ...newValidVms] : newValidVms)
          .set('invalid_vms', meta.combineRequests ? [...state.invalid_vms, ...newInvalidVms] : newInvalidVms)
          .set('conflict_vms', meta.combineRequests ? [...state.conflict_vms, ...newConflictedVms] : newConflictedVms)
          .set('validationServiceCalled', true)
          .set('isRejectedValidatingVms', false)
          .set('isValidatingVms', numPendingRequests > 0)
          .set('numPendingValidationRequests', numPendingRequests);
      }
      return state
        .set('valid_vms', [])
        .set('invalid_vms', [])
        .set('conflict_vms', [])
        .set('isRejectedValidatingVms', false)
        .set('isValidatingVms', numPendingRequests > 0)
        .set('numPendingValidationRequests', numPendingRequests);
    }
    case `${V2V_VALIDATE_VMS}_REJECTED`: {
      const numPendingRequests = state.numPendingValidationRequests - 1;
      return state
        .set('errorValidatingVms', action.payload)
        .set('isRejectedValidatingVms', true)
        .set('isValidatingVms', numPendingRequests > 0)
        .set('numPendingValidationRequests', numPendingRequests)
        .set('isCSVParseError', false);
    }
    case `${V2V_VALIDATE_VMS}_CSV_PARSE_ERROR`:
      return state
        .set('errorParsingCSV', action.payload)
        .set('isRejectedValidatingVms', true)
        .set('isCSVParseError', true)
        .set('isValidatingVms', false);
    case `${QUERY_V2V_PLAN_VMS}_PENDING`:
      return state
        .set('isQueryingVms', true)
        .set('isVmsQueryRejected', false)
        .set('vmsQueryError', null);
    case `${QUERY_V2V_PLAN_VMS}_FULFILLED`: {
      const { payload } = action;
      if (payload && payload.data) {
        return state
          .set('isQueryingVms', false)
          .set('isVmsQueryRejected', false)
          .set('vmsQueryError', null);
      }
      return state
        .set('isQueryingVms', false)
        .set('isVmsQueryRejected', false)
        .set('vmsQueryError', null);
    }
    case `${QUERY_V2V_PLAN_VMS}_REJECTED`:
      return state
        .set('isQueryingVms', false)
        .set('isVmsQueryRejected', true)
        .set('vmsQueryError', action.payload);
    case V2V_VM_STEP_RESET:
      return state
        .set('validationServiceCalled', false)
        .set('valid_vms', [])
        .set('invalid_vms', [])
        .set('conflict_vms', [])
        .set('isRejectedValidatingVms', false)
        .set('isValidatingVms', false);

    default:
      return state;
  }
};
