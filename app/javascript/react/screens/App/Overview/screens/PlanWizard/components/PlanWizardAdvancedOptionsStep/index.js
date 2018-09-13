import { connect } from 'react-redux';

import PlanWizardAdvancedOptionsStep from './PlanWizardAdvancedOptionsStep';
import * as PlanWizardAdvancedOptionsStepActions from './PlanWizardAdvancedOptionsStepActions';
import { getVMStepSelectedVms, getVmIdsWithProperty } from './helpers';
import reducer from './PlanWizardAdvancedOptionsStepReducer';
import { findEditingPlan } from '../../PlanWizardSelectors';

export const reducers = { planWizardAdvancedOptionsStep: reducer };

const mapStateToProps = (
  {
    planWizardAdvancedOptionsStep,
    planWizardVMStep,
    overview: { transformationPlans, editingPlanId },
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
  const editingPlan = findEditingPlan(transformationPlans, editingPlanId);
  const validVmsDeduped = !editingPlan
    ? planWizardVMStep.valid_vms
    : planWizardVMStep.valid_vms.filter(
        validVm => !planWizardVMStep.preselected_vms.some(preselectedVm => preselectedVm.id === validVm.id)
      );
  const allVms =
    vm_choice_radio === 'vms_via_csv'
      ? [...planWizardVMStep.valid_vms, ...planWizardVMStep.invalid_vms, ...planWizardVMStep.conflict_vms]
      : [...planWizardVMStep.preselected_vms, ...validVmsDeduped];

  const configInfo = editingPlan && editingPlan.options && editingPlan.options.config_info;

  return {
    ...planWizardAdvancedOptionsStep,
    ...ownProps.data,
    advancedOptionsStepForm,
    vmStepSelectedVms: getVMStepSelectedVms(allVms, selectedVms),
    initialValues: {
      playbookVms: {
        preMigration: editingPlan ? getVmIdsWithProperty(editingPlan, 'pre_service') : [],
        postMigration: editingPlan ? getVmIdsWithProperty(editingPlan, 'post_service') : []
      },
      preMigrationPlaybook: editingPlan ? configInfo.pre_service_id : '',
      postMigrationPlaybook: editingPlan ? configInfo.post_service_id : ''
    },
    enableReinitialize: true, // Tells redux-form to use new initialValues when they change
    keepDirtyOnReinitialize: true,
    editingPlan
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
