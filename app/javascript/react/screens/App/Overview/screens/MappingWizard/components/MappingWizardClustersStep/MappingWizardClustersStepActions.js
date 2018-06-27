import URI from 'urijs';
import API from '../../../../../../../../common/API';
import { FETCH_V2V_SOURCE_CLUSTERS, FETCH_V2V_TARGET_CLUSTERS } from './MappingWizardClustersStepConstants';

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
