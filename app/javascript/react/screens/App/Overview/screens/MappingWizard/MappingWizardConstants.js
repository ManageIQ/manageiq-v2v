export const V2V_SET_TRANSFORMATIONS_BODY = 'V2V_SET_TRANSFORMATIONS_BODY';
export const V2V_SHOW_WARNING_MODAL = 'V2V_SHOW_WARNING_MODAL';
export const V2V_HIDE_WARNING_MODAL = 'V2V_HIDE_WARNING_MODAL';
export const V2V_SHOW_ALERT = 'V2V_SHOW_ALERT';
export const V2V_HIDE_ALERT = 'V2V_HIDE_ALERT';

export const V2V_TARGET_PROVIDERS = [
  { name: __('Red Hat Virtualization'), id: 'rhevm' },
  { name: __('Red Hat OpenStack Platform'), id: 'openstack' }
];

export const V2V_TARGET_PROVIDER_STORAGE_KEYS = {
  rhevm: 'storages',
  openstack: 'ext_management_system.cloud_volume_types'
};

export const V2V_TARGET_PROVIDER_NETWORK_KEYS = { rhevm: 'lans', openstack: 'cloud_networks' };

export const TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES = {
  cluster: 'EmsCluster',
  datastore: 'Storage',
  network: 'Lan'
};

export const TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES = {
  openstack: {
    cluster: 'CloudTenant',
    datastore: 'CloudVolume',
    network: 'CloudNetwork'
  },
  rhevm: {
    cluster: 'EmsCluster',
    datastore: 'Storage',
    network: 'Lan'
  }
};
