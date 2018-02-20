import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_SOURCE_DATASTORES,
  FETCH_V2V_TARGET_DATASTORES
} from './MappingWizardDatastoresStepConstants';

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
      return state.set('isFetchingSourceDatastores', true);
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
      return state.set('isFetchingTargetDatastores', true);
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
    default:
      return state;
  }
};
