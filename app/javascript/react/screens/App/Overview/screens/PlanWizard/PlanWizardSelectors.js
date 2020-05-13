import { getMappingType } from '../../../Mappings/components/InfrastructureMappingsList/helpers';
import { TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES, RHV, OPENSTACK } from '../../../../../../common/constants';

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

const getSelectedMapping = ({
  overview: { transformationMappings },
  form: {
    planWizardGeneralStep: {
      values: { infrastructure_mapping: selectedMappingId }
    }
  }
}) => transformationMappings.find(map => map.id === selectedMappingId);

export const getTargetProviderType = ({ overview, form, selectedMapping = getSelectedMapping({ overview, form }) }) =>
  getMappingType(selectedMapping.transformation_mapping_items);

const getSelectedVms = ({
  planWizardVMStep: { valid_vms, invalid_vms, conflict_vms },
  form: {
    planWizardVMStep: { values: vmStepValues }
  }
}) => [...valid_vms, ...invalid_vms, ...conflict_vms].filter(vm => vmStepValues.selectedVms.includes(vm.id));

const getTargetClustersInPlan = ({
  form,
  overview,
  planWizardVMStep,
  targetResources: { targetClusters },
  selectedMapping = getSelectedMapping({ overview, form }),
  targetProviderType = getTargetProviderType({ overview, form, selectedMapping }),
  vms = getSelectedVms({ planWizardVMStep, form })
}) => {
  const targetClusterType = TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES[targetProviderType].cluster;
  const vmSourceClusterIds = vms.map(vm => vm.ems_cluster_id);
  return selectedMapping.transformation_mapping_items
    .filter(mappingItem => mappingItem.destination_type === targetClusterType) // Only include clusters of the target type
    .filter(mappingItem => vmSourceClusterIds.includes(mappingItem.source_id)) // Only include clusters targeted by the selected VMs
    .map(mappingItem => targetClusters.find(cluster => cluster.id === mappingItem.destination_id));
};

const getAvailableConversionHostsForCluster = ({ settings: { conversionHosts }, targetProviderType, targetCluster }) =>
  conversionHosts.filter(({ resource }) => {
    // For RHV, we need a conversion host in each target cluster, but for OSP we only need one in each target EMS.
    if (targetProviderType === RHV) return resource.ems_cluster_id === targetCluster.id;
    if (targetProviderType === OPENSTACK) return resource.ems_id === targetCluster.ems_id;
    return false;
  });

export const getWarmMigrationCompatibility = ({
  planWizardVMStep,
  form,
  overview,
  targetResources,
  settings,
  selectedMapping = getSelectedMapping({ overview, form }),
  targetProviderType = getTargetProviderType({ overview, form, selectedMapping })
}) => {
  if (targetResources.isFetchingTargetClusters || settings.isFetchingConversionHosts) {
    return { isFetchingTargetValidationData: true, shouldEnableWarmMigration: false };
  }

  const vms = getSelectedVms({ planWizardVMStep, form });
  const targetClustersInPlan = getTargetClustersInPlan({
    form,
    overview,
    planWizardVMStep,
    targetResources,
    selectedMapping,
    targetProviderType,
    vms
  });

  const isEveryVmCompatible = vms.every(vm => vm.warm_migration_compatible);
  const areConversionHostsConfigured = targetClustersInPlan.every(targetCluster =>
    getAvailableConversionHostsForCluster({ settings, targetProviderType, targetCluster }).some(
      conversionHost => conversionHost.vddk_transport_supported
    )
  );
  const shouldEnableWarmMigration = isEveryVmCompatible && areConversionHostsConfigured;

  return {
    isFetchingTargetValidationData: false,
    isEveryVmCompatible,
    areConversionHostsConfigured,
    shouldEnableWarmMigration
  };
};
