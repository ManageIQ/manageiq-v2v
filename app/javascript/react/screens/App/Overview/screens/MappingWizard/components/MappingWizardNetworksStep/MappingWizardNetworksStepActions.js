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

const mockMode = true;

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

const _getSourceNetworksActionCreator = (url, id) => dispatch => {
  dispatch({
    type: FETCH_V2V_SOURCE_NETWORKS,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(_filterSourceNetworks(response));
        })
        .catch(e => {
          if (mockMode) {
            return dispatch({
              type: `${FETCH_V2V_SOURCE_NETWORKS}_FULFILLED`,
              payload: _filterSourceNetworks(
                requestSourceNetworksData(id).response
              )
            });
          }
          return reject(e);
        });
    })
  });
};

export const fetchSourceNetworksAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=lans
  uri.addSearch({ attributes: 'lans' });

  return _getSourceNetworksActionCreator(uri.toString(), id);
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

const _getTargetNetworksActionCreator = (url, id) => dispatch => {
  dispatch({
    type: FETCH_V2V_TARGET_NETWORKS,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(_filterTargetNetworks(response));
        })
        .catch(e => {
          if (mockMode) {
            return dispatch({
              type: `${FETCH_V2V_TARGET_NETWORKS}_FULFILLED`,
              payload: _filterTargetNetworks(
                requestTargetNetworksData(id).response
              )
            });
          }
          return reject(e);
        });
    })
  });
};

export const fetchTargetNetworksAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=lans
  uri.addSearch({ attributes: 'lans' });

  return _getTargetNetworksActionCreator(uri.toString(), id);
};
