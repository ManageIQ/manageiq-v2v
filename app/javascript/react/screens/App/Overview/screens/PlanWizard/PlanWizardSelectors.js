import { getMappingType } from '../../../Mappings/components/InfrastructureMappingsList/helpers';

export const findEditingPlan = (transformationPlans, editingPlanId) =>
  editingPlanId && transformationPlans.find(plan => plan.id === editingPlanId);

export const planWizardOverviewFilter = overview => ({
  hidePlanWizard: overview.hidePlanWizard,
  transformationMappings: overview.transformationMappings,
  editingPlan: findEditingPlan(overview.transformationPlans, overview.editingPlanId)
});

export const planWizardFormFilter = form => ({
  planWizardGeneralStep: form.planWizardGeneralStep,
  planWizardVMStep: form.planWizardVMStep,
  planWizardInstancePropertiesStep: form.planWizardInstancePropertiesStep,
  planWizardAdvancedOptionsStep: form.planWizardAdvancedOptionsStep,
  planWizardScheduleStep: form.planWizardScheduleStep
});

export const getTargetProviderType = ({ form, overview: { transformationMappings } }) => {
  const mappingId = form.planWizardGeneralStep.values.infrastructure_mapping;
  const selectedMapping = transformationMappings.find(mapping => mapping.id === mappingId);
  return getMappingType(selectedMapping.transformation_mapping_items);
};

export const getWarmMigrationCompatibility = ({
  planWizardVMStep: { valid_vms, invalid_vms, conflict_vms },
  overview: { transformationMappings },
  form: {
    planWizardGeneralStep: { values: generalStepValues },
    planWizardVMStep: { values: vmStepValues }
  },
  targetProviderType
}) => {
  const vms = [...valid_vms, ...invalid_vms, ...conflict_vms].filter(vm => vmStepValues.selectedVms.includes(vm.id));
  const isEveryVmCompatible = vms.every(vm => vm.warm_migration_compatible);

  const selectedMapping = transformationMappings.find(map => map.id === generalStepValues.infrastructure_mapping);
  console.log('Selected mapping: ', selectedMapping);
  console.log('Target provider type', targetProviderType);

  // Determine the provider type of the selected mapping (take value from index that uses getTargetProviderType from above)
  // Load required resources on VM step as part of discovery? or in the background with a spinner on the schedule step? maybe as soon as a selection is made in the general step (prefetch!)
  // Figure out a list of the target clusters associated with the selected VMs
  // - Load all clusters of the type matching the selected mapping's target provider type (need to use targetResourcesReducer like ConversionHostWizardLocationStep does, use FETCH_TARGET_COMPUTE_URLS)
  // - For each mapping item of the corresponding destination_type (EmsCluster or CloudTenant) find the matching cluster by destination_id (use TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES)
  // For each cluster (.every()):
  // - Figure out the EMS id of each target cluster (use ems_id of the loaded cluster object)
  // - Find conversion hosts whose resource have that EMS id
  // - Check that there is at least one configured for VDDK

  const shouldEnableWarmMigration = isEveryVmCompatible; // TODO && ...
  return { isEveryVmCompatible, shouldEnableWarmMigration };
};
