import { selectKeys } from 'patternfly-react';

export const planWizardOverviewFilter = overview =>
  selectKeys(overview, ['hidePlanWizard']);

export const planWizardFormFilter = form =>
  selectKeys(form, [
    'planWizardGeneralStep',
    'planWizardCSVStep',
    'planWizardResultsStep'
  ]);
