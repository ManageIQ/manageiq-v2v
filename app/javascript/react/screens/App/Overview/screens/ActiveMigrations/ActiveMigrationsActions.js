import URI from 'urijs';
import API from '../../../../../../common/API';

import { FETCH_V2V_ACTIVE_MIGRATIONS } from './ActiveMigrationsConstants';
import { requestActiveServiceRequests } from './activeMigrations.fixtures';

const mockMode = true;

const _getActiveMigrationsAction = url => dispatch => {
  if (mockMode) {
    dispatch({
      type: `${FETCH_V2V_ACTIVE_MIGRATIONS}_FULFILLED`,
      payload: requestActiveServiceRequests.response
    });
    return;
  }
  dispatch({
    type: FETCH_V2V_ACTIVE_MIGRATIONS,
    payload: API.get(url)
  });
};

const fetchActiveMigrationsAction = () => {
  const url =
    '/api/service_requests?' +
    "filter[]=state='active'" +
    "&filter[]=type='ServiceTemplateMigrationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks';

  const uri = new URI(url);

  return _getActiveMigrationsAction(uri.toString());
};

export { fetchActiveMigrationsAction };
