import Immutable from 'seamless-immutable';

import { SET_V2V_EDITING_MAPPING } from './MappingWizardGeneralStepConstants';
import { V2V_MAPPING_WIZARD_EXITED } from '../../../../screens/MappingWizard/MappingWizardConstants';

export const initialState = Immutable({
  editingMapping: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_V2V_EDITING_MAPPING:
      return state.set('editingMapping', action.payload);

    case V2V_MAPPING_WIZARD_EXITED:
      return initialState;

    default:
      return state;
  }
};
