import Immutable from 'seamless-immutable';

import { V2V_SET_TRANSFORMATIONS_BODY } from './MappingWizardConstants';

const initialState = Immutable({
  transformationsBody: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_SET_TRANSFORMATIONS_BODY:
      return state.set('transformationsBody', action.payload);

    default:
      return state;
  }
};
