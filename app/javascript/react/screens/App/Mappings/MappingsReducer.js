import Immutable from 'seamless-immutable';

import { validateClusters, validateDatastores, validateNetworks, validateMappings } from './MappingsValidators';

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
  OPEN_V2V_MAPPING_WIZARD_ON_MOUNT,
  SET_V2V_MAPPING_TO_DELETE,
  SHOW_V2V_DELETE_CONFIRMATION_MODAL,
  YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL
} from './MappingsConstants';

import {
  V2V_SHOW_MAPPING_WIZARD,
  V2V_HIDE_MAPPING_WIZARD,
  V2V_MAPPING_WIZARD_EXITED
} from '../Overview/screens/MappingWizard/MappingWizardConstants';

import { CONTINUE_TO_PLAN } from '../Overview/OverviewConstants';
import { addAssociatedPlansCount } from './helpers';

export const initialState = Immutable({
  cloudNetworks: [],
  cloudTenants: [],
  cloudVolumeTypes: [],
  clusters: [],
  datastores: [],
  deleteInfrastructureMappingResponse: null,
  errorCloudNetworks: null,
  errorCloudTenants: null,
  errorCloudVolumeTypes: null,
  errorClusters: null,
  errorDatastores: null,
  errorDeleteInfrastructureMapping: null,
  errorNetworks: null,
  errorTransformationMappings: null,
  hideMappingWizard: true,
  isDeletingInfrastructureMapping: false,
  isFetchingCloudNetworks: false,
  isFetchingCloudTenants: false,
  isFetchingCloudVolumeTypes: false,
  isFetchingClusters: false,
  isFetchingDatastores: false,
  isFetchingNetworks: false,
  isFetchingTransformationMappings: false,
  isRejectedCloudNetworks: false,
  isRejectedCloudTenants: false,
  isRejectedCloudVolumeTypes: false,
  isRejectedClusters: false,
  isRejectedDatastores: false,
  isRejectedInfrastructureMapping: false,
  isRejectedNetworks: false,
  isRejectedTransformationMappings: false,
  mappingToDelete: null,
  mappingWizardVisible: false,
  networks: [],
  openMappingWizardOnMount: false,
  showDeleteConfirmationModal: false,
  transformationMappings: [],
  yesToDeleteInfrastructureMapping: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTINUE_TO_PLAN:
      return state.set('hideMappingWizard', true);
    case `${DELETE_V2V_INFRASTRUCTURE_MAPPING}_PENDING`:
      return state
        .set('yesToDeleteInfrastructureMapping', false)
        .set('isDeletingInfrastructureMapping', action.payload);
    case `${DELETE_V2V_INFRASTRUCTURE_MAPPING}_FULFILLED`:
      return state
        .set('deleteInfrastructureMappingResponse', action.payload.data)
        .set('isDeletingInfrastructureMapping', null)
        .set('isRejectedInfrastructureMapping', false)
        .set('errorDeleteInfrastructureMapping', null);
    case `${DELETE_V2V_INFRASTRUCTURE_MAPPING}_REJECTED`:
      return state
        .set('errorDeleteInfrastructureMapping', action.payload)
        .set('isRejectedInfrastructureMapping', true)
        .set('isDeletingInfrastructureMapping', null);

    case `${FETCH_V2V_CLOUD_NETWORKS}_PENDING`:
      return state.set('isFetchingCloudNetworks', true).set('isRejectedCloudNetworks', false);
    case `${FETCH_V2V_CLOUD_NETWORKS}_FULFILLED`:
      return state
        .set('cloudNetworks', action.payload.data.resources)
        .set('isFetchingCloudNetworks', false)
        .set('isRejectedCloudNetworks', false)
        .set('errorCloudNetworks', null);
    case `${FETCH_V2V_CLOUD_NETWORKS}_REJECTED`:
      return state
        .set('errorCloudNetworks', action.payload)
        .set('isRejectedCloudNetworks', true)
        .set('isFetchingCloudNetworks', false);

    case `${FETCH_V2V_CLOUD_TENANTS}_PENDING`:
      return state.set('isFetchingCloudTenants', true).set('isRejectedCloudTenants', false);
    case `${FETCH_V2V_CLOUD_TENANTS}_FULFILLED`:
      return state
        .set('cloudTenants', action.payload.data.resources)
        .set('isFetchingCloudTenants', false)
        .set('isRejectedCloudTenants', false)
        .set('errorCloudTenants', null);
    case `${FETCH_V2V_CLOUD_TENANTS}_REJECTED`:
      return state
        .set('errorCloudTenants', action.payload)
        .set('isRejectedCloudTenants', true)
        .set('isFetchingCloudTenants', false);

    case `${FETCH_V2V_CLOUD_VOLUME_TYPES}_PENDING`:
      return state.set('isFetchingCloudVolumeTypes', true).set('isRejectedCloudVolumeTypes', false);
    case `${FETCH_V2V_CLOUD_VOLUME_TYPES}_FULFILLED`:
      return state
        .set('cloudVolumeTypes', action.payload.data.resources)
        .set('isFetchingCloudVolumeTypes', false)
        .set('isRejectedCloudVolumeTypes', false)
        .set('errorCloudVolumeTypes', null);
    case `${FETCH_V2V_CLOUD_VOLUME_TYPES}_REJECTED`:
      return state
        .set('errorCloudVolumeTypes', action.payload)
        .set('isRejectedCloudVolumeTypes', true)
        .set('isFetchingCloudVolumeTypes', false);

    case `${FETCH_V2V_CLUSTERS}_PENDING`:
      return state.set('isFetchingClusters', true).set('isRejectedClusters', false);
    case `${FETCH_V2V_CLUSTERS}_FULFILLED`:
      validateClusters(action.payload.data.resources);
      return state
        .set('clusters', action.payload.data.resources)
        .set('isFetchingClusters', false)
        .set('isRejectedClusters', false)
        .set('errorClusters', null);
    case `${FETCH_V2V_CLUSTERS}_REJECTED`:
      return state
        .set('errorClusters', action.payload)
        .set('isRejectedClusters', true)
        .set('isFetchingClusters', false);

    case `${FETCH_V2V_DATASTORES}_PENDING`:
      return state.set('isFetchingDatastores', true).set('isRejectedDatastores', false);
    case `${FETCH_V2V_DATASTORES}_FULFILLED`:
      validateDatastores(action.payload.data.resources);
      return state
        .set('datastores', action.payload.data.resources)
        .set('isFetchingDatastores', false)
        .set('isRejectedDatastores', false)
        .set('errorDatastores', null);
    case `${FETCH_V2V_DATASTORES}_REJECTED`:
      return state
        .set('errorDatastores', action.payload)
        .set('isRejectedDatastores', true)
        .set('isFetchingDatastores', false);

    case `${FETCH_V2V_NETWORKS}_PENDING`:
      return state.set('isFetchingNetworks', true).set('isRejectedNetworks', false);
    case `${FETCH_V2V_NETWORKS}_FULFILLED`:
      validateNetworks(action.payload.data.resources);
      return state
        .set('networks', action.payload.data.resources)
        .set('isFetchingNetworks', false)
        .set('isRejectedNetworks', false)
        .set('errorNetworks', null);
    case `${FETCH_V2V_NETWORKS}_REJECTED`:
      return state
        .set('errorNetworks', action.payload)
        .set('isRejectedNetworks', true)
        .set('isFetchingNetworks', false);

    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_PENDING`:
      return state.set('isFetchingTransformationMappings', true).set('isRejectedTransformationMappings', false);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`:
      validateMappings(action.payload.data.resources);
      return state
        .set('transformationMappings', addAssociatedPlansCount(action.payload.data.resources))
        .set('isRejectedTransformationMappings', false)
        .set('isFetchingTransformationMappings', false)
        .set('isContinuingToPlan', false);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_REJECTED`:
      return state
        .set('errorTransformationMappings', action.payload)
        .set('isRejectedTransformationMappings', true)
        .set('isFetchingTransformationMappings', false);

    case HIDE_V2V_DELETE_CONFIRMATION_MODAL:
      return state.set('yesToDeleteInfrastructureMapping', false).set('showDeleteConfirmationModal', action.payload);

    case OPEN_V2V_MAPPING_WIZARD_ON_MOUNT:
      return state.set('openMappingWizardOnMount', true);

    case SET_V2V_MAPPING_TO_DELETE:
      return state.set('mappingToDelete', action.payload);

    case SHOW_V2V_DELETE_CONFIRMATION_MODAL:
      return state.set('showDeleteConfirmationModal', true);

    case YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL:
      return state.set('yesToDeleteInfrastructureMapping', true).set('showDeleteConfirmationModal', false);

    case V2V_HIDE_MAPPING_WIZARD: {
      return state.set('hideMappingWizard', true);
    }

    case V2V_MAPPING_WIZARD_EXITED:
      return state.set('mappingWizardVisible', false).set('openMappingWizardOnMount', false);

    case V2V_SHOW_MAPPING_WIZARD:
      return Immutable.merge(state, { mappingWizardVisible: true, hideMappingWizard: false });

    default:
      return state;
  }
};
