export const mappingWizardOverviewFilter = overview => ({
  hideMappingWizard: overview.hideMappingWizard,
  warningModalVisible: overview.warningModalVisible
});

export const mappingWizardFormFilter = form => ({
  forms: {
    mappingWizardGeneralStep: form.mappingWizardGeneralStep,
    mappingWizardClustersStep: form.mappingWizardClustersStep,
    mappingWizardDatastoresStep: form.mappingWizardDatastoresStep,
    mappingWizardNetworksStep: form.mappingWizardNetworksStep
  }
});
