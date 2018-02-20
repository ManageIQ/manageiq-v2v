import URI from 'urijs';
import API from '../../../../../../../../common/API';
import { FETCH_V2V_DATASTORES } from './MappingWizardDatastoresStepConstants';
import { requestDatastoresData } from './mappingWizardDatastoresStep.fixtures';

const _filterDatastores = response => {
  const { data } = response;
  const sourceDatastores = [];
  const targetDatastores = [];
  if (data) {
    const { storages } = data;
    if (storages && storages.length) {
      for (const store of storages) {
        const { store_type } = store;
        if (store_type && store_type.includes('NFS')) {
          targetDatastores.push(store);
        } else if (store_type && store_type.includes('VMFS')) {
          sourceDatastores.push(store);
        }
      }
    }
  }
  return {
    sourceDatastores,
    targetDatastores
  };
};

const _getDatastoreActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_DATASTORES,
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_DATASTORES_PENDING, FETCH_V2V_DATASTORES_FULFILLED, FETCH_V2V_DATASTORES_REJECTED

    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${FETCH_V2V_DATASTORES}_FULFILLED`,
      payload: _filterDatastores(requestDatastoresData.response)
    });
  });

export const fetchDatastoresAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=storages
  uri.addSearch({ attributes: 'storages' });

  return _getDatastoreActionCreator(uri.toString());
};
