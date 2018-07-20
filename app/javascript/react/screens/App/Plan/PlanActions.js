import URI from 'urijs';
import { saveAs } from 'file-saver';
import API from '../../../../common/API';
import http from '../../../../common/http';

import {
  FETCH_V2V_PLAN,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE,
  FETCH_V2V_MIGRATION_TASK_LOG,
  DOWNLOAD_LOG_CLICKED,
  DOWNLOAD_LOG_COMPLETED,
  FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE,
  FETCH_V2V_ORCHESTRATION_STACK,
  CANCEL_V2V_PLAN_REQUEST_TASKS
} from './PlanConstants';

import { V2V_NOTIFICATION_ADD } from '../common/NotificationList/NotificationConstants';

// *****************************************************************************
// * FETCH_V2FETCH_V2V_ORCHESTRATION_STACK
// *****************************************************************************
const _getOrchestrationStackActionCreator = (url, playbookScheduleType, task) => dispatch => {
  dispatch({
    type: DOWNLOAD_LOG_CLICKED,
    payload: task.id
  });

  return dispatch({
    type: FETCH_V2V_ORCHESTRATION_STACK,
    payload: new Promise((resolve, reject) =>
      API.get(url)
        .then(response => {
          resolve(response);
          dispatch({
            type: DOWNLOAD_LOG_COMPLETED,
            payload: task.id
          });
          const playbookLogFileName = `${task.vmName}-${playbookScheduleType}.log`;
          const file = new File([response.data.stdout], playbookLogFileName, { type: 'text/plain;charset=utf-8' });
          saveAs(file);
          const successMsg = sprintf(__('"%s" download successful'), playbookLogFileName);
          dispatch({
            type: V2V_NOTIFICATION_ADD,
            message: successMsg,
            notificationType: 'success',
            persistent: true,
            actionEnabled: false
          });
        })
        .catch(e => {
          dispatch({
            type: DOWNLOAD_LOG_COMPLETED,
            payload: task.id
          });
          reject(e);
        })
    )
  });
};

export const fetchOrchestrationStackAction = (url, playbookScheduleType, task) => {
  const [schedule] = playbookScheduleType.match(/pre|post/);
  const uri = new URI(`${url}/${task.options.playbooks[schedule].job_id}`);

  uri.addSearch({ attributes: 'stdout' });

  return _getOrchestrationStackActionCreator(uri.toString(), playbookScheduleType, task);
};

// *****************************************************************************
// * FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE
// *****************************************************************************
const _getAnsiblePlaybookTemplateActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE,
    payload: API.get(url)
  });

export const fetchAnsiblePlaybookTemplateAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  return _getAnsiblePlaybookTemplateActionCreator(uri.toString());
};

// *****************************************************************************
// * FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN
// *****************************************************************************
const _getTasksForAllRequestsForPlanActionCreator = (url, allRequests) => dispatch => {
  dispatch({
    type: FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN,
    payload: new Promise((resolve, reject) => {
      API.post(url, {
        action: 'query',
        resources: allRequests
      })
        .then(response => {
          resolve(response);
        })
        .catch(e => reject(e));
    })
  });
};

export const fetchTasksForAllRequestsForPlanAction = (url, allRequests) =>
  _getTasksForAllRequestsForPlanActionCreator(url, allRequests);

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

// *****************************************************************************
// * CANCEL MIGRATION TASKS
// *****************************************************************************
export const cancelPlanRequestTasksAction = (url, tasks) => dispatch => {
  const resources = tasks.map(t => ({ id: t.id }));
  dispatch({
    type: CANCEL_V2V_PLAN_REQUEST_TASKS,
    payload: API.post(url, { action: 'cancel', resources })
  });
};
