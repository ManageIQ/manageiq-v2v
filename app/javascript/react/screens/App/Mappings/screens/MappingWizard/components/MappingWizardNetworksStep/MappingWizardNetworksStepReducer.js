import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_SOURCE_NETWORKS,
  FETCH_V2V_TARGET_NETWORKS,
  FETCH_V2V_PUBLIC_CLOUD_NETWORKS
} from './MappingWizardNetworksStepConstants';
import { V2V_MAPPING_WIZARD_EXITED } from '../../../../screens/MappingWizard/MappingWizardConstants';

const initialState = Immutable({
  isFetchingSourceNetworks: false,
  isRejectedSourceNetworks: false,
  errorSourceNetworks: null,
  isFetchingTargetNetworks: false,
  isRejectedTargetNetworks: false,
  errorTargetNetworks: null,
  sourceNetworks: [],
  targetNetworks: [],
  isFetchingPublicCloudNetworks: false,
  isRejectedPublicCloudNetworks: false,
  errorPublicCloudNetworks: null,
  publicCloudNetworks: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_SOURCE_NETWORKS}_PENDING`:
      return state.set('isFetchingSourceNetworks', true).set('isRejectedSourceNetworks', false);
    case `${FETCH_V2V_SOURCE_NETWORKS}_FULFILLED`:
      return state
        .set('sourceNetworks', action.payload.sourceNetworks)
        .set('isRejectedSourceNetworks', false)
        .set('isFetchingSourceNetworks', false);
    case `${FETCH_V2V_SOURCE_NETWORKS}_REJECTED`:
      return state
        .set('errorSourceNetworks', action.payload)
        .set('isRejectedSourceNetworks', true)
        .set('isFetchingSourceNetworks', false);

    case `${FETCH_V2V_TARGET_NETWORKS}_PENDING`:
      return state.set('isFetchingTargetNetworks', true).set('isRejectedTargetNetworks', false);
    case `${FETCH_V2V_TARGET_NETWORKS}_FULFILLED`:
      return state
        .set('targetNetworks', action.payload.targetNetworks)
        .set('isRejectedTargetNetworks', false)
        .set('isFetchingTargetNetworks', false);
    case `${FETCH_V2V_TARGET_NETWORKS}_REJECTED`:
      return state
        .set('errorTargetNetworks', action.payload)
        .set('isRejectedTargetNetworks', true)
        .set('isFetchingTargetNetworks', false);

    case `${FETCH_V2V_PUBLIC_CLOUD_NETWORKS}_PENDING`:
      return state.set('isFetchingPublicCloudNetworks', true).set('isRejectedPublicCloudNetworks', false);
    case `${FETCH_V2V_PUBLIC_CLOUD_NETWORKS}_FULFILLED`:
      return state
        .set('publicCloudNetworks', action.payload.data.resources)
        .set('isFetchingPublicCloudNetworks', false);
    case `${FETCH_V2V_PUBLIC_CLOUD_NETWORKS}_REJECTED`:
      return state
        .set('errorPublicCloudNetworks', action.payload)
        .set('isRejectedPublicCloudNetworks', true)
        .set('isFetchingPublicCloudNetworks', false);

    case V2V_MAPPING_WIZARD_EXITED:
      return initialState;

    default:
      return state;
  }
};
