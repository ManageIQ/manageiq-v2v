import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_SOURCE_DATASTORES,
  FETCH_V2V_TARGET_DATASTORES,
  REMOVE_V2V_TARGET_DATASTORE,
  REMOVE_V2V_SOURCE_DATASTORES,
  ADD_V2V_TARGET_DATASTORE,
  ADD_V2V_SOURCE_DATASTORES
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
    case REMOVE_V2V_TARGET_DATASTORE: {
      return state.set(
        'targetDatastores',
        state.targetDatastores.filter(
          targetDatastore =>
            targetDatastore.id !== action.targetDatastoreToRemove.id
        )
      );
    }
    case REMOVE_V2V_SOURCE_DATASTORES:
      return state.set(
        'sourceDatastores',
        state.sourceDatastores.filter(
          sourceDatastore =>
            !action.sourceDatastoresToRemove.some(
              datastoreToRemove => datastoreToRemove.id === sourceDatastore.id
            )
        )
      );
    case ADD_V2V_TARGET_DATASTORE:
      return state.set('targetDatastores', [
        ...state.targetDatastores,
        action.targetDatastoreToAdd
      ]);
    case ADD_V2V_SOURCE_DATASTORES:
      return state.set('sourceDatastores', [
        ...state.sourceDatastores,
        ...action.sourceDatastoresToAdd
      ]);
    default:
      return state;
  }
};
