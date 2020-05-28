import Immutable from 'seamless-immutable';

import {
  V2V_SET_PLANS_BODY,
  V2V_SET_PLAN_SCHEDULE,
  V2V_PLAN_WIZARD_SHOW_ALERT,
  V2V_PLAN_WIZARD_HIDE_ALERT
} from './PlanWizardConstants';

const initialState = Immutable({
  plansBody: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_SET_PLANS_BODY:
      return state.set('plansBody', action.payload);
    case V2V_SET_PLAN_SCHEDULE:
      return state.set('planSchedule', action.payload);
    case V2V_PLAN_WIZARD_SHOW_ALERT:
      return Immutable.merge(state, action.payload);
    case V2V_PLAN_WIZARD_HIDE_ALERT:
      return state.set('alertText', '');
    default:
      return state;
  }
};
