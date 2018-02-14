import { SHOW_MAPPING_WIZARD, SHOW_PLAN_WIZARD } from './OverviewConstants';

export const showMappingWizardAction = () => dispatch => {
  dispatch({
    type: SHOW_MAPPING_WIZARD
  });
};

export const showPlanWizardAction = () => dispatch => {
  dispatch({
    type: SHOW_PLAN_WIZARD
  });
};
