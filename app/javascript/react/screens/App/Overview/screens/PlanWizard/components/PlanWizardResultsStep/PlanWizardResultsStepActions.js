import API from '../../../../../../../../common/API';
import {
  POST_V2V_MIGRATION_PLANS,
  POST_V2V_MIGRATION_REQUESTS,
  PUT_V2V_MIGRATION_PLANS
} from './PlanWizardResultsStepConstants';

export { hidePlanWizardAction } from '../../PlanWizardActions';

const postMigrationRequestsAction = (response, dispatch) => {
  dispatch({
    type: POST_V2V_MIGRATION_REQUESTS,
    payload: new Promise((resolve, reject) => {
      API.post(`${response.data.results[0].href}`, {
        action: 'order'
      })
        .then(responseMigrationRequest => {
          resolve(responseMigrationRequest);
        })
        .catch(e => reject(e));
    })
  });
};

const _postMigrationPlansActionCreator = (url, migrationPlans, planSchedule, planType) => dispatch =>
  dispatch({
    type: POST_V2V_MIGRATION_PLANS,
    payload: new Promise((resolve, reject) => {
      API.post(url, migrationPlans)
        .then(response => {
          resolve(response);
          if (planSchedule === 'migration_plan_now' || planType === 'migration_type_warm') {
            postMigrationRequestsAction(response, dispatch);
          }
        })
        .catch(e => reject(e));
    })
  });

export const postMigrationPlansAction = (url, migrationPlans, planSchedule, planType) =>
  _postMigrationPlansActionCreator(url, migrationPlans, planSchedule, planType);

const _editMigrationPlansActionCreator = (url, planId, migrationPlans, planSchedule, planType) => dispatch => {
  const body = {
    action: 'edit',
    resource: { ...migrationPlans }
  };
  return dispatch({
    type: PUT_V2V_MIGRATION_PLANS,
    payload: new Promise((resolve, reject) => {
      API.post(`${url}/${planId}`, body)
        .then(response => {
          resolve(response);
          if (planSchedule === 'migration_plan_now' || planType === 'migration_type_warm') {
            postMigrationRequestsAction(response, dispatch);
          }
        })
        .catch(e => reject(e));
    })
  });
};

export const editMigrationPlansAction = (url, planId, migrationPlans, planSchedule, planType) =>
  _editMigrationPlansActionCreator(url, planId, migrationPlans, planSchedule, planType);
