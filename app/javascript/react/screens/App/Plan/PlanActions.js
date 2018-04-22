import URI from 'urijs';
import API, { globalMockMode } from '../../../../common/API';

import {
  FETCH_V2V_PLAN_REQUEST,
  FETCH_V2V_PLAN,
  QUERY_V2V_PLAN_VMS
} from './PlanConstants';

import { requestPlanData } from './plan.fixtures';
import { queryVmsData } from './plan.vms.fixtures';
import { requestPlanRequestData } from './plan.planRequests.fixtures';

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

// *****************************************************************************
// * QUERY_V2V_PLAN_VMS
// *****************************************************************************
const _queryPlanVmsActionCreator = ids => dispatch => {
  if (mockMode) {
    return dispatch({
      type: `${QUERY_V2V_PLAN_VMS}_FULFILLED`,
      payload: queryVmsData.response
    });
  }
  const resources = ids.map(id => {
    return {
      id
    };
  });
  return dispatch({
    type: QUERY_V2V_PLAN_VMS,
    payload: API.post('/api/vms', {
      action: 'query',
      resources
    })
  });
};

export const queryPlanVmsAction = ids => {
  return _queryPlanVmsActionCreator(ids);
};

// *****************************************************************************
// * FETCH_V2V_PLAN
// *****************************************************************************
export const _getPlanActionCreator = (url, id) => dispatch => {
  if (mockMode) {
    return dispatch({
      type: `${FETCH_V2V_PLAN}_FULFILLED`,
      payload: requestPlanData(id).response
    });
  }
  return dispatch({
    type: FETCH_V2V_PLAN,
    payload: API.get(url)
  });
};

export const fetchPlanAction = (urlBuilder, id) => {
  const uri = new URI(urlBuilder(id));
  return _getPlanActionCreator(uri.toString(), id);
};
