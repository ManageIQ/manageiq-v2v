export const FETCH_V2V_SOURCE_CLUSTERS = 'FETCH_V2V_SOURCE_CLUSTERS';
export const FETCH_V2V_TARGET_CLUSTERS = 'FETCH_V2V_TARGET_CLUSTERS';
export const QUERY_V2V_HOSTS = 'QUERY_V2V_HOSTS';

export const OPENSTACK_CONVERSION_HOST_TYPE = 'ManageIQ::Providers::Openstack::CloudManager::Vm';

export const FETCH_TARGET_COMPUTE_URLS = {
  rhevm:
    '/api/clusters?expand=resources' +
    '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,hosts' +
    '&filter[]=ext_management_system.emstype=rhevm',
  openstack: '/api/cloud_tenants?expand=resources&attributes=ext_management_system.name,ext_management_system.id'
};
