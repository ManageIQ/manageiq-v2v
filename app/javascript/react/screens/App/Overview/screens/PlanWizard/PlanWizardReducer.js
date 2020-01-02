import Immutable from 'seamless-immutable';

import {
  V2V_SET_PLANS_BODY,
  V2V_SET_PLAN_SCHEDULE,
  V2V_SET_PLAN_TYPE,
  V2V_PLAN_WIZARD_SHOW_ALERT,
  V2V_PLAN_WIZARD_HIDE_ALERT,
  SINGLETON_ALERT_ID
} from './PlanWizardConstants';

const initialState = Immutable({
  plansBody: {},
  alerts: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case V2V_SET_PLANS_BODY:
      return state.set('plansBody', action.payload);
    case V2V_SET_PLAN_SCHEDULE:
      return state.set('planSchedule', action.payload);
    case V2V_SET_PLAN_TYPE:
      return state.set('planType', action.payload);
    // TODO add unit tests for these handlers
    case V2V_PLAN_WIZARD_SHOW_ALERT:
      return state.set(
        'alerts',
        Immutable.merge(action.payload.alertId !== SINGLETON_ALERT_ID ? state.alerts : {}, {
          [action.payload.alertId]: { ...action.payload }
        })
      );
    case V2V_PLAN_WIZARD_HIDE_ALERT:
      return state.set(
        'alerts',
        (() => {
          if (!action.alertId) return {};
          const { [action.alertId]: alertBeingHidden, ...otherAlerts } = state.alerts; // eslint-disable-line no-unused-vars
          return otherAlerts;
        })()
      );
    default:
      return state;
  }
};
