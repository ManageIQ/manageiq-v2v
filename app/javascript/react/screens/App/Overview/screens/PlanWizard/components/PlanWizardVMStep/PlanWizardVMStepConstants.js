export const V2V_VALIDATE_VMS = 'V2V_VALIDATE_VMS';
export const V2V_VM_STEP_RESET = 'V2V_VM_STEP_RESET';
export const QUERY_V2V_PLAN_VMS = 'QUERY_V2V_PLAN_VMS';

export const V2V_VM_POST_VALIDATION_REASONS = {
  conflict: __('VM is in conflict'),
  empty_name: __('Empty name specified'),
  in_other_plan: __('VM exists in a different migration plan'),
  migrated: __('VM has already been migrated'),
  not_exist: __('VM does not exist'),
  ok: __('VM available for migration'),
  duplicate: __('Duplicate VM'),
  inactive: __('VM is inactive'),
  no_info_available: __('VM unavailable for migration, no information available')
};
