import Immutable from 'seamless-immutable';

import { V2V_SET_PLANS_BODY } from './PlanWizardConstants';

const initialState = Immutable({
  plansBody: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_SET_PLANS_BODY:
      return state.set('plansBody', action.payload);

    default:
      return state;
  }
};
