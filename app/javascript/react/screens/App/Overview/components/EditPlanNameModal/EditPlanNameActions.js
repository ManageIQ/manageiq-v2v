import {
  V2V_EDIT_PLAN_TITLE_SHOW_ALERT,
  V2V_EDIT_PLAN_TITLE_HIDE_ALERT,
  V2V_POST_EDIT_PLAN_TITLE
} from './EditPlanNameConstants';
import API from '../../../../../../common/API';

export { fetchTransformationPlansAction } from '../../OverviewActions';

export const showAlertAction = (alertText, alertType = 'error') => dispatch => {
  dispatch({
    type: V2V_EDIT_PLAN_TITLE_SHOW_ALERT,
    payload: { alertText, alertType }
  });
};

export const hideAlertAction = () => dispatch => {
  dispatch({
    type: V2V_EDIT_PLAN_TITLE_HIDE_ALERT
  });
};

const _editMigrationPlansActionCreator = (url, planId, migrationPlans) => dispatch => {
  const body = {
    action: 'edit',
    resource: { ...migrationPlans }
  };
  return dispatch({
    type: V2V_POST_EDIT_PLAN_TITLE,
    payload: API.post(`${url}/${planId}`, body)
  });
};

export const editMigrationPlansAction = (url, planId, migrationPlans) =>
  _editMigrationPlansActionCreator(url, planId, migrationPlans);
