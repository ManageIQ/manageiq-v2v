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
  CANCEL_V2V_PLAN_REQUEST_TASKS,
  REMOVE_TASKS_SELECTED_FOR_CANCELLATION,
  UPDATE_TASKS_SELECTED_FOR_CANCELLATION,
  DELETE_ALL_TASKS_SELECTED_FOR_CANCELLATION,
  ADD_TASKS_TO_MARKED_FOR_CANCELLATION,
  ADD_TASK_TO_NOTIFICATION_SENT_LIST,
  FETCH_V2V_REQUEST_TASK,
  FETCH_V2V_CONVERSION_HOST
} from './PlanConstants';

import { V2V_NOTIFICATION_ADD } from '../common/NotificationList/NotificationConstants';
import { parseComplexErrorMessages } from './helpers';

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

export const downloadLogAction = (task, logType = 'v2v') => dispatch => {
  dispatch({
    type: DOWNLOAD_LOG_CLICKED,
    payload: task.id
  });
  dispatch({
    type: FETCH_V2V_MIGRATION_TASK_LOG,
    payload: new Promise((resolve, reject) => {
      http
        .get(`/migration_log/download_migration_log/${task.id}?log_type=${logType}`)
        .then(response => {
          resolve(response);
          dispatch({
            type: DOWNLOAD_LOG_COMPLETED,
            payload: task.id
          });
          let filenameSuffix = '';
          if (logType === 'v2v') filenameSuffix = 'virt-v2v';
          if (logType === 'wrapper') filenameSuffix = 'virt-v2v-wrapper';
          const v2vLogFileName = `${task.vmName}-${filenameSuffix}.log`;
          if (response.data.status === 'Ok') {
            const file = new File([response.data.log_contents], v2vLogFileName, { type: 'text/plain;charset=utf-8' });
            saveAs(file);
            const successMsg = sprintf(__('"%s" download successful'), v2vLogFileName);
            dispatch({
              type: V2V_NOTIFICATION_ADD,
              message: successMsg,
              notificationType: 'success',
              actionEnabled: false
            });
          } else {
            const failureMsg = sprintf(
              __('Failed to download "%s". Reason - "%s"'),
              v2vLogFileName,
              parseComplexErrorMessages(response.data.status_message)
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
  const completedTasks = [];
  const incompleteTasks = [];

  tasks.forEach(t => {
    if (t.completed) {
      completedTasks.push(t);
    } else {
      incompleteTasks.push(t);
    }
  });

  dispatch({
    type: REMOVE_TASKS_SELECTED_FOR_CANCELLATION,
    payload: completedTasks
  });
  if (incompleteTasks.length === 0) {
    dispatch({
      type: V2V_NOTIFICATION_ADD,
      message: __('Cannot cancel completed VM Migrations'),
      notificationType: 'error',
      persistent: true,
      actionEnabled: false
    });
    return;
  }
  const resources = incompleteTasks.map(t => ({ id: t.id }));
  dispatch({
    type: CANCEL_V2V_PLAN_REQUEST_TASKS,
    payload: new Promise((resolve, reject) => {
      API.post(url, {
        action: 'cancel',
        resources
      })
        .then(response => {
          resolve(response);

          const cancelSuccessMsg = __('Migration cancel request submitted for VMs: ');
          const vmNames = tasks.map(task => task.vmName).join(', ');
          const cancelSuccessMsgWithVMNames = `${cancelSuccessMsg} ${vmNames}`;

          dispatch({
            type: V2V_NOTIFICATION_ADD,
            message: cancelSuccessMsgWithVMNames,
            notificationType: 'success',
            actionEnabled: false
          });

          dispatch({
            type: ADD_TASKS_TO_MARKED_FOR_CANCELLATION,
            payload: tasks
          });

          dispatch({
            type: REMOVE_TASKS_SELECTED_FOR_CANCELLATION,
            payload: tasks
          });
        })
        .catch(e => reject(e));
    })
  });
};

// *****************************************************************************
// * UPDATE SELECTED CANCELLATION TASKS
// *****************************************************************************
export const updateSelectedTasksForCancelAction = updatedSelectedCancellationTasks => dispatch => {
  dispatch({
    type: UPDATE_TASKS_SELECTED_FOR_CANCELLATION,
    payload: updatedSelectedCancellationTasks
  });
};

// *****************************************************************************
// * DELETE ALL SELECTED CANCELLATION TASKS
// *****************************************************************************
export const deleteAllSelectedTasksForCancelAction = updatedSelectedCancellationTasks => dispatch => {
  dispatch({
    type: DELETE_ALL_TASKS_SELECTED_FOR_CANCELLATION
  });
};

// *****************************************************************************
// * DISPATCH SUCCESSFUL AND FAILED MIGRATION NOTIFICATIONS
// *****************************************************************************
export const dispatchVMTasksCompletionNotificationAction = (
  failedMigrations,
  successfulMigrations,
  notificationsSentList
) => dispatch => {
  failedMigrations.forEach(migration => {
    if (!notificationsSentList.find(taskId => taskId === migration.id)) {
      const errorMessage = sprintf(__('%s failed to migrate'), migration.vmName);
      dispatch({
        type: V2V_NOTIFICATION_ADD,
        message: errorMessage,
        notificationType: 'error',
        persistent: true,
        actionEnabled: false
      });
      dispatch({
        type: ADD_TASK_TO_NOTIFICATION_SENT_LIST,
        payload: migration.id
      });
    }
  });

  successfulMigrations.forEach(migration => {
    if (!notificationsSentList.find(taskId => taskId === migration.id)) {
      const successMessage = sprintf(__('%s migrated successfully'), migration.vmName);
      dispatch({
        type: V2V_NOTIFICATION_ADD,
        message: successMessage,
        notificationType: 'success',
        actionEnabled: false
      });
      dispatch({
        type: ADD_TASK_TO_NOTIFICATION_SENT_LIST,
        payload: migration.id
      });
    }
  });
};

// *****************************************************************************
// * FETCH_V2V_REQUEST_TASK
// *****************************************************************************
const _getRequestTaskActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_REQUEST_TASK,
    payload: API.get(url)
  });

export const fetchRequestTaskAction = (url, id, options = {}) => {
  const uri = new URI(`${url}/${id}`);
  const { attributes } = options;

  if (attributes) {
    uri.addSearch({ attributes });
  }

  return _getRequestTaskActionCreator(uri.toString());
};

// *****************************************************************************
// * FETCH_V2V_CONVERSION_HOST
// *****************************************************************************
export const fetchConversionHostAction = (url, id) => dispatch => {
  dispatch(fetchRequestTaskAction(url, id, { attributes: 'conversion_host' })).then(response => {
    dispatch({
      type: FETCH_V2V_CONVERSION_HOST,
      payload: response.value.data
    });
  });
};
