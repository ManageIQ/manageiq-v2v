import URI from 'urijs';
import API from '../../../../common/API';

import {
  DELETE_V2V_INFRASTRUCTURE_MAPPING,
  FETCH_V2V_CLOUD_NETWORKS,
  FETCH_V2V_CLOUD_TENANTS,
  FETCH_V2V_CLOUD_VOLUME_TYPES,
  FETCH_V2V_CLUSTERS,
  FETCH_V2V_DATASTORES,
  FETCH_V2V_NETWORKS,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  HIDE_V2V_DELETE_CONFIRMATION_MODAL,
  SET_V2V_MAPPING_TO_DELETE,
  SHOW_V2V_DELETE_CONFIRMATION_MODAL,
  YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL,
  FILTER_V2V_MAPPINGS_LIST_UNTIL_UNMOUNT
} from './MappingsConstants';

import { V2V_SHOW_MAPPING_WIZARD } from '../Mappings/screens/MappingWizard/MappingWizardConstants';

import { SET_V2V_EDITING_MAPPING } from '../Mappings/screens/MappingWizard/components/MappingWizardGeneralStep/MappingWizardGeneralStepConstants';

export { fetchTransformationPlansAction, fetchProvidersAction } from '../Overview/OverviewActions';

// ****************************************************************************
// DELETE_V2V_INFRASTRUCTURE_MAPPING
// ****************************************************************************
export const deleteInfrastructureMappingAction = mapping => dispatch =>
  dispatch({
    type: DELETE_V2V_INFRASTRUCTURE_MAPPING,
    payload: new Promise((resolve, reject) => {
      API.post(`/api/transformation_mappings/${mapping.id}`, {
        action: 'delete'
      })
        .then(response => {
          resolve(response);
        })
        .catch(e => reject(e));
    })
  });

// ****************************************************************************
// FETCH_V2V_CLOUD_NETWORKS
// ****************************************************************************
const _getCloudNetworksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CLOUD_NETWORKS,
    payload: API.get(url)
  });

export const fetchCloudNetworksAction = url => {
  const uri = new URI(url);
  return _getCloudNetworksActionCreator(uri.toString());
};

// ****************************************************************************
// FETCH_V2V_CLOUD_TENANTS
// ****************************************************************************
const _getCloudTenantsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CLOUD_TENANTS,
    payload: API.get(url)
  });

export const fetchCloudTenantsAction = url => {
  const uri = new URI(url);
  return _getCloudTenantsActionCreator(uri.toString());
};

// ****************************************************************************
// FETCH_V2V_CLOUD_VOLUME_TYPES
// ****************************************************************************
const _getCloudVolumeTypesActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CLOUD_VOLUME_TYPES,
    payload: API.get(url)
  });

export const fetchCloudVolumeTypesAction = url => {
  const uri = new URI(url);
  return _getCloudVolumeTypesActionCreator(uri.toString());
};

// ****************************************************************************
// FETCH_V2V_CLUSTERS
// ****************************************************************************

const _getClustersActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CLUSTERS,
    payload: API.get(url)
  });

export const fetchClustersAction = url => {
  const uri = new URI(url);
  return _getClustersActionCreator(uri.toString());
};

// ****************************************************************************
// FETCH_V2V_DATASTORES
// ****************************************************************************
const _getDatastoresActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_DATASTORES,
    payload: API.get(url)
  });

export const fetchDatastoresAction = url => {
  const uri = new URI(url);
  return _getDatastoresActionCreator(uri.toString());
};

// ****************************************************************************
// FETCH_V2V_NETWORKS
// ****************************************************************************
const _getNetworksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_NETWORKS,
    payload: API.get(url)
  });

export const fetchNetworksAction = url => {
  const uri = new URI(url);
  return _getNetworksActionCreator(uri.toString());
};

// ****************************************************************************
// FETCH_V2V_TRANSFORMATKON_MAPPINGS
// ****************************************************************************
const _getTransformationMappingsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TRANSFORMATION_MAPPINGS,
    payload: API.get(url)
  });

export const fetchTransformationMappingsAction = url => {
  const uri = new URI(url);
  return _getTransformationMappingsActionCreator(uri.toString());
};

// ****************************************************************************
// HIDE_V2V_DELETE_CONFIRMATION_MODAL
// ****************************************************************************
export const hideDeleteConfirmationModalAction = () => ({
  type: HIDE_V2V_DELETE_CONFIRMATION_MODAL,
  payload: false
});

// ****************************************************************************
// SET_V2V_MAPPING_TO_DELETE
// ****************************************************************************
export const setMappingToDeleteAction = mapping => ({
  type: SET_V2V_MAPPING_TO_DELETE,
  payload: mapping
});

// ****************************************************************************
// SHOW_V2V_DELETE_CONFIRMATION_MODAL
// ****************************************************************************
export const showDeleteConfirmationModalAction = () => ({
  type: SHOW_V2V_DELETE_CONFIRMATION_MODAL,
  payload: true
});

// ****************************************************************************
// SHOW_V2V_MAPPING_WIZARD
// ****************************************************************************
export const showMappingWizardAction = () => ({
  type: V2V_SHOW_MAPPING_WIZARD
});

// ****************************************************************************
// SHOW_V2V_MAPPING_WIZARD_EDIT_MODE
// ****************************************************************************
export const showMappingWizardEditModeAction = mapping => dispatch => {
  dispatch({
    type: V2V_SHOW_MAPPING_WIZARD
  });
  dispatch({
    type: SET_V2V_EDITING_MAPPING,
    payload: mapping
  });
};

// ****************************************************************************
// YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL
// ****************************************************************************
export const yesToDeleteInfrastructureMappingAction = () => ({
  type: YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL
});

// ****************************************************************************
// FILTER_V2V_MAPPINGS_LIST_UNTIL_UNMOUNT
// ****************************************************************************
export const filterMappingsListOnTransitionAction = payload => ({
  type: FILTER_V2V_MAPPINGS_LIST_UNTIL_UNMOUNT,
  payload
});
