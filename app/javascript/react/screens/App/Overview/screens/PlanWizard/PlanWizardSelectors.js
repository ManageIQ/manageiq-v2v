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
