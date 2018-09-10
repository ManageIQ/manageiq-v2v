import { connect } from 'react-redux';

import PlanWizardAdvancedOptionsStep from './PlanWizardAdvancedOptionsStep';
import * as PlanWizardAdvancedOptionsStepActions from './PlanWizardAdvancedOptionsStepActions';
import { getVMStepSelectedVms } from './PlanWizardAdvancedOptionsStepSelectors';
import reducer from './PlanWizardAdvancedOptionsStepReducer';

export const reducers = { planWizardAdvancedOptionsStep: reducer };

const mapStateToProps = (
  {
    planWizardAdvancedOptionsStep,
    planWizardVMStep,
    form: {
      planWizardGeneralStep: {
        values: { vm_choice_radio }
      },
      planWizardVMStep: {
        values: { selectedVms }
      },
      planWizardAdvancedOptionsStep: advancedOptionsStepForm
    }
  },
  ownProps
) => {
  const allVms =
    vm_choice_radio === 'vms_via_csv'
      ? [...planWizardVMStep.valid_vms, ...planWizardVMStep.invalid_vms, ...planWizardVMStep.conflict_vms]
      : [...planWizardVMStep.preselected_vms, ...planWizardVMStep.valid_vms];

  return {
    ...planWizardAdvancedOptionsStep,
    ...ownProps.data,
    advancedOptionsStepForm,
    vmStepSelectedVms: getVMStepSelectedVms(allVms, selectedVms)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps.data,
  ...dispatchProps
});

export default connect(
  mapStateToProps,
  PlanWizardAdvancedOptionsStepActions,
  mergeProps
)(PlanWizardAdvancedOptionsStep);
