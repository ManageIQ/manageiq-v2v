import URI from 'urijs';
import API from '../../../../common/API';
import { V2V_NOTIFICATION_ADD } from '../common/NotificationList/NotificationConstants';
import { formatDateTime } from '../../../../components/dates/MomentDate';

import {
  ARCHIVE_TRANSFORMATION_PLAN,
  DELETE_TRANSFORMATION_PLAN,
  CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
  DELETE_INFRASTRUCTURE_MAPPING,
  FETCH_DATASTORES,
  FETCH_NETWORKS,
  FETCH_PROVIDERS,
  FETCH_PROVIDERS_URL,
  FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS,
  FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
  FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLANS,
  HIDE_CONFIRM_MODAL,
  HIDE_DELETE_CONFIRMATION_MODAL,
  HIDE_MAPPING_WIZARD,
  SET_MAPPING_TO_DELETE,
  SHOW_CONFIRM_MODAL,
  SHOW_DELETE_CONFIRMATION_MODAL,
  SHOW_MAPPING_WIZARD,
  SHOW_PLAN_WIZARD,
  V2V_FETCH_CLUSTERS,
  V2V_RETRY_MIGRATION,
  V2V_SCHEDULE_MIGRATION,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL,
  YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL,
  SHOW_PLAN_WIZARD_EDIT_MODE
} from './OverviewConstants';

export const showConfirmModalAction = modalOptions => ({
  type: SHOW_CONFIRM_MODAL,
  payload: modalOptions
});

export const hideConfirmModalAction = () => ({
  type: HIDE_CONFIRM_MODAL
});

export const showMappingWizardAction = () => dispatch => {
  dispatch({
    type: SHOW_MAPPING_WIZARD
  });
};

export const showPlanWizardAction = id => dispatch => {
  dispatch({
    type: SHOW_PLAN_WIZARD,
    payload: id
  });
};

export const showPlanWizardEditModeAction = id => dispatch => {
  dispatch({
    type: SHOW_PLAN_WIZARD_EDIT_MODE,
    editingPlanId: id
  });
};

export const fetchProvidersAction = () => dispatch => {
  dispatch({
    type: FETCH_PROVIDERS,
    payload: API.get(FETCH_PROVIDERS_URL)
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

export const continueToPlanAction = id => dispatch => {
  dispatch({
    type: HIDE_MAPPING_WIZARD
  });
  dispatch({
    type: SHOW_PLAN_WIZARD,
    payload: { id }
  });
};

const _getClustersActionCreator = url => dispatch =>
  dispatch({
    type: `${V2V_FETCH_CLUSTERS}`,
    payload: API.get(url)
  });

export const fetchClustersAction = url => {
  const uri = new URI(url);
  return _getClustersActionCreator(uri.toString());
};

const _getDatastoresActionCreator = url => dispatch =>
  dispatch({
    type: `${FETCH_DATASTORES}`,
    payload: API.get(url)
  });

export const fetchDatastoresAction = url => {
  const uri = new URI(url);
  return _getDatastoresActionCreator(uri.toString());
};

const _getNetworksActionCreator = url => dispatch =>
  dispatch({
    type: `${FETCH_NETWORKS}`,
    payload: API.get(url)
  });

export const fetchNetworksAction = url => {
  const uri = new URI(url);
  return _getNetworksActionCreator(uri.toString());
};

export const setMigrationsFilterAction = filter => ({
  type: V2V_SET_MIGRATIONS_FILTER,
  payload: filter
});

export const retryMigrationAction = planId => ({
  type: V2V_RETRY_MIGRATION,
  payload: planId
});

export const showDeleteConfirmationModalAction = () => ({
  type: SHOW_DELETE_CONFIRMATION_MODAL,
  payload: true
});

export const hideDeleteConfirmationModalAction = () => ({
  type: HIDE_DELETE_CONFIRMATION_MODAL,
  payload: false
});

export const setMappingToDeleteAction = mapping => dispatch => {
  dispatch({
    type: SET_MAPPING_TO_DELETE,
    payload: mapping
  });
};

export const yesToDeleteInfrastructureMappingAction = () => dispatch => {
  dispatch({
    type: YES_TO_DELETE_AND_HIDE_DELETE_CONFIRMATION_MODAL
  });
};

export const deleteInfrastructureMappingAction = mapping => dispatch =>
  dispatch({
    type: DELETE_INFRASTRUCTURE_MAPPING,
    payload: new Promise((resolve, reject) => {
      API.post(`/api/transformation_mappings/${mapping.id}`, {
        action: 'delete'
      })
        .then(response => {
          resolve(response);
        })
        .catch(e => reject(e));
    })
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
