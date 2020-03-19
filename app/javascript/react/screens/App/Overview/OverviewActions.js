import URI from 'urijs';

import API from '../../../../common/API';
import { V2V_NOTIFICATION_ADD } from '../common/NotificationList/NotificationConstants';
import { formatDateTime } from '../../../../components/dates/MomentDate';
import {
  ARCHIVE_TRANSFORMATION_PLAN,
  DELETE_TRANSFORMATION_PLAN,
  CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
  FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS,
  FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
  FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLANS,
  HIDE_CONFIRM_MODAL,
  SHOW_CONFIRM_MODAL,
  SHOW_PLAN_WIZARD,
  SHOW_EDIT_PLAN_TITLE_MODAL,
  HIDE_EDIT_PLAN_TITLE_MODAL,
  V2V_RETRY_MIGRATION,
  V2V_SCHEDULE_MIGRATION,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL,
  SHOW_PLAN_WIZARD_EDIT_MODE,
  V2V_EDIT_PLAN_REQUEST,
  V2V_CANCEL_PLAN_REQUEST
} from './OverviewConstants';
import { OPEN_V2V_MAPPING_WIZARD_ON_MOUNT } from '../Mappings/MappingsConstants';

export { fetchCloudTenantsAction } from '../Mappings/MappingsActions';

export const showConfirmModalAction = modalOptions => ({
  type: SHOW_CONFIRM_MODAL,
  payload: modalOptions
});

export const hideConfirmModalAction = () => ({
  type: HIDE_CONFIRM_MODAL
});

export const showPlanWizardAction = id => dispatch => {
  dispatch({
    type: SHOW_PLAN_WIZARD,
    payload: { id }
  });
};

export const showPlanWizardEditModeAction = id => dispatch => {
  dispatch({
    type: SHOW_PLAN_WIZARD_EDIT_MODE,
    editingPlanId: id
  });
};

export const showEditPlanNameModalAction = id => dispatch => {
  dispatch({
    type: SHOW_EDIT_PLAN_TITLE_MODAL,
    editingPlanId: id
  });
};

export const hideEditPlanNameModalAction = () => dispatch => {
  dispatch({
    type: HIDE_EDIT_PLAN_TITLE_MODAL
  });
};

const _createTransformationPlanRequestActionCreator = url => dispatch =>
  dispatch({
    type: CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
    payload: {
      promise: API.post(url, { action: 'order' }),
      data: url
    }
  });

export const createTransformationPlanRequestAction = url => {
  const uri = new URI(url);
  return _createTransformationPlanRequestActionCreator(uri.toString());
};

const _getTransformationMappingsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TRANSFORMATION_MAPPINGS,
    payload: API.get(url)
  });

export const fetchTransformationMappingsAction = url => {
  const uri = new URI(url);
  return _getTransformationMappingsActionCreator(uri.toString());
};

const fetchTasksForAllRequests = (allRequests, archived, dispatch) => {
  if (allRequests.length > 0) {
    dispatch({
      type: archived ? FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS : FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
      payload: new Promise((resolve, reject) => {
        API.post('/api/requests?expand=resource&attributes=miq_request_tasks,service_template', {
          action: 'query',
          resources: allRequests
        })
          .then(responseRequestsWithTasks => {
            resolve(responseRequestsWithTasks);
          })
          .catch(e => reject(e));
      })
    });
  }
};

const collectAllRequests = plan => plan.miq_requests.map(request => Object.assign({}, { href: request.href }));

const _getTransformationPlansActionCreator = (url, archived) => dispatch =>
  dispatch({
    type: archived ? FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS : FETCH_V2V_TRANSFORMATION_PLANS,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(response);
          const allPlansWithRequests = response.data.resources;

          const allRequests = [];
          const mergedRequests = [].concat(
            ...allRequests.concat(allPlansWithRequests.map(plan => collectAllRequests(plan)))
          );

          fetchTasksForAllRequests(mergedRequests, archived, dispatch);
        })
        .catch(e => reject(e));
    })
  });

export const fetchTransformationPlansAction = ({ url, archived }) => {
  const uri = new URI(url);
  return _getTransformationPlansActionCreator(uri.toString(), archived);
};

const _getServiceTemplateAnsiblePlaybooksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS,
    payload: API.get(url)
  });

export const fetchServiceTemplateAnsiblePlaybooksAction = url => {
  const uri = new URI(url);
  return _getServiceTemplateAnsiblePlaybooksActionCreator(uri.toString());
};

export const setMigrationsFilterAction = (filter, additionalActions) => dispatch => {
  dispatch({
    type: V2V_SET_MIGRATIONS_FILTER,
    payload: filter
  });

  if (additionalActions) {
    for (const type in additionalActions) {
      if ({}.hasOwnProperty.call(additionalActions, type)) {
        dispatch({
          type,
          payload: additionalActions[type]
        });
      }
    }
  }
};

export const retryMigrationAction = planId => ({
  type: V2V_RETRY_MIGRATION,
  payload: planId
});

const _archiveTransformationPlanActionCreator = url => dispatch =>
  dispatch({
    type: ARCHIVE_TRANSFORMATION_PLAN,
    payload: API.post(url, { action: 'archive' })
  });

export const archiveTransformationPlanAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  return _archiveTransformationPlanActionCreator(uri.toString());
};

const _deleteTransformationPlanActionCreator = url => dispatch =>
  dispatch({
    type: DELETE_TRANSFORMATION_PLAN,
    payload: API.post(url, { action: 'delete' })
  });

export const deleteTransformationPlanAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  return _deleteTransformationPlanActionCreator(uri.toString());
};

export const toggleScheduleMigrationModal = plan => ({
  type: V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL,
  payload: plan
});

// TODO look for other instances of warm_migration_cutover_datetime
export const scheduleCutover = ({ planRequest, cutoverTime }) => dispatch =>
  dispatch({
    type: V2V_SCHEDULE_MIGRATION,
    payload: new Promise((resolve, reject) => {
      const url = planRequest.href;
      const body = {
        action: 'edit',
        resource: {
          options: {
            cutover_datetime: cutoverTime
          }
        }
      };
      return API.post(url, body)
        .then(response => {
          resolve(response);
          const message =
            cutoverTime === null
              ? __('Migration cutover successfully unscheduled')
              : sprintf(
                  __('Migration cutover successfully scheduled for %s'),
                  formatDateTime(response.data.options.config_info.warm_migration_cutover_datetime)
                );
          dispatch({
            type: V2V_NOTIFICATION_ADD,
            message,
            notificationType: 'success',
            actionEnabled: false
          });
        })
        .catch(e => reject(e));
    })
  });

export const scheduleMigration = payload => dispatch =>
  dispatch({
    type: V2V_SCHEDULE_MIGRATION,
    payload: new Promise((resolve, reject) => {
      const {
        scheduleTime,
        plan: { id: planId }
      } = payload;
      const scheduleId = (payload.plan.schedules && payload.plan.schedules[0].id) || null;
      let url = `/api/service_templates/${planId}`;
      let body = {
        action: 'order',
        resource: {
          schedule_time: scheduleTime
        }
      };
      if (scheduleId) {
        url = `${url}/schedules/${scheduleId}`;
        body = scheduleTime
          ? {
              action: 'edit',
              resource: {
                run_at: { ...payload.plan.schedules[0].run_at, start_time: new Date(scheduleTime).toUTCString() }
              }
            }
          : { action: 'delete' };
      }
      return API.post(url, body)
        .then(response => {
          resolve(response);
          let msg = __('Migration successfully unscheduled');
          if (scheduleTime) {
            msg = sprintf(
              __('Migration successfully scheduled for %s'),
              formatDateTime(response.data.run_at.start_time)
            );
          }
          dispatch({
            type: V2V_NOTIFICATION_ADD,
            message: msg,
            notificationType: 'success',
            actionEnabled: false
          });
        })
        .catch(e => reject(e));
    })
  });

export const openMappingWizardOnTransitionAction = () => ({ type: OPEN_V2V_MAPPING_WIZARD_ON_MOUNT });

const _editPlanRequestActionCreator = ({ planRequestUrl, plansUrl, resource }) => dispatch =>
  dispatch({
    type: V2V_EDIT_PLAN_REQUEST,
    payload: new Promise((resolve, reject) =>
      API.post(planRequestUrl, { action: 'edit', resource })
        .then(response => {
          resolve(response);
          fetchTransformationPlansAction({
            url: plansUrl,
            archived: false
          })(dispatch);
        })
        .catch(e => reject(e))
    )
  });

export const editPlanRequestAction = ({ planRequestUrl, plansUrl, resource }) =>
  _editPlanRequestActionCreator({
    planRequestUrl: new URI(planRequestUrl).toString(),
    plansUrl: new URI(plansUrl).toString(),
    resource
  });

export const acknowledgeDeniedPlanRequestAction = ({ plansUrl, planRequest }) =>
  editPlanRequestAction({
    planRequestUrl: planRequest.href,
    plansUrl,
    resource: {
      options: {
        ...planRequest.options,
        denial_acknowledged: true
      }
    }
  });

const _cancelPlanRequestActionCreator = url => dispatch =>
  dispatch({
    type: V2V_CANCEL_PLAN_REQUEST,
    payload: {
      promise: new Promise((resolve, reject) => {
        API.post(url, { action: 'cancel' })
          .then(response => resolve(response))
          .catch(e => reject(e));
      }),
      data: url,
      meta: { url }
    }
  });

export const cancelPlanRequestAction = (url, id) => _cancelPlanRequestActionCreator(new URI(`${url}/${id}`).toString());
