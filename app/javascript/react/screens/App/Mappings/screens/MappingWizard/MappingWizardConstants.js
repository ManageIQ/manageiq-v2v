export const V2V_SET_TRANSFORMATIONS_BODY = 'V2V_SET_TRANSFORMATIONS_BODY';
export const V2V_SHOW_WARNING_MODAL = 'V2V_SHOW_WARNING_MODAL';
export const V2V_HIDE_WARNING_MODAL = 'V2V_HIDE_WARNING_MODAL';
export const V2V_SHOW_ALERT = 'V2V_SHOW_ALERT';
export const V2V_HIDE_ALERT = 'V2V_HIDE_ALERT';
export const V2V_MAPPING_WIZARD_EXITED = 'V2V_MAPPING_WIZARD_EXITED';
export const V2V_SHOW_MAPPING_WIZARD = 'V2V_SHOW_MAPPING_WIZARD';
export const V2V_HIDE_MAPPING_WIZARD = 'V2V_HIDE_MAPPING_WIZARD';

export const OPENSTACK = 'openstack';
export const RHV = 'rhevm';

export const V2V_TARGET_PROVIDERS = [
  { name: __('Red Hat Virtualization'), id: RHV },
  { name: __('Red Hat OpenStack Platform'), id: OPENSTACK }
];

export const V2V_TARGET_PROVIDER_STORAGE_KEYS = {
  rhevm: 'storages',
  openstack: 'cloud_volume_types'
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
    datastore: 'CloudVolumeType',
    network: 'CloudNetwork'
  },
  rhevm: {
    cluster: 'EmsCluster',
    datastore: 'Storage',
    network: 'Lan'
  }
};
