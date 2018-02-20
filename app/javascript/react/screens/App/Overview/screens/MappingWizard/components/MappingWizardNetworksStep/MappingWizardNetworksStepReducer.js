import Immutable from 'seamless-immutable';

import { FETCH_V2V_NETWORKS } from './MappingWizardNetworksStepConstants';

const initialState = Immutable({
  isFetchingNetworks: false,
  isRejectedNetworks: false,
  errorNetworks: null,
  sourceNetworks: [],
  targetNetworks: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_NETWORKS}_PENDING`:
      return state.set('isFetchingNetworks', true);
    case `${FETCH_V2V_NETWORKS}_FULFILLED`:
      return state
        .set('sourceNetworks', action.payload.sourceNetworks)
        .set('targetNetworks', action.payload.targetNetworks)
        .set('isRejectedNetworks', false)
        .set('isFetchingNetworks', false);
    case `${FETCH_V2V_NETWORKS}_REJECTED`:
      return state
        .set('errorNetworks', action.payload)
        .set('isRejectedNetworks', true)
        .set('isFetchingNetworks', false);
    default:
      return state;
  }
};
