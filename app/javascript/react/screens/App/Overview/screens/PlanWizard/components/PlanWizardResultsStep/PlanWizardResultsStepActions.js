import API, { globalMockMode } from '../../../../../../../../common/API';
import {
  POST_V2V_MIGRATION_PLANS,
  POST_V2V_MIGRATION_REQUESTS
} from './PlanWizardResultsStepConstants';
import {
  requestMigrationPlansData,
  requestMigrationRequestsData
} from './planWizardResultsStep.fixtures';

const mockMode = globalMockMode;

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

const _postMigrationPlansActionCreator = (
  url,
  migrationPlans,
  planSchedule
) => dispatch => {
  if (mockMode) {
    dispatch({
      type: POST_V2V_MIGRATION_PLANS,
      payload: API.post(url, migrationPlans)
    }).catch(error => {
      // to enable UI development without the backend ready, i'm catching the error
      // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
      dispatch({
        type: `${POST_V2V_MIGRATION_PLANS}_FULFILLED`,
        payload: requestMigrationPlansData.response
      });
      if (planSchedule === 'migration_plan_now') {
        dispatch({
          type: POST_V2V_MIGRATION_REQUESTS,
          payload: API.post(
            `${requestMigrationPlansData.response.data.results[0].href}`,
            { action: 'order' }
          ).catch(errorMigrationRequest => {
            // to enable UI development without the backend ready, i'm catching the error
            // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
            dispatch({
              type: `${POST_V2V_MIGRATION_REQUESTS}_FULFILLED`,
              payload: requestMigrationRequestsData.response
            });
          })
        });
      }
    });
  } else {
    dispatch({
      type: POST_V2V_MIGRATION_PLANS,
      payload: new Promise((resolve, reject) => {
        API.post(url, migrationPlans)
          .then(response => {
            resolve(response);
            if (planSchedule === 'migration_plan_now') {
              postMigrationRequestsAction(response, dispatch);
            }
          })
          .catch(e => reject(e));
      })
    });
  }
};

export const postMigrationPlansAction = (url, migrationPlans, planSchedule) =>
  _postMigrationPlansActionCreator(url, migrationPlans, planSchedule);
