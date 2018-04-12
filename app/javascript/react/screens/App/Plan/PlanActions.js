import URI from 'urijs';
import API, { globalMockMode } from '../../../../common/API';

import { FETCH_V2V_PLAN_REQUESTS } from './PlanConstants';

import { requestPlanRequestsData } from './plan.fixtures';

const mockMode = globalMockMode;

const _getPlanRequestsActionCreator = url => dispatch => {
  if (mockMode) {
    // we don't want to send REJECTED in mock mode here b/c it will reset the state incorrectly
    dispatch({
      type: `${FETCH_V2V_PLAN_REQUESTS}_FULFILLED`,
      payload: requestPlanRequestsData.response
    });
  } else {
    dispatch({
      type: FETCH_V2V_PLAN_REQUESTS,
      payload: API.get(url)
    });
  }
};

export const fetchPlanRequestsAction = url => {
  const uri = new URI(url);
  return _getPlanRequestsActionCreator(uri.toString());
};
