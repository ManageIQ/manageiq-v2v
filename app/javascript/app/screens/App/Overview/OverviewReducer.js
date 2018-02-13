import Immutable from 'seamless-immutable';

import {
  SHOW_MAPPING_WIZARD,
  HIDE_MAPPING_WIZARD,
  MAPPING_WIZARD_EXITED,
  SHOW_PLAN_WIZARD,
  HIDE_PLAN_WIZARD,
  PLAN_WIZARD_EXITED
} from './OverviewConstants';

const initialState = Immutable({
  mappingWizardVisible: false,
  hideMappingWizard: true,
  planWizardVisible: false,
  hidePlanWizard: true
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MAPPING_WIZARD:
      return Immutable.merge(state, {
        mappingWizardVisible: true,
        hideMappingWizard: false
      });
    case HIDE_MAPPING_WIZARD:
      return state.set('hideMappingWizard', true);
    case MAPPING_WIZARD_EXITED:
      return state.set('mappingWizardVisible', false);
    case SHOW_PLAN_WIZARD:
      return Immutable.merge(state, {
        planWizardVisible: true,
        hidePlanWizard: false
      });
    case HIDE_PLAN_WIZARD:
      return state.set('hidePlanWizard', true);
    case PLAN_WIZARD_EXITED:
      return state.set('planWizardVisible', false);
    default:
      return state;
  }
};
