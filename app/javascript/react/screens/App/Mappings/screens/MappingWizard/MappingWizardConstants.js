import { OPENSTACK, RHV, V2V_TARGET_PROVIDERS } from '../../../../../../common/constants';

export const V2V_SET_TRANSFORMATIONS_BODY = 'V2V_SET_TRANSFORMATIONS_BODY';
export const V2V_SHOW_WARNING_MODAL = 'V2V_SHOW_WARNING_MODAL';
export const V2V_HIDE_WARNING_MODAL = 'V2V_HIDE_WARNING_MODAL';
export const V2V_SHOW_ALERT = 'V2V_SHOW_ALERT';
export const V2V_HIDE_ALERT = 'V2V_HIDE_ALERT';
export const V2V_MAPPING_WIZARD_EXITED = 'V2V_MAPPING_WIZARD_EXITED';
export const V2V_SHOW_MAPPING_WIZARD = 'V2V_SHOW_MAPPING_WIZARD';
export const V2V_HIDE_MAPPING_WIZARD = 'V2V_HIDE_MAPPING_WIZARD';
export { OPENSTACK, RHV, V2V_TARGET_PROVIDERS };

export const V2V_TARGET_PROVIDER_STORAGE_KEYS = {
  [RHV]: 'storages',
  [OPENSTACK]: 'cloud_volume_types'
};

export const V2V_TARGET_PROVIDER_NETWORK_KEYS = { [RHV]: 'lans', [OPENSTACK]: 'cloud_networks' };

export const TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES = {
  cluster: 'EmsCluster',
  datastore: 'Storage',
  network: 'Lan'
};

export const TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES = {
  [OPENSTACK]: {
    cluster: 'CloudTenant',
    datastore: 'CloudVolumeType',
    network: 'CloudNetwork'
  },
  [RHV]: {
    cluster: 'EmsCluster',
    datastore: 'Storage',
    network: 'Lan'
  }
};
