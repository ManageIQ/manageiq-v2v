import { selectKeys } from 'patternfly-react';

export const mappingWizardOverviewFilter = overview =>
  selectKeys(overview, ['hideMappingWizard']);

export const mappingWizardFormFilter = form =>
  selectKeys(form, [
    'mappingWizardGeneralStep',
    'mappingWizardClustersStep',
    'mappingWizardDatastoresStep',
    'mappingWizardNetworksStep',
    'mappingWizardResultsStep'
  ]);
