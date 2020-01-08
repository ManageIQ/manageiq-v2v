import { destroy } from 'redux-form';

import {
  V2V_SET_TRANSFORMATIONS_BODY,
  V2V_SHOW_WARNING_MODAL,
  V2V_HIDE_WARNING_MODAL,
  V2V_SHOW_ALERT,
  V2V_HIDE_ALERT,
  V2V_MAPPING_WIZARD_EXITED,
  V2V_HIDE_MAPPING_WIZARD
} from './MappingWizardConstants';

export const hideMappingWizardAction = () => dispatch => {
  dispatch({
    type: V2V_HIDE_MAPPING_WIZARD
  });
};

export const mappingWizardExitedAction = () => dispatch => {
  dispatch({
    type: V2V_MAPPING_WIZARD_EXITED
  });

  // Dispatch reset for all the wizard step forms here
  dispatch(
    destroy(
      'mappingWizardGeneralStep',
      'mappingWizardClustersStep',
      'mappingWizardDatastoresStep',
      'mappingWizardNetworksStep'
    )
  );
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

// NOTE: we may want to remove these show/hide actions and instead make the ones from PlanWizard reusable, which support multiple alerts
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
