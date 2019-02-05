export const FETCH_V2V_PROVIDERS = 'FETCH_V2V_PROVIDERS';

export const FETCH_V2V_PROVIDERS_URL = '/api/providers?expand=resources&attributes=authentications';

export const PROVIDERS = {
  source: ['ManageIQ::Providers::Vmware::InfraManager'],
  target: ['ManageIQ::Providers::Redhat::InfraManager', 'ManageIQ::Providers::Openstack::CloudManager']
};
