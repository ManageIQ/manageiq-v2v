import { RHV, OPENSTACK } from '../../../common/constants';

export const FETCH_V2V_TARGET_CLUSTERS = 'FETCH_V2V_TARGET_CLUSTERS';

export const FETCH_TARGET_COMPUTE_URLS = {
  [RHV]:
    '/api/clusters?expand=resources' +
    '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,hosts' +
    '&filter[]=ext_management_system.emstype=rhevm',
  [OPENSTACK]:
    '/api/cloud_tenants?expand=resources&filter[]=ext_management_system.type=ManageIQ::Providers::Openstack::CloudManager&attributes=ext_management_system.name,ext_management_system.id,vms'
};
