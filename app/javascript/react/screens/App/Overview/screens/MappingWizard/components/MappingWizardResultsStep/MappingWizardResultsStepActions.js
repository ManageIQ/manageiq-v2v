import API from '../../../../../../../../common/API';
import { POST_V2V_TRANSFORM_MAPPINGS } from './MappingWizardResultsStepConstants';
import {
  HIDE_MAPPING_WIZARD,
  SHOW_PLAN_WIZARD
} from '../../../../OverviewConstants';
import { requestTransformationMappingsData } from './mappingWizardResultsStep.fixtures';

export const continueToPlanAction = id => dispatch => {
  dispatch({
    type: HIDE_MAPPING_WIZARD
  });
  dispatch({
    type: SHOW_PLAN_WIZARD,
    payload: { id }
  });
};

const _postTransformMappingsActionCreator = (
  url,
  transformMappings
) => dispatch =>
  dispatch({
    type: POST_V2V_TRANSFORM_MAPPINGS,
    payload: API.post(url, transformMappings)
  }).catch(error => {
    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${POST_V2V_TRANSFORM_MAPPINGS}_FULFILLED`,
      payload: requestTransformationMappingsData.response
    });
  });

export const postTransformMappingsAction = (url, transformMappings) =>
  _postTransformMappingsActionCreator(url, transformMappings);
