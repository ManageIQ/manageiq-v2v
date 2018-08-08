import Immutable from 'seamless-immutable';
import { FETCH_V2V_OSP_GROUPS_AND_FLAVORS } from './PlanWizardInstancePropertiesStepConstants';

const initialState = Immutable({
  securityGroups: [],
  flavors: [],
  isFetchingGroupsAndFlavors: false,
  isRejectedGroupsAndFlavors: false,
  errorGroupsAndFlavors: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_OSP_GROUPS_AND_FLAVORS}_PENDING`:
      return state.set('isFetchingGroupsAndFlavors', true).set('isRejectedGroupsAndFlavors', false);
    case `${FETCH_V2V_OSP_GROUPS_AND_FLAVORS}_FULFILLED`:
      return state
        .set('securityGroups', action.payload.data.security_groups)
        .set('flavors', action.payload.data.flavors)
        .set('isFetchingGroupsAndFlavors', false)
        .set('isRejectedGroupsAndFlavors', false)
        .set('errorGroupsAndFlavors', null);
    case `${FETCH_V2V_OSP_GROUPS_AND_FLAVORS}_REJECTED`:
      return state
        .set('errorGroupsAndFlavors', action.payload)
        .set('isFetchingGroupsAndFlavors', false)
        .set('isRejectedGroupsAndFlavors', true);
    default:
      return state;
  }
};
