import API from '../../../../../../../../common/API';
import {
  POST_V2V_MIGRATION_PLANS,
  POST_V2V_MIGRATION_REQUESTS
} from './PlanWizardResultsStepConstants';
import {
  requestMigrationPlansData,
  requestMigrationRequestsData
} from './planWizardResultsStep.fixtures';

const mockMode = false;

const _postMigrationPlansActionCreator = (url, migrationPlans) => dispatch => {
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
      dispatch({
        type: POST_V2V_MIGRATION_REQUESTS,
        payload: API.post(
          `${url}/${requestMigrationRequestsData.response.data.results[0].id}`,
          { action: 'order' }
        ).catch(errorMigrationRequest => {
          // to enable UI development without the backend ready, i'm catching the error
          // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
          return dispatch({
            type: `${POST_V2V_MIGRATION_REQUESTS}_FULFILLED`,
            payload: requestMigrationRequestsData.response
          });
        })
      });
    });
  } else {
    dispatch({
      type: POST_V2V_MIGRATION_PLANS,
      payload: new Promise((resolve, reject) => {
        API.post(url, migrationPlans)
          .then(response => {
            resolve(response);

            dispatch({
              type: POST_V2V_MIGRATION_REQUESTS,
              payload: new Promise((resolve, reject) => {
                API.post(`${url}/${response.data.results[0].id}`, {
                  action: 'order'
                })
                  .then(responseMigrationRequest => {
                    resolve(responseMigrationRequest);
                  })
                  .catch(e => {
                    return reject(e);
                  });
              })
            });
          })
          .catch(e => {
            return reject(e);
          });
      })
    });
  }
};

export const postMigrationPlansAction = (url, migrationPlans) =>
  _postMigrationPlansActionCreator(url, migrationPlans);
