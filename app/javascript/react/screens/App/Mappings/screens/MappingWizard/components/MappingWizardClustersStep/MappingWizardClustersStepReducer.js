import Immutable from 'seamless-immutable';

import { FETCH_V2V_SOURCE_CLUSTERS, QUERY_V2V_PROVIDERS } from './MappingWizardClustersStepConstants';
import { V2V_MAPPING_WIZARD_EXITED } from '../../../../screens/MappingWizard/MappingWizardConstants';

export const initialState = Immutable({
  sourceClusters: [],
  isFetchingSourceClusters: false,
  isRejectedSourceClusters: false,
  errorSourceClusters: null,
  targetClusters: [],
  isFetchingTargetClusters: false,
  isRejectedTargetClusters: false,
  errorTargetClusters: null,
  providers: [],
  isQueryingProviders: false,
  isRejectedQueryProviders: false,
  errorQueryProviders: null
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

    case `${QUERY_V2V_PROVIDERS}_PENDING`:
      return state.set('isQueryingProviders', true).set('isRejectedQueryProviders', false);
    case `${QUERY_V2V_PROVIDERS}_FULFILLED`:
      return state
        .set('providers', action.payload.data.results)
        .set('isQueryingProviders', false)
        .set('isRejectedQueryProviders', false)
        .set('errorQueryProviders', null);
    case `${QUERY_V2V_PROVIDERS}_REJECTED`:
      return state
        .set('errorQueryProviders', action.payload)
        .set('isRejectedQueryProviders', true)
        .set('isQueryingProviders', false);
    case V2V_MAPPING_WIZARD_EXITED:
      return initialState;
    default:
      return state;
  }
};
