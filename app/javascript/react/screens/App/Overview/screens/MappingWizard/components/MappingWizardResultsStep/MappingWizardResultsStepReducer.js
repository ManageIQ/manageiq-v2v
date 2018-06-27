import Immutable from 'seamless-immutable';

import { POST_V2V_TRANSFORM_MAPPINGS } from './MappingWizardResultsStepConstants';

const initialState = Immutable({
  isPostingMappings: true,
  isRejectedPostingMappings: false,
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
    default:
      return state;
  }
};
