import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_NETWORKS,
  FETCH_V2V_TARGET_NETWORKS
} from './MappingWizardNetworksStepConstants';
import {
  requestSourceNetworksData,
  requestTargetNetworksData
} from './mappingWizardNetworksStep.fixtures';

const _filterSourceNetworks = response => {
  const { data } = response;
  if (data.lans) {
    return {
      sourceNetworks: data.lans
    };
  }
  return {
    sourceNetworks: []
  };
};

const _getSourceNetworksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SOURCE_NETWORKS,
    payload: API.get(url)
  }).catch(error => {
    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${FETCH_V2V_SOURCE_NETWORKS}_FULFILLED`,
      payload: _filterSourceNetworks(requestSourceNetworksData.response)
    });
  });

export const fetchSourceNetworksAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=lans
  uri.addSearch({ attributes: 'lans' });

  return _getSourceNetworksActionCreator(uri.toString());
};

const _filterTargetNetworks = response => {
  const { data } = response;
  if (data.lans) {
    return {
      targetNetworks: data.lans
    };
  }
  return {
    targetNetworks: []
  };
};

const _getTargetNetworksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TARGET_NETWORKS,
    payload: API.get(url)
  }).catch(error => {
    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${FETCH_V2V_TARGET_NETWORKS}_FULFILLED`,
      payload: _filterTargetNetworks(requestTargetNetworksData.response)
    });
  });

export const fetchTargetNetworksAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=lans
  uri.addSearch({ attributes: 'lans' });

  return _getTargetNetworksActionCreator(uri.toString());
};
