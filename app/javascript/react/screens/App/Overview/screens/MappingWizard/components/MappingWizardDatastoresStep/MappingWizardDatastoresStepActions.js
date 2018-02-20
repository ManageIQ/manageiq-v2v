import URI from 'urijs';
import API from '../../../../../../../../common/API';
import {
  FETCH_V2V_SOURCE_DATASTORES,
  FETCH_V2V_TARGET_DATASTORES
} from './MappingWizardDatastoresStepConstants';
import { requestDatastoresData } from './mappingWizardDatastoresStep.fixtures';

const _filterSourceDatastores = response => {
  const { data } = response;
  const sourceDatastores = [];
  // do we still need to filter these? probably not...but just leaving for now
  if (data) {
    const { storages } = data;
    if (storages && storages.length) {
      for (const store of storages) {
        const { store_type } = store;
        if (store_type && store_type.includes('VMFS')) {
          sourceDatastores.push(store);
        }
      }
    }
  }
  return {
    sourceDatastores
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
      payload: _filterSourceDatastores(requestDatastoresData.response)
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
  const targetDatastores = [];
  // do we still need to filter these? probably not...but just leaving for now
  if (data) {
    const { storages } = data;
    if (storages && storages.length) {
      for (const store of storages) {
        const { store_type } = store;
        if (store_type && store_type.includes('NFS')) {
          targetDatastores.push(store);
        }
      }
    }
  }
  return {
    targetDatastores
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
      payload: _filterTargetDatastores(requestDatastoresData.response)
    });
  });

export const fetchTargetDatastoresAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=storages
  uri.addSearch({ attributes: 'storages' });

  return _getTargetDatastoresActionCreator(uri.toString());
};
