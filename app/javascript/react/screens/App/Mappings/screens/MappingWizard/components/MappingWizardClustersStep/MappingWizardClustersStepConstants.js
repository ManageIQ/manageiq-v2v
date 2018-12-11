import { OPENSTACK, RHV } from '../../MappingWizardConstants';

export const FETCH_V2V_SOURCE_CLUSTERS = 'FETCH_V2V_SOURCE_CLUSTERS';
export const FETCH_V2V_TARGET_CLUSTERS = 'FETCH_V2V_TARGET_CLUSTERS';
export const QUERY_V2V_HOSTS = 'QUERY_V2V_HOSTS';
export const QUERY_V2V_PROVIDERS = 'QUERY_V2V_PROVIDERS';

export const OPENSTACK_CONVERSION_HOST_TYPE = 'ManageIQ::Providers::Openstack::CloudManager::Vm';

export const FETCH_TARGET_COMPUTE_URLS = {
  rhevm:
    '/api/clusters?expand=resources' +
    '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,hosts' +
    '&filter[]=ext_management_system.emstype=rhevm',
  openstack: '/api/cloud_tenants?expand=resources&attributes=ext_management_system.name,ext_management_system.id'
};

export const QUERY_PROVIDERS_URL = '/api/providers';

export const TARGET_WARNING_MESSAGES = {
  [RHV]: __('You must enable at least one conversion host in the cluster. You can continue to create an infrastructure mapping that includes the target cluster, but you must enable a conversion host before running the migration plan.'), // prettier-ignore
  [OPENSTACK]: __('You must enable an RSA key pair on the OpenStack provider. You can continue to create an infrastructure mapping without the key pair, but you must enable it before running the migration plan.') // prettier-ignore
};
