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
        values: { vm_choice_radio, infrastructure_mapping }
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
  const shouldPrefillForEditing =
    editingPlan &&
    editingPlan.transformation_mapping &&
    editingPlan.transformation_mapping.id === infrastructure_mapping;
  const allVms = [...planWizardVMStep.valid_vms, ...planWizardVMStep.invalid_vms, ...planWizardVMStep.conflict_vms];

  const configInfo = editingPlan && editingPlan.options && editingPlan.options.config_info;
  const vmStepSelectedVms = getVMStepSelectedVms(allVms, selectedVms);

  return {
    ...planWizardAdvancedOptionsStep,
    ...ownProps.data,
    advancedOptionsStepForm,
    vmStepSelectedVms,
    initialValues: {
      playbookVms: {
        preMigration: shouldPrefillForEditing
          ? getVmIdsWithProperty(editingPlan, 'pre_service', vmStepSelectedVms)
          : [],
        postMigration: shouldPrefillForEditing
          ? getVmIdsWithProperty(editingPlan, 'post_service', vmStepSelectedVms)
          : []
      },
      preMigrationPlaybook: shouldPrefillForEditing ? configInfo.pre_service_id : '',
      postMigrationPlaybook: shouldPrefillForEditing ? configInfo.post_service_id : ''
    },
    enableReinitialize: true, // Tells redux-form to use new initialValues when they change
    keepDirtyOnReinitialize: true,
    editingPlan,
    shouldPrefillForEditing
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
