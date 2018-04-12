import URI from 'urijs';
import API, { globalMockMode } from '../../../../../../../common/API';

import { FETCH_V2V_MIGRATIONS_IN_PROGRESS } from './MigrationsInProgressConstants';
import { requestActiveServiceRequests } from './migrationsInProgress.fixtures';

const mockMode = globalMockMode;

const _getMigrationsInProgressAction = url => dispatch => {
  if (mockMode) {
    dispatch({
      type: `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_FULFILLED`,
      payload: requestActiveServiceRequests.response
    });
    return;
  }
  dispatch({
    type: FETCH_V2V_MIGRATIONS_IN_PROGRESS,
    payload: API.get(url)
  });
};

const fetchMigrationsInProgressAction = () => {
  const url =
    '/api/service_requests?' +
    "filter[]=state='active'" +
    "&filter[]=type='ServiceTemplateTransformationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks' +
    '&sort_by=updated_on';

  const uri = new URI(url);

  return _getMigrationsInProgressAction(uri.toString());
};

export { fetchMigrationsInProgressAction };
