export const FETCH_V2V_SOURCE_NETWORKS = 'FETCH_V2V_SOURCE_NETWORKS';
export const FETCH_V2V_TARGET_NETWORKS = 'FETCH_V2V_TARGET_NETWORKS';
export const FETCH_V2V_PUBLIC_CLOUD_NETWORKS = 'FETCH_V2V_PUBLIC_CLOUD_NETWORKS';

export const QUERY_ATTRIBUTES = {
  source: 'lans,ext_management_system.name,v_parent_datacenter',
  rhevm: 'lans,ext_management_system.name',
  openstack: 'cloud_networks,ext_management_system.name'
};

export const FETCH_NETWORK_URLS = {
  source: 'api/clusters',
  rhevm: 'api/clusters',
  openstack: 'api/cloud_tenants',
  public: '/api/providers'
};

export const NETWORK_ATTRIBUTES = {
  openstack: 'cloud_networks',
  rhevm: 'lans'
};

export const HAS_CLOUD_NETWORKS = {
  openstack: true,
  rhevm: false
};
