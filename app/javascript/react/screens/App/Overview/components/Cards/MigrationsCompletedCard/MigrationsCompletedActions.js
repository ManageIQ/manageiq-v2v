import URI from 'urijs';
import API from '../../../../../../../common/API';

import { FETCH_V2V_MIGRATIONS_COMPLETED } from './MigrationsCompletedConstants';
import { requestCompletedServiceRequests } from './migrationsCompleted.fixtures';

const mockMode = false;

const _getMigrationsCompletedAction = url => dispatch => {
  if (mockMode) {
    dispatch({
      type: `${FETCH_V2V_MIGRATIONS_COMPLETED}_FULFILLED`,
      payload: requestCompletedServiceRequests.response
    });
    return;
  }
  dispatch({
    type: FETCH_V2V_MIGRATIONS_COMPLETED,
    payload: API.get(url)
  });
};

const fetchMigrationsCompletedAction = () => {
  const url =
    '/api/service_requests?' +
    "filter[]=state='finished'" +
    "&filter[]=type='ServiceTemplateTransformationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks';

  const uri = new URI(url);

  return _getMigrationsCompletedAction(uri.toString());
};

export { fetchMigrationsCompletedAction };
