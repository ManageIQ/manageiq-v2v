export const FETCH_V2V_SOURCE_NETWORKS = 'FETCH_V2V_SOURCE_NETWORKS';
export const FETCH_V2V_TARGET_NETWORKS = 'FETCH_V2V_TARGET_NETWORKS';

export const QUERY_ATTRIBUTES = {
  source: 'lans,ext_management_system.name,v_parent_datacenter',
  rhevm: 'lans,ext_management_system.name',
  openstack: 'cloud_networks,ext_management_system.name'
};
