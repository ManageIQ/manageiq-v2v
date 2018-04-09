import URI from 'urijs';
import API, { globalMockMode } from '../../../../common/API';

import { FETCH_V2V_PLAN_REQUESTS } from './PlanConstants';

import { requestPlanRequestsData } from './plan.fixtures';

const mockMode = globalMockMode;

const _getPlanRequestsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_PLAN_REQUESTS,
    payload: API.get(url)
  }).catch(error => {
    if (mockMode) {
      dispatch({
        type: `${FETCH_V2V_PLAN_REQUESTS}_FULFILLED`,
        payload: requestPlanRequestsData.response
      });
    }
  });

export const fetchPlanRequestsAction = url => {
  const uri = new URI(url);
  return _getPlanRequestsActionCreator(uri.toString());
};
