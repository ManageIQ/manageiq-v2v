import Immutable from 'seamless-immutable';
import numeral from 'numeral';

import {
  V2V_VALIDATE_VMS,
  V2V_VM_STEP_RESET,
  V2V_VM_POST_VALIDATION_REASONS
} from './PlanWizardVMStepConstants';

const initialState = Immutable({
  isValidatingVms: false,
  isRejectedValidatingVms: false,
  validationServiceCalled: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: []
});

const manageDuplicateVMRows = (vm, vmIndex, uniqueIds) => {
  const index = vm.id && uniqueIds.indexOf(vm.id);
  if (index > -1) {
    uniqueIds.splice(index, 1);
  } else if (index === -1) {
    vm.reason = V2V_VM_POST_VALIDATION_REASONS.duplicate;
    vm.warning = false;
    vm.valid = false;
    vm.invalid = true;
    vm.id = `duplicate-${vm.id}-${vmIndex}`;
  }
};

const manageBlankReason = vm => {
  if (!vm.reason) {
    vm.reason = V2V_VM_POST_VALIDATION_REASONS.no_info_available;
  }
};

const manageOddCSVImportErrors = (vm, vmIndex, uniqueIds) => {
  manageDuplicateVMRows(vm, vmIndex, uniqueIds);
  manageBlankReason(vm);
};

const _formatValidVms = vms => {
  const uniqueIds = vms && [...new Set(vms.map(value => value.id))];
  return (
    vms &&
    vms.map((v, vIndex) => {
      v.valid = true;
      v.allocated_size = numeral(v.allocated_size).format('0.00b');
      v.reason = V2V_VM_POST_VALIDATION_REASONS[v.reason];
      manageOddCSVImportErrors(v, vIndex, uniqueIds);
      return v;
    })
  );
};

const _formatInvalidVms = vms => {
  const uniqueIds = vms && [...new Set(vms.map(value => value.id))];
  return (
    vms &&
    vms.map((v, vIndex) => {
      v.allocated_size = numeral(v.allocated_size).format('0.00b');
      v.reason = V2V_VM_POST_VALIDATION_REASONS[v.reason];
      if (
        v.reason === V2V_VM_POST_VALIDATION_REASONS.migrated ||
        v.reason === V2V_VM_POST_VALIDATION_REASONS.in_other_plan
      ) {
        v.warning = true;
      } else {
        v.invalid = true;
      }
      manageOddCSVImportErrors(v, vIndex, uniqueIds);
      return v;
    })
  );
};

const _formatConflictVms = vms => {
  const inactiveVMCount =
    (vms && vms.filter(vm => vm.cluster === '' || vm.path === '').length) || 0;
  const allVMCount = (vms && vms.length) || 0;
  const vmCount =
    inactiveVMCount > 0 ? allVMCount - inactiveVMCount : allVMCount;
  const uniqueIds = vms && [...new Set(vms.map(value => value.id))];
  return (
    vms &&
    vms.map((v, vIndex) => {
      v.allocated_size = numeral(v.allocated_size).format('0.00b');
      v.reason = V2V_VM_POST_VALIDATION_REASONS[v.reason];

      if (v.cluster === '' || v.path === '') {
        v.reason = V2V_VM_POST_VALIDATION_REASONS.inactive;
        v.invalid = true;
      } else if (vmCount === 1) {
        v.reason = V2V_VM_POST_VALIDATION_REASONS.ok;
        v.valid = true;
      } else if (vmCount > 1) {
        v.warning = true;
      }

      manageOddCSVImportErrors(v, vIndex, uniqueIds);
      return v;
    })
  );
};

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
