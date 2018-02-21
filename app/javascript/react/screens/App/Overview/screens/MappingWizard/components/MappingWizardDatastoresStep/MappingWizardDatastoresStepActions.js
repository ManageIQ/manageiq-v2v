import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_DATASTORES,
  FETCH_V2V_TARGET_DATASTORES,
  REMOVE_V2V_TARGET_DATASTORE,
  REMOVE_V2V_SOURCE_DATASTORES,
  ADD_V2V_TARGET_DATASTORE,
  ADD_V2V_SOURCE_DATASTORES
} from './MappingWizardDatastoresStepConstants';
import {
  requestSourceDatastoresData,
  requestTargetDatastoresData
} from './mappingWizardDatastoresStep.fixtures';

const _filterSourceDatastores = response => {
  const { data } = response;
  if (data.storages) {
    return {
      sourceDatastores: data.storages
    };
  }
  return {
    sourceDatastores: []
  };
};

const _getSourceDatastoresActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SOURCE_DATASTORES,
    payload: API.get(url)
  }).catch(error => {
    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${FETCH_V2V_SOURCE_DATASTORES}_FULFILLED`,
      payload: _filterSourceDatastores(requestSourceDatastoresData.response)
    });
  });

export const fetchSourceDatastoresAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=storages
  uri.addSearch({ attributes: 'storages' });

  return _getSourceDatastoresActionCreator(uri.toString());
};

const _filterTargetDatastores = response => {
  const { data } = response;
  if (data.storages) {
    return {
      targetDatastores: data.storages
    };
  }
  return {
    targetDatastores: []
  };
};

const _getTargetDatastoresActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TARGET_DATASTORES,
    payload: API.get(url)
  }).catch(error => {
    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${FETCH_V2V_TARGET_DATASTORES}_FULFILLED`,
      payload: _filterTargetDatastores(requestTargetDatastoresData.response)
    });
  });

export const fetchTargetDatastoresAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=storages
  uri.addSearch({ attributes: 'storages' });

  return _getTargetDatastoresActionCreator(uri.toString());
};

export const removeTargetDatastore = targetDatastoreToRemove => dispatch =>
  dispatch({
    type: REMOVE_V2V_TARGET_DATASTORE,
    targetDatastoreToRemove
  });

export const removeSourceDatastores = sourceDatastoresToRemove => dispatch =>
  dispatch({
    type: REMOVE_V2V_SOURCE_DATASTORES,
    sourceDatastoresToRemove
  });

export const addTargetDatastore = targetDatastoreToAdd => dispatch =>
  dispatch({
    type: ADD_V2V_TARGET_DATASTORE,
    targetDatastoreToAdd
  });

export const addSourceDatastores = sourceDatastoresToAdd => dispatch =>
  dispatch({
    type: ADD_V2V_SOURCE_DATASTORES,
    sourceDatastoresToAdd
  });
