import { reset } from 'redux-form';
import { HIDE_PLAN_WIZARD, PLAN_WIZARD_EXITED } from '../../OverviewConstants';
import { V2V_SET_PLANS_BODY } from './PlanWizardConstants';
import { V2V_VM_STEP_RESET } from './components/PlanWizardVMStep/PlanWizardVMStepConstants';

export const hidePlanWizardAction = () => dispatch => {
  dispatch({
    type: HIDE_PLAN_WIZARD
  });
};

export const planWizardExitedAction = () => dispatch => {
  dispatch({
    type: PLAN_WIZARD_EXITED
  });
  // Dispatch reset for all the wizard step forms here
  dispatch(reset('planWizardGeneralStep'));
  dispatch(reset('planWizardVMStep'));
};

export const setPlansBodyAction = body => dispatch => {
  dispatch({
    type: V2V_SET_PLANS_BODY,
    payload: body
  });
};

export const resetVmStepAction = () => dispatch => {
  dispatch({
    type: V2V_VM_STEP_RESET
  });
  dispatch(reset('planWizardVMStep'));
};
