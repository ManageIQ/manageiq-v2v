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

export const getVmsWithTargetClusterName = (vms, destinationTenantIdsBySourceClusterId, tenantsWithAttributesById) =>
  vms.map(vm => {
    const destinationTenantId = destinationTenantIdsBySourceClusterId[vm.ems_cluster_id];
    const tenant = destinationTenantId && tenantsWithAttributesById[destinationTenantId];
    return {
      ...vm,
      target_cluster_name: tenant ? tenant.name : ''
    };
  });

export const allFitForVM = (bestFitFlavors, tenantFlavors, vmId) => {
  const flavorsSlugPrefix = 'flavors/';
  const flavorForVM = bestFitFlavors.find(flavor => flavor.source_href_slug === `vms/${vmId}`);
  const allFitFlavors = flavorForVM && flavorForVM.all_fit;
  if (!allFitFlavors || allFitFlavors.length === 0) {
    return [tenantFlavors.reduce((prev, current) => (prev.root_disk_size > current.root_disk_size ? prev : current))];
  }
  const allFitFlavorIds = allFitFlavors.map(flavorSlug => flavorSlug.slice(flavorsSlugPrefix.length));
  return tenantFlavors.filter(flavor => allFitFlavorIds.indexOf(flavor.id) > -1);
};
