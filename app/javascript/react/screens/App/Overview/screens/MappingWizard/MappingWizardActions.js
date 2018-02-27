import { reset } from 'redux-form';
import {
  HIDE_MAPPING_WIZARD,
  MAPPING_WIZARD_EXITED
} from '../../OverviewConstants';

import { V2V_SET_TRANSFORMATIONS_BODY } from './MappingWizardConstants';

export const hideMappingWizardAction = () => dispatch => {
  dispatch({
    type: HIDE_MAPPING_WIZARD
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
