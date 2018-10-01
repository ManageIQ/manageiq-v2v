export const POST_V2V_TRANSFORM_MAPPINGS = 'POST_V2V_TRANSFORM_MAPPINGS';
export const UPDATE_V2V_TRANSFORMATION_MAPPING = 'UPDATE_V2V_TRANSFORMATION_MAPPING';

export const SOURCE_HREF_SLUGS = {
  EmsCluster: '/api/clusters/',
  Storage: '/api/data_stores/',
  Lan: '/api/lans/'
};

export const DESTINATION_HREF_SLUGS = {
  openstack: {
    CloudTenant: '/api/cloud_tenants/',
    CloudVolumeType: '/api/cloud_volume_types/',
    CloudNetwork: '/api/cloud_networks/'
  },
  rhevm: {
    EmsCluster: '/api/clusters/',
    Storage: '/api/data_stores/',
    Lan: '/api/lans/'
  }
};
