import { RHV } from '../../MappingWizardConstants';

export const FETCH_V2V_SOURCE_CLUSTERS = 'FETCH_V2V_SOURCE_CLUSTERS';
export const FETCH_V2V_TARGET_CLUSTERS = 'FETCH_V2V_TARGET_CLUSTERS';

export const CONVERSION_HOST_WARNING_MESSAGES = {
  [RHV]: __('You must enable at least one conversion host in the cluster. You can continue to create an infrastructure mapping that includes the target cluster, but you must enable a conversion host before running the migration plan.') // prettier-ignore
};
