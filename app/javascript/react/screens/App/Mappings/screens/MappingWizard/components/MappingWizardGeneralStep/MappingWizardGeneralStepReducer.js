import Immutable from 'seamless-immutable';

import { SET_V2V_EDITING_MAPPING, FETCH_V2V_CONVERSION_HOSTS } from './MappingWizardGeneralStepConstants';
import { V2V_MAPPING_WIZARD_EXITED } from '../../../../screens/MappingWizard/MappingWizardConstants';

export const initialState = Immutable({
  editingMapping: null,
  conversionHosts: [],
  isFetchingConversionHosts: false,
  isRejectedConversionHosts: false,
  errorFetchingConversionHosts: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_V2V_EDITING_MAPPING:
      return state.set('editingMapping', action.payload);

    case `${FETCH_V2V_CONVERSION_HOSTS}_PENDING`:
      return state
        .set('isFetchingConversionHosts', true)
        .set('isRejectedConversionHosts', false)
        .set('errorFetchingConversionHosts', null);
    case `${FETCH_V2V_CONVERSION_HOSTS}_FULFILLED`:
      return state
        .set('conversionHosts', action.payload.data.resources)
        .set('isFetchingConversionHosts', false)
        .set('isRejectedConversionHosts', false)
        .set('errorFetchingConversionHosts', null);
    case `${FETCH_V2V_CONVERSION_HOSTS}_REJECTED`:
      return state
        .set('isFetchingConversionHosts', false)
        .set('isRejectedConversionHosts', true)
        .set('errorFetchingConversionHosts', action.payload);

    case V2V_MAPPING_WIZARD_EXITED:
      return initialState;

    default:
      return state;
  }
};
