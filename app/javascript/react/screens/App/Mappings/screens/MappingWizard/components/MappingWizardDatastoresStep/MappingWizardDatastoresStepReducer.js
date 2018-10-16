import Immutable from 'seamless-immutable';

import { FETCH_V2V_SOURCE_DATASTORES, FETCH_V2V_TARGET_DATASTORES } from './MappingWizardDatastoresStepConstants';
import { V2V_MAPPING_WIZARD_EXITED } from '../../../../screens/MappingWizard/MappingWizardConstants';

const initialState = Immutable({
  isFetchingSourceDatastores: false,
  isRejectedSourceDatastores: false,
  errorSourceDatastores: null,
  isFetchingTargetDatastores: false,
  isRejectedTargetDatastores: false,
  errorTargetDatastores: null,
  sourceDatastores: [],
  targetDatastores: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_SOURCE_DATASTORES}_PENDING`:
      return state.set('isFetchingSourceDatastores', true).set('isRejectedSourceDatastores', false);
    case `${FETCH_V2V_SOURCE_DATASTORES}_FULFILLED`:
      return state
        .set('sourceDatastores', action.payload.sourceDatastores)
        .set('isRejectedSourceDatastores', false)
        .set('isFetchingSourceDatastores', false);
    case `${FETCH_V2V_SOURCE_DATASTORES}_REJECTED`:
      return state
        .set('errorSourceDatastores', action.payload)
        .set('isRejectedSourceDatastores', true)
        .set('isFetchingSourceDatastores', false);

    case `${FETCH_V2V_TARGET_DATASTORES}_PENDING`:
      return state.set('isFetchingTargetDatastores', true).set('isRejectedTargetDatastores', false);
    case `${FETCH_V2V_TARGET_DATASTORES}_FULFILLED`:
      return state
        .set('targetDatastores', action.payload.targetDatastores)
        .set('isRejectedTargetDatastores', false)
        .set('isFetchingTargetDatastores', false);
    case `${FETCH_V2V_TARGET_DATASTORES}_REJECTED`:
      return state
        .set('errorTargetDatastores', action.payload)
        .set('isRejectedTargetDatastores', true)
        .set('isFetchingTargetDatastores', false);

    case V2V_MAPPING_WIZARD_EXITED:
      return initialState;

    default:
      return state;
  }
};
