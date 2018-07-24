import URI from 'urijs';
import API from '../../../../../../../../common/API';

import {
  FETCH_V2V_PLAYBOOKS,
  SET_V2V_ADVANCED_OPTIONS_STEP_VMS,
  RESET_V2V_ADVANCED_OPTIONS_STEP_VMS
} from './PlanWizardAdvancedOptionsStepConstants';

export const _getPlaybooksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_PLAYBOOKS,
    payload: API.get(url)
  });

export const fetchPlaybooksAction = url => {
  const uri = new URI(url);
  return _getPlaybooksActionCreator(uri.toString());
};

export const setVmsAction = vms => ({
  type: SET_V2V_ADVANCED_OPTIONS_STEP_VMS,
  payload: vms
});

export const resetVmsAction = () => ({
  type: RESET_V2V_ADVANCED_OPTIONS_STEP_VMS
});
