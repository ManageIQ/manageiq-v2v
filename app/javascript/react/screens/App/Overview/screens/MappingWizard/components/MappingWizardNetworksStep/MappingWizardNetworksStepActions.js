import URI from 'urijs';
import API from '../../../../../../../../common/API';
import { FETCH_V2V_NETWORKS } from './MappingWizardNetworksStepConstants';
import { requestNetworksData } from './mappingWizardNetworksStep.fixtures';

const _filterNetworks = response => {
  const { data } = response;
  const sourceNetworks = [];
  const targetNetworks = [];
  if (data) {
    const { lans } = data;
    if (lans && lans.length) {
      for (const lan of lans) {
        const { name } = lan;
        // todo: check if we will have a lan_type
        if (name && name.includes('ovirt')) {
          targetNetworks.push(lan);
        } else {
          sourceNetworks.push(lan);
        }
      }
    }
  }
  return {
    sourceNetworks,
    targetNetworks
  };
};

const _getNetworksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_NETWORKS,
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_NETWORKS_PENDING, FETCH_V2V_NETWORKS_FULFILLED, FETCH_V2V_NETWORKS_REJECTED

    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${FETCH_V2V_NETWORKS}_FULFILLED`,
      payload: _filterNetworks(requestNetworksData.response)
    });
  });

export const fetchNetworksAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  // creates url like: http://localhost:3000/api/clusters/1?attributes=lans
  uri.addSearch({ attributes: 'lans' });

  return _getNetworksActionCreator(uri.toString());
};
