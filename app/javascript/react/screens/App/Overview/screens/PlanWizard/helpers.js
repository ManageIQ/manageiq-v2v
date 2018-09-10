export const createMigrationPlans = (
  planWizardGeneralStep,
  planWizardVMStep,
  planWizardAdvancedOptionsStep,
  isEditing = false
) => {
  const planName = planWizardGeneralStep.values.name;
  const planDescription = planWizardGeneralStep.values.description;
  const infrastructureMapping = planWizardGeneralStep.values.infrastructure_mapping;
  const vms = planWizardVMStep.values.selectedVms;

  const {
    playbookVms: { preMigration, postMigration },
    preMigrationPlaybook,
    postMigrationPlaybook
  } = planWizardAdvancedOptionsStep.values;

  const actions = vms.map(vmId => ({
    vm_id: vmId,
    pre_service: preMigration.includes(vmId),
    post_service: postMigration.includes(vmId)
  }));

  return {
    name: planName,
    description: planDescription,
    prov_type: isEditing ? 'transformation_plan' : 'generic_transformation_plan',
    config_info: {
      transformation_mapping_id: infrastructureMapping,
      pre_service_id: preMigrationPlaybook,
      post_service_id: postMigrationPlaybook,
      actions
    }
  };
};
