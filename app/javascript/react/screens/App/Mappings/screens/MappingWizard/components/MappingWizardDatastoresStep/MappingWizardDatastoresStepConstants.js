export const FETCH_V2V_SOURCE_DATASTORES = 'FETCH_V2V_SOURCE_DATASTORES';
export const FETCH_V2V_TARGET_DATASTORES = 'FETCH_V2V_TARGET_DATASTORES';

export const QUERY_ATTRIBUTES = {
  source: 'storages,ext_management_system.name,v_parent_datacenter',
  rhevm: 'storages,ext_management_system.name',
  openstack: 'cloud_volume_types,ext_management_system.name'
};

export const FETCH_STORAGE_URLS = {
  source: '/api/clusters',
  rhevm: '/api/clusters',
  openstack: '/api/cloud_tenants'
};

export const STORAGE_ATTRIBUTES = {
  openstack: 'cloud_volume_types',
  rhevm: 'storages'
};
