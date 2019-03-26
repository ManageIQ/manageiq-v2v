import { OPENSTACK, RHV } from '../../MappingWizardConstants';

export const FETCH_V2V_SOURCE_CLUSTERS = 'FETCH_V2V_SOURCE_CLUSTERS';
export const FETCH_V2V_TARGET_CLUSTERS = 'FETCH_V2V_TARGET_CLUSTERS';
export const QUERY_V2V_PROVIDERS = 'QUERY_V2V_PROVIDERS';

export const QUERY_PROVIDERS_URL = '/api/providers';

export const TARGET_WARNING_MESSAGES = {
  [RHV]: __('You must enable at least one conversion host in the cluster. You can continue to create an infrastructure mapping that includes the target cluster, but you must enable a conversion host before running the migration plan.'), // prettier-ignore
  [OPENSTACK]: __('You must enable an RSA key pair on the OpenStack provider. You can continue to create an infrastructure mapping without the key pair, but you must enable it before running the migration plan.') // prettier-ignore
};
