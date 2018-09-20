import numeral from 'numeral';
import { V2V_VM_POST_VALIDATION_REASONS } from './PlanWizardVMStepConstants';

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

const manageNoIdVMRows = (vm, vmIndex) => {
  if (!vm.id) {
    vm.id = `no-id-${vmIndex}`;
  }
};

const manageOddCSVImportErrors = (vm, vmIndex, uniqueIds) => {
  manageNoIdVMRows(vm, vmIndex);
  manageDuplicateVMRows(vm, vmIndex, uniqueIds);
  manageBlankReason(vm);
};

export const _formatValidVms = vms => {
  const uniqueIds = vms && [...new Set(vms.map(value => value.id))];
  return (
    vms &&
    vms.map((v, vIndex) => {
      v.valid = true;
      v.allocated_size = numeral(v.allocated_size).format('0.00b');
      v.reason = V2V_VM_POST_VALIDATION_REASONS[v.reason];
      manageDuplicateVMRows(v, vIndex, uniqueIds);
      return v;
    })
  );
};

export const _formatInvalidVms = vms => {
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

export const _formatConflictVms = vms => {
  const inactiveVMCount = (vms && vms.filter(vm => vm.cluster === '' || vm.path === '').length) || 0;
  const allVMCount = (vms && vms.length) || 0;
  const vmCount = inactiveVMCount > 0 ? allVMCount - inactiveVMCount : allVMCount;
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
