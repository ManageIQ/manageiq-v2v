import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_SOURCE_CLUSTERS,
  FETCH_V2V_TARGET_CLUSTERS,
  QUERY_V2V_HOSTS
} from './MappingWizardClustersStepConstants';
import { MAPPING_WIZARD_EXITED } from '../../../../OverviewConstants';
import { getHostsByClusterID } from './helpers';

const initialState = Immutable({
  sourceClusters: [],
  isFetchingSourceClusters: false,
  isRejectedSourceClusters: false,
  errorSourceClusters: null,
  targetClusters: [],
  isFetchingTargetClusters: false,
  isRejectedTargetClusters: false,
  errorTargetClusters: null,
  hostsByClusterID: {},
  isFetchingHostsQuery: false,
  isRejectedHostsQuery: false,
  errorHostsQuery: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_SOURCE_CLUSTERS}_PENDING`:
      return state.set('isFetchingSourceClusters', true).set('isRejectedSourceClusters', false);
    case `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`:
      if (action.payload.data && action.payload.data.resources && action.payload.data.resources[0]) {
        return state
          .set('sourceClusters', action.payload.data.resources)
          .set('isRejectedSourceClusters', false)
          .set('isFetchingSourceClusters', false);
      }
      return state
        .set('sourceClusters', [])
        .set('isFetchingSourceClusters', false)
        .set('isRejectedSourceClusters', false);
    case `${FETCH_V2V_SOURCE_CLUSTERS}_REJECTED`:
      return state
        .set('errorSourceClusters', action.payload)
        .set('isRejectedSourceClusters', true)
        .set('isFetchingSourceClusters', false);
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
        .set('errorTargetClusters', action.payload)
        .set('isRejectedTargetClusters', true)
        .set('isFetchingTargetClusters', false);
    case `${QUERY_V2V_HOSTS}_PENDING`:
      return state.set('isFetchingHostsQuery', true).set('isRejectedHostsQuery', false);
    case `${QUERY_V2V_HOSTS}_FULFILLED`:
      return state
        .set('hostsByClusterID', getHostsByClusterID(action))
        .set('isFetchingHostsQuery', false)
        .set('isRejectedHostsQuery', false);
    case `${QUERY_V2V_HOSTS}_REJECTED`:
      return state
        .set('errorHostsQuery', action.payload)
        .set('isFetchingHostsQuery', false)
        .set('isRejectedHostsQuery', true);
    case MAPPING_WIZARD_EXITED:
      return Immutable.merge(state, initialState);
    default:
      return state;
  }
};
