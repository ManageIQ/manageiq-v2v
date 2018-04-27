import URI from 'urijs';
import API, {
  globalMockMode,
  globalLocalStorageMode
} from '../../../../common/API';

import {
  getLocalStorageState,
  LOCAL_STORAGE_KEYS
} from '../../../../common/LocalStorage';

import {
  FETCH_V2V_PLAN_REQUEST,
  FETCH_V2V_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE
} from './PlanConstants';

import { requestPlanData } from './plan.fixtures';
import { queryVmsData, sampleVmResult } from './plan.vms.fixtures';
import { requestPlanRequestData } from './plan.planRequests.fixtures';

const mockMode = globalMockMode;
const localStorageMode = globalLocalStorageMode;

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
const _queryPlanVmsActionCreator = (ids, planId) => dispatch => {
  if (localStorageMode) {
    // this is a shortcut for localstorage mode only (using planid)
    const plans = getLocalStorageState(LOCAL_STORAGE_KEYS.V2V_PLANS);
    const plan = plans.find(p => p.id === planId);
    const vmResults = [];
    plan.pending_tasks.forEach((task, i) => {
      vmResults.push({
        ...sampleVmResult,
        href: `http://localhost:3000/api/vms/${i}`,
        id: i,
        name: task.options.transformation_host_name
      });
    });
    return dispatch({
      type: `${QUERY_V2V_PLAN_VMS}_FULFILLED`,
      payload: { data: { results: vmResults } }
    });
  }

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

export const queryPlanVmsAction = (ids, planId) =>
  _queryPlanVmsActionCreator(ids, planId);

// *****************************************************************************
// * FETCH_V2V_PLAN
// *****************************************************************************
export const _getPlanActionCreator = (url, id) => dispatch => {
  if (localStorageMode) {
    const plans = getLocalStorageState(LOCAL_STORAGE_KEYS.V2V_PLANS);
    const plan = plans.find(p => p.id === id);
    return dispatch({
      type: FETCH_V2V_PLAN,
      payload: new Promise(resolve => {
        resolve({ data: plan });
      })
    });
  } else if (mockMode) {
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

// *****************************************************************************
// * RESET_PLAN_STATE
// *****************************************************************************
export const resetPlanStateAction = () => ({
  type: RESET_PLAN_STATE
});
