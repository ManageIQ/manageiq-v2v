export const planWizardOverviewFilter = overview => ({
  hidePlanWizard: overview.hidePlanWizard,
  transformationMappings: overview.transformationMappings
});

export const planWizardFormFilter = form => ({
  planWizardGeneralStep: form.planWizardGeneralStep,
  planWizardVMStep: form.planWizardVMStep,
  planWizardInstancePropertiesStep: form.planWizardInstancePropertiesStep,
  planWizardAdvancedOptionsStep: form.planWizardAdvancedOptionsStep,
  planWizardScheduleStep: form.planWizardScheduleStep
});
