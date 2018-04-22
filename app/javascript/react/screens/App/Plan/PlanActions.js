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

// *****************************************************************************
// * FETCH_V2V_PLAN_REQUEST
// *****************************************************************************
const _getPlanRequestActionCreator = (url, id) => dispatch => {
  if (mockMode) {
    // we don't want to send REJECTED in mock mode here b/c it will reset the state incorrectly
    dispatch({
      type: `${FETCH_V2V_PLAN_REQUEST}_FULFILLED`,
      payload: requestPlanRequestData(id).response
    });
  } else {
    dispatch({
      type: FETCH_V2V_PLAN_REQUEST,
      payload: API.get(url)
    });
  }
};

export const fetchPlanRequestAction = (urlBuilder, id) => {
  const uri = new URI(urlBuilder(id));
  return _getPlanRequestActionCreator(uri.toString(), id);
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

  const resources = ids.map(id => ({
    id
  }));

  return dispatch({
    type: QUERY_V2V_PLAN_VMS,
    payload: API.post('/api/vms', {
      action: 'query',
      resources
    })
  });
};

export const queryPlanVmsAction = ids => _queryPlanVmsActionCreator(ids);

// *****************************************************************************
// * FETCH_V2V_PLAN
// *****************************************************************************
export const _getPlanActionCreator = (url, id) => dispatch => {
  if (mockMode) {
    return dispatch({
      type: FETCH_V2V_PLAN,
      payload: new Promise(resolve => {
        resolve(requestPlanData(id).response);
      })
    });
  }

  return dispatch({
    type: FETCH_V2V_PLAN,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    })
  });
};

export const fetchPlanAction = (urlBuilder, id) => {
  const uri = new URI(urlBuilder(id));
  return _getPlanActionCreator(uri.toString(), id);
};
