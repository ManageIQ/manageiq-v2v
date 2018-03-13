export const createMigrationPlans = (
  planWizardGeneralStep,
  planWizardCSVStep
) => {
  const planName = planWizardGeneralStep.values.name;
  const planDescription = planWizardGeneralStep.values.description;
  const infrastructureMapping =
    planWizardGeneralStep.values.infrastructure_mapping;
  const vms = planWizardCSVStep.values.csvRows.map(value =>
    value.reference.trim()
  );

  return {
    name: planName,
    description: planDescription,
    prov_type: 'generic_transformation_plan',
    config_info: {
      transformation_mapping_id: infrastructureMapping,
      vm_ids: vms
    }
  };
};
