import { OSP_TENANT, EMS_CLUSTER } from '../../../../OverviewConstants';

export const getTenantsById = tenants =>
  tenants.reduce(
    (tenantsById, tenant) => ({
      ...tenantsById,
      [tenant.id]: { ...tenant }
    }),
    {}
  );

export const getDestinationTenantIdsBySourceClusterId = transformation_mapping_items => {
  const relevantMappings = transformation_mapping_items.filter(
    item => item.destination_type === OSP_TENANT && item.source_type === EMS_CLUSTER
  );
  return relevantMappings.reduce(
    (newObject, mapping) => ({
      ...newObject,
      [mapping.source_id]: mapping.destination_id
    }),
    {}
  );
};
