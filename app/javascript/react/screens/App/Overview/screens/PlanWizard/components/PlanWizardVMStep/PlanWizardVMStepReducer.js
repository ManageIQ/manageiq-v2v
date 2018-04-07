import Immutable from 'seamless-immutable';

import { V2V_VALIDATE_VMS } from './PlanWizardVMStepConstants';

const initialState = Immutable({
  isValidatingVms: true,
  isRejectedValidatingVms: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: []
});

const _formatValidVms = vms =>
  vms.map(v => {
    v.valid = true;
    v.allocated_size = numeral(v.allocated_size).format('0.00b');
    return v;
  });
const _formatInvalidVms = vms =>
  vms.map(v => {
    v.invalid = true;
    v.allocated_size = numeral(v.allocated_size).format('0.00b');
    return v;
  });
const _formatConflictVms = vms =>
  vms.map(v => {
    v.conflict = true;
    v.allocated_size = numeral(v.allocated_size).format('0.00b');
    return v;
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case `${V2V_VALIDATE_VMS}_PENDING`:
      return state
        .set('isValidatingVms', true)
        .set('isRejectedValidatingVms', false);
    case `${V2V_VALIDATE_VMS}_FULFILLED`: {
      const { payload } = action;
      if (payload && payload.data) {
        return state
          .set('valid_vms', _formatValidVms(payload.data.valid_vms))
          .set('invalid_vms', _formatInvalidVms(payload.data.invalid_vms))
          .set('conflict_vms', _formatConflictVms(payload.data.conflict_vms))
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
        .set('isValidatingVms', false);

    default:
      return state;
  }
};
