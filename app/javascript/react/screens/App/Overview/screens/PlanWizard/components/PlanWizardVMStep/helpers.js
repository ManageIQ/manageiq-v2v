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

const manageNoIdVMRows = (vm, vmIndex) => (!vm.id ? { ...vm, id: `no-id-${vmIndex}` } : vm);

const fillMissingIds = vms => vms && vms.map((vm, vmIndex) => (vm.id ? vm : manageNoIdVMRows(vm, vmIndex)));

const manageOddCSVImportErrors = (vm, vmIndex, uniqueIds) => {
  manageDuplicateVMRows(vm, vmIndex, uniqueIds);
  manageBlankReason(vm);
};

export const parseVmPath = vm => {
  if (vm.path === undefined) {
    return { provider: '', datacenter: '', folder: '' };
  }
  const [provider, datacenter, ...folderParts] = vm.path.split('/');
  return {
    provider,
    datacenter: datacenter || '',
    folder: `/${folderParts.join('/')}`
  };
};

const attachMetadata = (vms, meta) => {
  if (!vms) return [];
  const csvFieldsByVmName =
    meta.csvRows &&
    meta.csvRows.length > 0 &&
    meta.csvRows.reduce(
      (newObject, row) => ({
        ...newObject,
        [row.name]: row
      }),
      {}
    );
  return vms.map(vm => ({
    ...vm,
    ...parseVmPath(vm),
    csvFields: csvFieldsByVmName && csvFieldsByVmName[vm.name]
  }));
};

export const _formatValidVms = (payloadVms, meta) => {
  const vms = attachMetadata(payloadVms, meta);
  const uniqueIds = vms && [...new Set(vms.map(value => value.id))];
  return (
    vms &&
    vms.map((v, vIndex) => {
      v.valid = true;
      v.allocated_size = numeral(v.allocated_size).format('0.00 ib');
      v.reason = V2V_VM_POST_VALIDATION_REASONS[v.reason];
      manageDuplicateVMRows(v, vIndex, uniqueIds);
      return v;
    })
  );
};

export const _formatInvalidVms = (payloadVms, meta) => {
  const vms = attachMetadata(payloadVms, meta);
  const backfilledVms = fillMissingIds(vms);
  const uniqueIds = backfilledVms && [...new Set(backfilledVms.map(vm => vm.id))];
  return (
    backfilledVms &&
    backfilledVms.map((v, vIndex) => {
      v.allocated_size = numeral(v.allocated_size).format('0.00 ib');
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

export const _formatConflictVms = (payloadVms, meta) => {
  const vms = attachMetadata(payloadVms, meta);
  const inactiveVMCount = (vms && vms.filter(vm => vm.cluster === '' || vm.path === '').length) || 0;
  const allVMCount = (vms && vms.length) || 0;
  const vmCount = inactiveVMCount > 0 ? allVMCount - inactiveVMCount : allVMCount;
  const backfilledVms = fillMissingIds(vms);
  const uniqueIds = backfilledVms && [...new Set(backfilledVms.map(value => value.id))];
  return (
    backfilledVms &&
    backfilledVms.map((v, vIndex) => {
      v.allocated_size = numeral(v.allocated_size).format('0.00 ib');
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

export const getVmIds = editingPlan =>
  editingPlan &&
  editingPlan.options &&
  editingPlan.options.config_info &&
  editingPlan.options.config_info.actions &&
  editingPlan.options.config_info.actions.map(action => action.vm_id);
