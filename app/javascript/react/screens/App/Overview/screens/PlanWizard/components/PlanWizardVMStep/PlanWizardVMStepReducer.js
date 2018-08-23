import Immutable from 'seamless-immutable';

import { V2V_VALIDATE_VMS, V2V_VM_STEP_RESET } from './PlanWizardVMStepConstants';
import { _formatConflictVms, _formatInvalidVms, _formatValidVms } from './helpers';

const initialState = Immutable({
  isValidatingVms: false,
  isRejectedValidatingVms: false,
  validationServiceCalled: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${V2V_VALIDATE_VMS}_PENDING`:
      return state.set('isValidatingVms', true).set('isRejectedValidatingVms', false);
    case `${V2V_VALIDATE_VMS}_FULFILLED`: {
      const { payload } = action;
      if (payload && payload.data) {
        return state
          .set('valid_vms', _formatValidVms(payload.data.valid))
          .set('invalid_vms', _formatInvalidVms(payload.data.invalid))
          .set('conflict_vms', _formatConflictVms(payload.data.conflicted))
          .set('validationServiceCalled', true)
          .set('isRejectedValidatingVms', false)
          .set('isValidatingVms', false);
      }
      return state
        .set('valid_vms', [])
        .set('invalid_vms', [])
        .set('conflict_vms', [])
        .set('isRejectedValidatingVms', false)
        .set('isValidatingVms', false);
    }
    case `${V2V_VALIDATE_VMS}_REJECTED`:
      return state
        .set('errorValidatingVms', action.payload)
        .set('isRejectedValidatingVms', true)
        .set('isValidatingVms', false)
        .set('isCSVParseError', false);
    case `${V2V_VALIDATE_VMS}_CSV_PARSE_ERROR`:
      return state
        .set('errorParsingCSV', action.payload)
        .set('isRejectedValidatingVms', true)
        .set('isCSVParseError', true)
        .set('isValidatingVms', false);
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
