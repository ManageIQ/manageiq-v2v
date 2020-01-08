import { connect } from 'react-redux';
import PlanWizardVMStep from './PlanWizardVMStep';
import * as PlanWizardVMStepActions from './PlanWizardVMStepActions';

import reducer from './PlanWizardVMStepReducer';
import { findEditingPlan, getTargetProviderType } from '../../PlanWizardSelectors';

export const reducers = { planWizardVMStep: reducer };

const mapStateToProps = ({ planWizardVMStep, form, overview }, ownProps) => {
  const editingPlan = findEditingPlan(overview.transformationPlans, overview.editingPlanId);
  const infrastructure_mapping_id = form.planWizardGeneralStep.values.infrastructure_mapping;
  const targetProviderType = getTargetProviderType({ form, overview });
  return {
    ...planWizardVMStep,
    ...ownProps.data,
    vm_choice_radio: form.planWizardGeneralStep.values.vm_choice_radio,
    infrastructure_mapping_id,
    editingPlan,
    shouldPrefillForEditing:
      editingPlan &&
      editingPlan.transformation_mapping &&
      editingPlan.transformation_mapping.id === infrastructure_mapping_id,
    formSelectedVms: form.planWizardVMStep && form.planWizardVMStep.values && form.planWizardVMStep.values.selectedVms,
    targetProviderType
  };
};

export default connect(
  mapStateToProps,
  PlanWizardVMStepActions
)(PlanWizardVMStep);
