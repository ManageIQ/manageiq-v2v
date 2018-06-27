import { connect } from 'react-redux';
import PlanWizardVMStep from './PlanWizardVMStep';
import * as PlanWizardVMStepActions from './PlanWizardVMStepActions';

import reducer from './PlanWizardVMStepReducer';

export const reducers = { planWizardVMStep: reducer };

const mapStateToProps = ({ planWizardVMStep, form }, ownProps) => ({
  ...planWizardVMStep,
  ...ownProps.data,
  vm_choice_radio: form.planWizardGeneralStep.values.vm_choice_radio,
  infrastructure_mapping_id: form.planWizardGeneralStep.values.infrastructure_mapping
});

export default connect(mapStateToProps, PlanWizardVMStepActions)(PlanWizardVMStep);
