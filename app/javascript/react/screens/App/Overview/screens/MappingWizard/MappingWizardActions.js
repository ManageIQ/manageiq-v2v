import { reset } from 'redux-form';
import { HIDE_MAPPING_WIZARD, MAPPING_WIZARD_EXITED } from '../../OverviewConstants';

import {
  V2V_SET_TRANSFORMATIONS_BODY,
  V2V_SHOW_WARNING_MODAL,
  V2V_HIDE_WARNING_MODAL,
  V2V_SHOW_ALERT,
  V2V_HIDE_ALERT
} from './MappingWizardConstants';

export const hideMappingWizardAction = shouldReloadMappings => dispatch => {
  dispatch({
    type: HIDE_MAPPING_WIZARD,
    payload: { shouldReloadMappings }
  });
};

export const mappingWizardExitedAction = () => dispatch => {
  dispatch({
    type: MAPPING_WIZARD_EXITED
  });

  // Dispatch reset for all the wizard step forms here
  dispatch(reset('mappingWizardGeneralStep'));
  dispatch(reset('mappingWizardClustersStep'));
  dispatch(reset('mappingWizardDatastoresStep'));
  dispatch(reset('mappingWizardNetworksStep'));
};

export const setTransformationsBodyAction = body => dispatch => {
  dispatch({
    type: V2V_SET_TRANSFORMATIONS_BODY,
    payload: body
  });
};

export const showWarningModalAction = sourceClustersWithoutMappings => dispatch => {
  dispatch({
    type: V2V_SHOW_WARNING_MODAL,
    payload: sourceClustersWithoutMappings
  });
};

export const hideWarningModalAction = () => dispatch => {
  dispatch({
    type: V2V_HIDE_WARNING_MODAL
  });
};

export const showAlertAction = (alertText, alertType = 'error') => dispatch => {
  dispatch({
    type: V2V_SHOW_ALERT,
    payload: { alertText, alertType }
  });
};

export const hideAlertAction = () => dispatch => {
  dispatch({
    type: V2V_HIDE_ALERT
  });
};
