import API from '../../../../../../../../common/API';
import { POST_V2V_MIGRATION_PLANS } from './PlanWizardResultsStepConstants';
import { requestMigrationPlansData } from './planWizardResultsStep.fixtures';

const _postMigrationPlansActionCreator = (url, migrationPlans) => dispatch =>
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
  });

export const postMigrationPlansAction = (url, migrationPlans) =>
  _postMigrationPlansActionCreator(url, migrationPlans);
