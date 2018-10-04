import { V2V_POST_EDIT_PLAN_NAME } from './EditPlanNameConstants';
import API from '../../../../../../common/API';

export { fetchTransformationPlansAction } from '../../OverviewActions';

const _editMigrationPlansActionCreator = (url, planId, migrationPlans) => dispatch => {
  const body = {
    action: 'edit',
    resource: { ...migrationPlans }
  };
  return dispatch({
    type: V2V_POST_EDIT_PLAN_NAME,
    payload: API.post(`${url}/${planId}`, body)
  });
};

export const editMigrationPlansAction = (url, planId, migrationPlans) =>
  _editMigrationPlansActionCreator(url, planId, migrationPlans);
