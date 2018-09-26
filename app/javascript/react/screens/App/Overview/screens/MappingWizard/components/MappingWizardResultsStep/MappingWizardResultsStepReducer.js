import Immutable from 'seamless-immutable';

import { POST_V2V_TRANSFORM_MAPPINGS, UPDATE_V2V_TRANSFORMATION_MAPPING } from './MappingWizardResultsStepConstants';

const initialState = Immutable({
  isUpdatingMapping: false,
  isPostingMappings: false,
  isRejectedUpdatingMapping: false,
  isRejectedPostingMappings: false,
  errorUpdatingMapping: null,
  errorPostingMappings: null,
  transformationMappingsResult: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${POST_V2V_TRANSFORM_MAPPINGS}_PENDING`:
      return state.set('isPostingMappings', true);
    case `${POST_V2V_TRANSFORM_MAPPINGS}_FULFILLED`:
      return state
        .set(
          'transformationMappingsResult',
          action.payload.data && action.payload.data.results && action.payload.data.results[0]
        )
        .set('isRejectedPostingMappings', false)
        .set('isPostingMappings', false);
    case `${POST_V2V_TRANSFORM_MAPPINGS}_REJECTED`:
      return state
        .set('errorPostingMappings', action.payload)
        .set('isRejectedPostingMappings', true)
        .set('isPostingMappings', false);

    case `${UPDATE_V2V_TRANSFORMATION_MAPPING}_PENDING`:
      return state.set('isUpdatingMapping', true).set('isRejectedUpdatingMapping', false);
    case `${UPDATE_V2V_TRANSFORMATION_MAPPING}_FULFILLED`:
      return state
        .set('transformationMappingsResult', action.payload.data)
        .set('isUpdatingMapping', false)
        .set('errorUpdatingMapping', null);
    case `${UPDATE_V2V_TRANSFORMATION_MAPPING}_REJECTED`:
      return state
        .set('errorUpdatingMapping', action.payload)
        .set('isRejectedUpdatingMapping', true)
        .set('isUpdatingMapping', false);

    default:
      return state;
  }
};
