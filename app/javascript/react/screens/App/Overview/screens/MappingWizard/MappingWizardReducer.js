import Immutable from 'seamless-immutable';

import {
  V2V_SET_TRANSFORMATIONS_BODY,
  V2V_SHOW_WARNING_MODAL,
  V2V_HIDE_WARNING_MODAL
} from './MappingWizardConstants';

const initialState = Immutable({
  transformationsBody: {},
  warningModalVisible: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_SET_TRANSFORMATIONS_BODY:
      return state.set('transformationsBody', action.payload);
    case V2V_SHOW_WARNING_MODAL:
      return Immutable.merge(state, {
        warningModalVisible: true
      });
    case V2V_HIDE_WARNING_MODAL:
      return Immutable.merge(state, {
        warningModalVisible: false
      });
    default:
      return state;
  }
};
