import Immutable from 'seamless-immutable';

import { FETCH_V2V_DATASTORES } from './MappingWizardDatastoresStepConstants';

const initialState = Immutable({
  isFetchingDatastores: false,
  isRejectedDatastores: false,
  errorDatastores: null,
  sourceDatastores: [],
  targetDatastores: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_DATASTORES}_PENDING`:
      return state.set('isFetchingDatastores', true);
    case `${FETCH_V2V_DATASTORES}_FULFILLED`:
      return state
        .set('sourceDatastores', action.payload.sourceDatastores)
        .set('targetDatastores', action.payload.targetDatastores)
        .set('isRejectedDatastores', false)
        .set('isFetchingDatastores', false);
    case `${FETCH_V2V_DATASTORES}_REJECTED`:
      return state
        .set('errorDatastores', action.payload)
        .set('isRejectedDatastores', true)
        .set('isFetchingDatastores', false);
    default:
      return state;
  }
};
