import { map, trim } from 'lodash';

export const createMigrationPlans = (
  planWizardGeneralStep,
  planWizardCSVStep
) => {
  const planName = planWizardGeneralStep.values.name;
  const planDescription = planWizardGeneralStep.values.description;
  const infrastructureMapping =
    planWizardGeneralStep.values.infrastructure_mapping;
  const vms = map(planWizardCSVStep.values.csvRows, 'reference').map(trim);

  return {
    name: planName,
    description: planDescription,
    service_type: 'atomic',
    prov_type: 'generic',
    type: 'ServiceTemplateTransformationPlan',
    display: false,
    options: {
      config_info: {
        transformation_mapping_id: infrastructureMapping,
        vms
      }
    }
  };
};
