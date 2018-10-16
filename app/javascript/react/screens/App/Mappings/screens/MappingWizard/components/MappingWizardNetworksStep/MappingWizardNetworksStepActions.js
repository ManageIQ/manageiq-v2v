import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_NETWORKS,
  FETCH_V2V_TARGET_NETWORKS,
  QUERY_ATTRIBUTES
} from './MappingWizardNetworksStepConstants';
import { V2V_TARGET_PROVIDER_NETWORK_KEYS } from '../../MappingWizardConstants';

const _filterSourceNetworks = response => {
  const { data } = response;
  if (data.lans) {
    const sourceNetworks = data.lans.map(lan => ({
      ...lan,
      providerName: data.ext_management_system.name,
      clusterId: data.id
    }));
    return {
      sourceNetworks
    };
  }
  return {
    sourceNetworks: []
  };
};

const _getSourceNetworksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SOURCE_NETWORKS,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(_filterSourceNetworks(response));
        })
        .catch(e => {
          reject(e);
        });
    })
  });

export const fetchSourceNetworksAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=lans
  uri.addSearch({ attributes: QUERY_ATTRIBUTES.source });

  return _getSourceNetworksActionCreator(uri.toString());
};

const _filterTargetNetworks = (response, targetProvider) => {
  const { data } = response;
  if (data[V2V_TARGET_PROVIDER_NETWORK_KEYS[targetProvider]]) {
    const targetNetworks = data[V2V_TARGET_PROVIDER_NETWORK_KEYS[targetProvider]].map(network => ({
      ...network,
      providerName: data.ext_management_system.name,
      clusterId: data.id
    }));

    return {
      targetNetworks
    };
  }
  return {
    targetNetworks: []
  };
};

const _getTargetNetworksActionCreator = (url, targetProvider) => dispatch =>
  dispatch({
    type: FETCH_V2V_TARGET_NETWORKS,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(_filterTargetNetworks(response, targetProvider));
        })
        .catch(e => {
          reject(e);
        });
    })
  });

export const fetchTargetNetworksAction = (url, id, targetProvider) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=lans
  uri.addSearch({ attributes: QUERY_ATTRIBUTES[targetProvider] });

  return _getTargetNetworksActionCreator(uri.toString(), targetProvider);
};
