import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_SOURCE_CLUSTERS_PENDING,
  FETCH_V2V_SOURCE_CLUSTERS_FULFILLED,
  FETCH_V2V_SOURCE_CLUSTERS_REJECTED
} from '../../consts';

const initialState = Immutable({
  sourceClusters: [],
  isFetching: false,
  isRejected: false,
  error: null
});

export default function sourceClusterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_V2V_SOURCE_CLUSTERS_PENDING:
      return state.set('isFetching', true);
    case FETCH_V2V_SOURCE_CLUSTERS_FULFILLED:
      return state
        .set('sourceClusters', action.payload.sourceClusters)
        .set('isFetching', false);
    case FETCH_V2V_SOURCE_CLUSTERS_REJECTED:
      return state
        .set('error', action.payload)
        .set('isRejected', true)
        .set('isFetching', false);
    default:
      return state;
  }
}
