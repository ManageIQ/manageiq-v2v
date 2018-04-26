import API, {
  globalMockMode,
  globalLocalStorageMode
} from '../../../../../../../../common/API';
import {
  POST_V2V_MIGRATION_PLANS,
  POST_V2V_MIGRATION_REQUESTS
} from './PlanWizardResultsStepConstants';
import {
  requestMigrationPlansData,
  requestMigrationRequestsData
} from './planWizardResultsStep.fixtures';

import { saveMigrationPlanToLocalStorage } from './savePlans.localStorageService';

const mockMode = globalMockMode;
const localStorageMode = globalLocalStorageMode;

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
  planSchedule,
  valid_vms
) => dispatch => {
  if (mockMode) {
    if (localStorageMode) {
      saveMigrationPlanToLocalStorage(migrationPlans, planSchedule, valid_vms);
    }
    dispatch({
      type: `${POST_V2V_MIGRATION_PLANS}_FULFILLED`,
      payload: requestMigrationPlansData.response
    });
    if (planSchedule === 'migration_plan_now') {
      dispatch({
        type: `${POST_V2V_MIGRATION_REQUESTS}_FULFILLED`,
        payload: requestMigrationRequestsData.response
      });
    }
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

export const postMigrationPlansAction = (
  url,
  migrationPlans,
  planSchedule,
  valid_vms
) =>
  _postMigrationPlansActionCreator(
    url,
    migrationPlans,
    planSchedule,
    valid_vms
  );
