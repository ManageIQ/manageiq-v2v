import React from 'react';
import { Icon } from 'patternfly-react';

export const V2V_SET_PLANS_BODY = 'V2V_SET_PLANS_BODY';
export const V2V_SET_PLAN_SCHEDULE = 'V2V_SET_PLAN_SCHEDULE';
export const V2V_SET_PLAN_TYPE = 'V2V_SET_PLAN_TYPE';
export const V2V_PLAN_WIZARD_SHOW_ALERT = 'V2V_PLAN_WIZARD_SHOW_ALERT';
export const V2V_PLAN_WIZARD_HIDE_ALERT = 'V2V_PLAN_WIZARD_HIDE_ALERT';

export const SINGLETON_ALERT_ID = 'SINGLETON_ALERT';

export const stepIDs = {
  generalStep: 'planWizardGeneralStep',
  vmStep: 'planWizardVMStep',
  instancePropertiesStep: 'planWizardInstancePropertiesStep',
  advancedOptionsStep: 'planWizardAdvancedOptionsStep',
  scheduleStep: 'planWizardScheduleStep',
  resultsStep: 'planWizardResultsStep'
};

export const overwriteCsvConfirmModalProps = {
  title: __('Overwrite Import File'),
  body: (
    <React.Fragment>
      <p>{__('Importing a new VM list file will overwrite the contents of the existing list.')}</p>
      <p>{__('Are you sure you want to import a new file?')}</p>
    </React.Fragment>
  ),
  icon: <Icon className="confirm-warning-icon" type="pf" name="warning-triangle-o" />,
  confirmButtonLabel: __('Import'),
  dialogClassName: 'plan-wizard-confirm-modal',
  backdropClassName: 'plan-wizard-confirm-backdrop'
};
