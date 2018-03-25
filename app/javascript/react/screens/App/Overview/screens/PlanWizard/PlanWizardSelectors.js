export const planWizardOverviewFilter = overview => ({
  hidePlanWizard: overview.hidePlanWizard
});

export const planWizardFormFilter = form => ({
  forms: {
    planWizardGeneralStep: form.planWizardGeneralStep,
    planWizardCSVStep: form.planWizardCSVStep
  }
});
