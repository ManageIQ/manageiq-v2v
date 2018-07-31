import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_DATASTORES,
  FETCH_V2V_TARGET_DATASTORES,
  QUERY_ATTRIBUTES
} from './MappingWizardDatastoresStepConstants';

const _filterSourceDatastores = response => {
  const { data } = response;
  if (data.storages) {
    const sourceDatastores = data.storages.map(storage => ({
      ...storage,
      providerName: data.ext_management_system.name
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

const _filterTargetDatastores = response => {
  const { data } = response;
  if (data.storages) {
    const targetDatastores = data.storages.map(storage => ({
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

const _getTargetDatastoresActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TARGET_DATASTORES,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(_filterTargetDatastores(response));
        })
        .catch(e => reject(e));
    })
  });

export const fetchTargetDatastoresAction = (url, id, targetProvider) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=storages
  uri.addSearch({ attributes: QUERY_ATTRIBUTES[targetProvider] });

  return _getTargetDatastoresActionCreator(uri.toString());
};
