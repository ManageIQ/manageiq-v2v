import URI from 'urijs';
import API from '../../../../common/API';

import {
  SHOW_MAPPING_WIZARD,
  SHOW_PLAN_WIZARD,
  HIDE_MAPPING_WIZARD,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLANS,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
  CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
  V2V_FETCH_CLUSTERS,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_RETRY_MIGRATION,
  SHOW_DELETE_CONFIRMATION_MODAL,
  HIDE_DELETE_CONFIRMATION_MODAL,
  SET_MAPPING_TO_DELETE
} from './OverviewConstants';

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

const fetchTasksForAllRequests = (allRequests, dispatch) => {
  if (allRequests.length > 0) {
    dispatch({
      type: FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
      payload: new Promise((resolve, reject) => {
        API.post(
          '/api/requests?expand=resource&attributes=miq_request_tasks,service_template',
          {
            action: 'query',
            resources: allRequests
          }
        )
          .then(responseRequestsWithTasks => {
            resolve(responseRequestsWithTasks);
          })
          .catch(e => reject(e));
      })
    });
  }
};

const collectAllRequests = plan =>
  plan.miq_requests.map(request => Object.assign({}, { href: request.href }));

const _getTransformationPlansActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TRANSFORMATION_PLANS,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(response);
          const allPlansWithRequests = response.data.resources;

          const allRequests = [];
          const mergedRequests = [].concat(
            ...allRequests.concat(
              allPlansWithRequests.map(plan => collectAllRequests(plan))
            )
          );

          fetchTasksForAllRequests(mergedRequests, dispatch);
        })
        .catch(e => reject(e));
    })
  });

export const fetchTransformationPlansAction = url => {
  const uri = new URI(url);
  return _getTransformationPlansActionCreator(uri.toString());
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
