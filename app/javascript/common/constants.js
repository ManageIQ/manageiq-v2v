export const MAX_LENGTH_NAMES = 24;
export const MAX_LENGTH_DESCRIPTIONS = 128;

const maxLengthIs = __('Maximum length is %s characters.');
const requiredMaxLengthIs = __('Required. Maximum length is %s characters.');
const youHaveReachedMax = __('You have reached the maximum length of %s characters.');

export const validation = {
  name: {
    help: sprintf(maxLengthIs, MAX_LENGTH_NAMES),
    requiredMessage: sprintf(requiredMaxLengthIs, MAX_LENGTH_NAMES),
    maxLength: MAX_LENGTH_NAMES,
    maxLengthWarning: sprintf(youHaveReachedMax, MAX_LENGTH_NAMES)
  },
  description: {
    help: sprintf(maxLengthIs, MAX_LENGTH_DESCRIPTIONS),
    maxLength: MAX_LENGTH_DESCRIPTIONS,
    maxLengthWarning: sprintf(youHaveReachedMax, MAX_LENGTH_DESCRIPTIONS)
  }
};

export const OPENSTACK = 'openstack';
export const RHV = 'rhevm';

export const V2V_TARGET_PROVIDERS = [
  {
    name: __('Red Hat Virtualization'),
    id: RHV,
    type: 'ManageIQ::Providers::Redhat::InfraManager'
  },
  {
    name: __('Red Hat OpenStack Platform'),
    id: OPENSTACK,
    type: 'ManageIQ::Providers::Openstack::CloudManager'
  }
];

export const FETCH_TARGET_COMPUTE_URLS = {
  [RHV]:
    '/api/clusters?expand=resources' +
    '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,hosts' +
    '&filter[]=ext_management_system.emstype=rhevm',
  [OPENSTACK]: '/api/cloud_tenants?expand=resources&attributes=ext_management_system.name,ext_management_system.id'
};
