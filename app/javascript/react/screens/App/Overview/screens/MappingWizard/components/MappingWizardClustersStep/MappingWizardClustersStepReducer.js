import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_SOURCE_CLUSTERS,
  FETCH_V2V_TARGET_CLUSTERS,
  REMOVE_TARGET_CLUSTER,
  REMOVE_SOURCE_CLUSTERS,
  ADD_TARGET_CLUSTER,
  ADD_SOURCE_CLUSTERS
} from './MappingWizardClustersStepConstants';

const initialState = Immutable({
  sourceClusters: [],
  isFetchingSourceClusters: false,
  isRejectedSourceClusters: false,
  errorSourceClusters: null,
  targetClusters: [],
  isFetchingTargetClusters: false,
  isRejectedTargetClusters: false,
  errorTargetClusters: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_SOURCE_CLUSTERS}_PENDING`:
      return state.set('isFetchingSourceClusters', true);
    case `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`:
      if (
        action.payload.data &&
        action.payload.data.resources &&
        action.payload.data.resources[0]
      ) {
        return state
          .set('sourceClusters', action.payload.data.resources[0].ems_clusters)
          .set('isFetchingSourceClusters', false);
      }
      return state
        .set('sourceClusters', [])
        .set('isFetchingSourceClusters', false);

    case `${FETCH_V2V_SOURCE_CLUSTERS}_REJECTED`:
      return state
        .set('errorSourceClusters', action.payload)
        .set('isRejectedSourceClusters', true)
        .set('isFetchingSourceClusters', false);
    case `${FETCH_V2V_TARGET_CLUSTERS}_PENDING`:
      return state.set('isFetchingTargetClusters', true);
    case `${FETCH_V2V_TARGET_CLUSTERS}_FULFILLED`:
      if (
        action.payload.data &&
        action.payload.data.resources &&
        action.payload.data.resources[0]
      ) {
        return state
          .set('targetClusters', action.payload.data.resources[0].ems_clusters)
          .set('isFetchingTargetClusters', false);
      }
      return state
        .set('targetClusters', [])
        .set('isFetchingTargetClusters', false);
    case `${FETCH_V2V_TARGET_CLUSTERS}_REJECTED`:
      return state
        .set('errorTargetClusters', action.payload)
        .set('isRejectedTargetClusters', true)
        .set('isFetchingTargetClusters', false);
    case REMOVE_TARGET_CLUSTER: {
      return state.set(
        'targetClusters',
        state.targetClusters.filter(
          targetCluster => targetCluster.id !== action.targetClusterToRemove.id
        )
      );
    }
    case REMOVE_SOURCE_CLUSTERS:
      return state.set(
        'sourceClusters',
        state.sourceClusters.filter(
          sourceCluster =>
            !action.sourceClustersToRemove.some(
              clusterToRemove => clusterToRemove.id === sourceCluster.id
            )
        )
      );
    case ADD_TARGET_CLUSTER:
      return state.set('targetClusters', [
        ...state.targetClusters,
        action.targetClusterToAdd
      ]);
    case ADD_SOURCE_CLUSTERS:
      return state.set('sourceClusters', [
        ...state.sourceClusters,
        ...action.sourceClustersToAdd
      ]);
    default:
      return state;
  }
};
