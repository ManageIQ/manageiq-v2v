import URI from 'urijs';
import API, { globalMockMode } from '../../../../common/API';

import { FETCH_V2V_PLAN_REQUEST } from './PlanConstants';

import { requestPlanRequestData } from './plan.fixtures';

const mockMode = globalMockMode;

const _getPlanRequestActionCreator = url => dispatch => {
  if (mockMode) {
    // we don't want to send REJECTED in mock mode here b/c it will reset the state incorrectly
    dispatch({
      type: `${FETCH_V2V_PLAN_REQUEST}_FULFILLED`,
      payload: requestPlanRequestData.response
    });
  } else {
    dispatch({
      type: FETCH_V2V_PLAN_REQUEST,
      payload: API.get(url)
    });
  }
};

export const fetchPlanRequestAction = url => {
  const uri = new URI(url);
  return _getPlanRequestActionCreator(uri.toString());
};
