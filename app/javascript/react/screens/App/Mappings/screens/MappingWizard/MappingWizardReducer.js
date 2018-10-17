import Immutable from 'seamless-immutable';

import {
  V2V_SET_TRANSFORMATIONS_BODY,
  V2V_SHOW_WARNING_MODAL,
  V2V_HIDE_WARNING_MODAL,
  V2V_SHOW_ALERT,
  V2V_HIDE_ALERT
} from './MappingWizardConstants';

const initialState = Immutable({
  transformationsBody: {},
  warningModalVisible: false,
  alert: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_SET_TRANSFORMATIONS_BODY:
      return state.set('transformationsBody', action.payload);
    case V2V_SHOW_WARNING_MODAL:
      return Immutable.merge(state, {
        warningModalVisible: true,
        sourceClustersWithoutMappings: action.payload
      });
    case V2V_HIDE_WARNING_MODAL:
      return Immutable.merge(state, {
        warningModalVisible: false
      });
    case V2V_SHOW_ALERT:
      return Immutable.merge(state, action.payload);
    case V2V_HIDE_ALERT:
      return state.set('alertText', '');
    default:
      return state;
  }
};
