import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_CLUSTERS,
  FETCH_V2V_TARGET_CLUSTERS,
  QUERY_V2V_PROVIDERS
} from './MappingWizardClustersStepConstants';

export { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

const _getSourceClustersActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SOURCE_CLUSTERS,
    payload: API.get(url)
  });

export const fetchSourceClustersAction = url => {
  const uri = new URI(url);
  return _getSourceClustersActionCreator(uri.toString());
};

const _getTargetClustersActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TARGET_CLUSTERS,
    payload: API.get(url)
  });

export const fetchTargetClustersAction = url => {
  const uri = new URI(url);
  return _getTargetClustersActionCreator(uri.toString());
};

// ****************************************************************************
// QUERY_V2V_PROVIDERS
// ****************************************************************************
const _queryProvidersActionCreator = (url, providerIds) => dispatch =>
  dispatch({
    type: QUERY_V2V_PROVIDERS,
    payload: API.post(url, {
      action: 'query',
      resources: providerIds.map(id => ({ id }))
    })
  });

export const queryProvidersAction = (url, providerIds) => {
  const uri = new URI(url);
  uri.addSearch({ attributes: 'authentications' });

  return _queryProvidersActionCreator(uri.toString(), providerIds);
};
