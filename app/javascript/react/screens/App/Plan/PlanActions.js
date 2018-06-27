import URI from 'urijs';
import { saveAs } from 'file-saver';
import API from '../../../../common/API';
import http from '../../../../common/http';

import {
  FETCH_V2V_PLAN_REQUEST,
  FETCH_V2V_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE,
  FETCH_V2V_MIGRATION_TASK_LOG,
  DOWNLOAD_LOG_CLICKED,
  DOWNLOAD_LOG_COMPLETED
} from './PlanConstants';

import { V2V_NOTIFICATION_ADD } from '../common/NotificationList/NotificationConstants';

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
  uri.addSearch({ attributes: 'miq_requests,archived,active' });
  return _getPlanActionCreator(uri.toString());
};

// *****************************************************************************
// * RESET_PLAN_STATE
// *****************************************************************************
export const resetPlanStateAction = () => ({
  type: RESET_PLAN_STATE
});

export const downloadLogAction = task => dispatch => {
  dispatch({
    type: DOWNLOAD_LOG_CLICKED,
    payload: task.id
  });
  dispatch({
    type: FETCH_V2V_MIGRATION_TASK_LOG,
    payload: new Promise((resolve, reject) => {
      http
        .get(`/migration_log/download_migration_log/${task.id}`)
        .then(response => {
          resolve(response);
          dispatch({
            type: DOWNLOAD_LOG_COMPLETED,
            payload: task.id
          });
          const v2vLogFileName = `${task.vmName}.log`;
          if (response.data.status === 'Ok') {
            const file = new File([response.data.log_contents], v2vLogFileName, { type: 'text/plain;charset=utf-8' });
            saveAs(file);
            const successMsg = sprintf(__('"%s" download successful'), `${task.vmName}.log`);
            dispatch({
              type: V2V_NOTIFICATION_ADD,
              message: successMsg,
              notificationType: 'success',
              persistent: true,
              actionEnabled: false
            });
          } else {
            const failureMsg = sprintf(
              __('Failed to download "%s". Reason - "%s"'),
              `${task.vmName}.log`,
              response.data.status_message
            );
            dispatch({
              type: V2V_NOTIFICATION_ADD,
              message: failureMsg,
              notificationType: 'error',
              persistent: true,
              actionEnabled: false
            });
          }
        })
        .catch(e => {
          dispatch({
            type: DOWNLOAD_LOG_COMPLETED,
            payload: task.id
          });
          reject(e);
        });
    })
  });
};
