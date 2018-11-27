import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_CLUSTERS,
  FETCH_V2V_TARGET_CLUSTERS,
  QUERY_V2V_HOSTS,
  FETCH_V2V_CONVERSION_HOSTS,
  CLEAR_V2V_CONVERSION_HOSTS
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

const _getQueryHostsActionCreator = (url, hostIDsByClusterID) => dispatch => {
  const hostIDs = Object.values(hostIDsByClusterID).reduce(
    (allHostIDs, someHostIDs) => [...allHostIDs, ...someHostIDs],
    []
  );
  return dispatch({
    type: QUERY_V2V_HOSTS,
    payload: API.post(url, {
      action: 'query',
      resources: hostIDs.map(id => ({ id }))
    }),
    meta: { hostIDsByClusterID }
  });
};

export const queryHostsAction = (url, hostIDsByClusterID) => {
  const uri = new URI(url);
  return _getQueryHostsActionCreator(uri.toString(), hostIDsByClusterID);
};

const _getConversionHostsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CONVERSION_HOSTS,
    payload: API.get(url)
  });

export const fetchConversionHostsAction = url => {
  const uri = new URI(url);
  return _getConversionHostsActionCreator(uri.toString());
};

export const clearConversionHostsAction = () => dispatch => dispatch({ type: CLEAR_V2V_CONVERSION_HOSTS });
