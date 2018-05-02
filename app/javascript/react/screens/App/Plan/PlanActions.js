import URI from 'urijs';
import API from '../../../../common/API';

import {
  FETCH_V2V_PLAN_REQUEST,
  FETCH_V2V_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE
} from './PlanConstants';

// *****************************************************************************
// * FETCH_V2V_PLAN_REQUEST
// *****************************************************************************
const _getPlanRequestActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_PLAN_REQUEST,
    payload: API.get(url)
  });

export const fetchPlanRequestAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  uri.addSearch({ attributes: 'miq_request_tasks' });
  return _getPlanRequestActionCreator(uri.toString());
};

// *****************************************************************************
// * QUERY_V2V_PLAN_VMS
// *****************************************************************************
const _queryPlanVmsActionCreator = ids => dispatch => {
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
export const _getPlanActionCreator = url => dispatch =>
  dispatch({
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

export const fetchPlanAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  uri.addSearch({ attributes: 'miq_requests' });
  return _getPlanActionCreator(uri.toString());
};

// *****************************************************************************
// * RESET_PLAN_STATE
// *****************************************************************************
export const resetPlanStateAction = () => ({
  type: RESET_PLAN_STATE
});
