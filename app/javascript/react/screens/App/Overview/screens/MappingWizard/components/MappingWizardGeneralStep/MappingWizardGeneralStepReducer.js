import Immutable from 'seamless-immutable';

import { SET_V2V_EDITING_MAPPING } from './MappingWizardGeneralStepConstants';

const initialState = Immutable({
  editingMapping: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_V2V_EDITING_MAPPING:
      return state.set('editingMapping', action.payload);

    default:
      return state;
  }
};
