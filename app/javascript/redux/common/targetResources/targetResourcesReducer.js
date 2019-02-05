import Immutable from 'seamless-immutable';

import { FETCH_V2V_TARGET_CLUSTERS } from './targetResourcesConstants';

export const initialState = Immutable({
  isFetchingTargetClusters: false,
  isRejectedTargetClusters: false,
  errorFetchingTargetClusters: null,
  targetClusters: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_TARGET_CLUSTERS}_PENDING`:
      return state.set('isFetchingTargetClusters', true).set('isRejectedTargetClusters', false);
    case `${FETCH_V2V_TARGET_CLUSTERS}_FULFILLED`:
      if (action.payload.data && action.payload.data.resources && action.payload.data.resources[0]) {
        return state
          .set('targetClusters', action.payload.data.resources)
          .set('isRejectedTargetClusters', false)
          .set('isFetchingTargetClusters', false);
      }
      return state
        .set('targetClusters', [])
        .set('isRejectedTargetClusters', false)
        .set('isFetchingTargetClusters', false);
    case `${FETCH_V2V_TARGET_CLUSTERS}_REJECTED`:
      return state
        .set('errorFetchingTargetClusters', action.payload)
        .set('isRejectedTargetClusters', true)
        .set('isFetchingTargetClusters', false);
    default:
      return state;
  }
};
