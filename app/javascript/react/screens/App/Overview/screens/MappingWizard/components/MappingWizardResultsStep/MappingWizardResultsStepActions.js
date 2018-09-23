import URI from 'urijs';

import API from '../../../../../../../../common/API';
import { POST_V2V_TRANSFORM_MAPPINGS, UPDATE_V2V_TRANSFORMATION_MAPPING } from './MappingWizardResultsStepConstants';
import { CONTINUE_TO_PLAN } from '../../../../OverviewConstants';

export const continueToPlanAction = id => dispatch => {
  dispatch({
    type: CONTINUE_TO_PLAN,
    payload: { id }
  });
};

// ****************************************************************************
// POST_V2V_TRANSFORM_MAPPINGS
// ****************************************************************************
const _postTransformMappingsActionCreator = (url, transformMappings) => dispatch =>
  dispatch({
    type: POST_V2V_TRANSFORM_MAPPINGS,
    payload: new Promise((resolve, reject) => {
      API.post(url, transformMappings)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    })
  });

export const postTransformMappingsAction = (url, transformMappings) =>
  _postTransformMappingsActionCreator(url, transformMappings);

// ****************************************************************************
// UPDATE_V2V_TRANSFORMATION_MAPPING
// ****************************************************************************
const _updateTransformationMappingActionCreator = (url, transformationMappingBody) => dispatch =>
  dispatch({
    type: UPDATE_V2V_TRANSFORMATION_MAPPING,
    payload: new Promise((resolve, reject) => {
      const postBody = {
        action: 'edit',
        name: transformationMappingBody.name,
        description: transformationMappingBody.description,
        transformation_mapping_items: transformationMappingBody.transformation_mapping_items
      };
      API.post(url, postBody)
        .then(response => resolve(response))
        .catch(e => reject(e));
    })
  });

export const updateTransformationMappingAction = (url, id, transformationMappingBody) => {
  const uri = new URI(`${url}/${id}`);
  return _updateTransformationMappingActionCreator(uri.toString(), transformationMappingBody);
};
