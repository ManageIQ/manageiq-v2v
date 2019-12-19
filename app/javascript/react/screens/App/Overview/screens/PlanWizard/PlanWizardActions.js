import { reset } from 'redux-form';
import { HIDE_PLAN_WIZARD, PLAN_WIZARD_EXITED, PLAN_WIZARD_NEXT, PLAN_WIZARD_BACK } from '../../OverviewConstants';
import {
  V2V_SET_PLANS_BODY,
  V2V_SET_PLAN_SCHEDULE,
  V2V_SET_PLAN_TYPE,
  V2V_PLAN_WIZARD_SHOW_ALERT,
  V2V_PLAN_WIZARD_HIDE_ALERT
} from './PlanWizardConstants';
import { RESET_V2V_ADVANCED_OPTIONS_STEP_VMS } from './components/PlanWizardAdvancedOptionsStep/PlanWizardAdvancedOptionsStepConstants';
import { V2V_VM_STEP_RESET } from './components/PlanWizardVMStep/PlanWizardVMStepConstants';
import { FETCH_TARGET_COMPUTE_URLS } from '../../../../../../redux/common/targetResources/targetResourcesConstants';
import { fetchTargetClustersAction } from '../../../../../../redux/common/targetResources/targetResourcesActions';
import { FETCH_CONVERSION_HOSTS_URL } from '../../../Settings/SettingsConstants';
import { fetchConversionHostsAction } from '../../../Settings/SettingsActions';

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
  dispatch(reset('planWizardInstancePropertiesStep'));
  dispatch({
    type: V2V_VM_STEP_RESET
  });
  dispatch(reset('planWizardScheduleStep'));
  dispatch(reset('planWizardAdvancedOptionsStep'));
  dispatch({
    type: RESET_V2V_ADVANCED_OPTIONS_STEP_VMS
  });
};

export const setMetadataWithNextButtonClickedAction = body => dispatch => {
  dispatch({
    type: PLAN_WIZARD_NEXT,
    payload: body
  });
};

export const setMetadataWithBackButtonClickedAction = body => dispatch => {
  dispatch({
    type: PLAN_WIZARD_BACK,
    payload: body
  });
};

export const setPlansBodyAction = body => dispatch => {
  dispatch({
    type: V2V_SET_PLANS_BODY,
    payload: body
  });
};

export const setPlanScheduleAction = body => dispatch => {
  dispatch({
    type: V2V_SET_PLAN_SCHEDULE,
    payload: body
  });
};

export const setPlanTypeAction = body => dispatch => {
  dispatch({
    type: V2V_SET_PLAN_TYPE,
    payload: body
  });
};

export const resetVmStepAction = () => dispatch => {
  dispatch({
    type: V2V_VM_STEP_RESET
  });
  dispatch(reset('planWizardVMStep'));
};

export const showAlertAction = (alertText, alertType = 'error') => dispatch => {
  dispatch({
    type: V2V_PLAN_WIZARD_SHOW_ALERT,
    payload: { alertText, alertType }
  });
};

export const hideAlertAction = () => dispatch => {
  dispatch({
    type: V2V_PLAN_WIZARD_HIDE_ALERT
  });
};

export const resetAdvancedOptionsStepAction = () => dispatch => {
  dispatch({
    type: RESET_V2V_ADVANCED_OPTIONS_STEP_VMS
  });
  dispatch(reset('planWizardAdvancedOptionsStep'));
};

export const fetchTargetValidationDataAction = targetProviderType => dispatch => {
  fetchTargetClustersAction(FETCH_TARGET_COMPUTE_URLS[targetProviderType])(dispatch);
  fetchConversionHostsAction(FETCH_CONVERSION_HOSTS_URL)(dispatch);
};
