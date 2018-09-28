import URI from 'urijs';
import API from '../../../../../../../../common/API';
import objectNavigator from '../../../../../common/objectNavigator';
import {
  FETCH_V2V_SOURCE_DATASTORES,
  FETCH_V2V_TARGET_DATASTORES,
  QUERY_ATTRIBUTES
} from './MappingWizardDatastoresStepConstants';
import { V2V_TARGET_PROVIDER_STORAGE_KEYS } from '../../MappingWizardConstants';

const _filterSourceDatastores = response => {
  const { data } = response;
  if (data.storages) {
    const sourceDatastores = data.storages.map(storage => ({
      ...storage,
      providerName: data.ext_management_system.name,
      datacenterName: data.v_parent_datacenter
    }));
    return {
      sourceDatastores
    };
  }
  return {
    sourceDatastores: []
  };
};

const _getSourceDatastoresActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SOURCE_DATASTORES,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(_filterSourceDatastores(response));
        })
        .catch(e => {
          reject(e);
        });
    })
  });

export const fetchSourceDatastoresAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=storages
  uri.addSearch({ attributes: QUERY_ATTRIBUTES.source });

  return _getSourceDatastoresActionCreator(uri.toString());
};

const _filterTargetDatastores = (response, targetProvider) => {
  const { data } = response;

  if (objectNavigator(V2V_TARGET_PROVIDER_STORAGE_KEYS[targetProvider], data)) {
    const targetDatastores = objectNavigator(V2V_TARGET_PROVIDER_STORAGE_KEYS[targetProvider], data).map(storage => ({
      ...storage,
      providerName: data.ext_management_system.name
    }));
    return {
      targetDatastores
    };
  }
  return {
    targetDatastores: []
  };
};

const _getTargetDatastoresActionCreator = (url, targetProvider) => dispatch =>
  dispatch({
    type: FETCH_V2V_TARGET_DATASTORES,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(_filterTargetDatastores(response, targetProvider));
        })
        .catch(e => reject(e));
    })
  });

export const fetchTargetDatastoresAction = (url, id, targetProvider) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=storages
  uri.addSearch({ attributes: QUERY_ATTRIBUTES[targetProvider] });

  return _getTargetDatastoresActionCreator(uri.toString(), targetProvider);
};
