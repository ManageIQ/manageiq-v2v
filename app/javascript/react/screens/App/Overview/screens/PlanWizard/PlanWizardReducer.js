import Immutable from 'seamless-immutable';

import { V2V_SET_PLANS_BODY, V2V_SET_PLAN_SCHEDULE } from './PlanWizardConstants';

const initialState = Immutable({
  plansBody: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_SET_PLANS_BODY:
      return state.set('plansBody', action.payload);
    case V2V_SET_PLAN_SCHEDULE:
      return state.set('planSchedule', action.payload);

    default:
      return state;
  }
};
