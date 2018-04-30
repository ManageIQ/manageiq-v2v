export const V2V_VALIDATE_VMS = 'V2V_VALIDATE_VMS';
export const V2V_VM_STEP_RESET = 'V2V_VM_STEP_RESET';

export const V2V_VM_POST_VALIDATION_REASONS = {
  conflict: __('VM is in conflict'),
  empty_name: __('Empty name specified'),
  in_other_plan: __('VM exists in a different migration plan'),
  migrated: __('VM has already been migrated'),
  not_exist: __('VM does not exist'),
  ok: __('VM available for migration')
};
