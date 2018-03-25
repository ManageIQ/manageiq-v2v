import URI from 'urijs';
import API, { globalMockMode } from '../../../../common/API';

import {
  SHOW_MAPPING_WIZARD,
  SHOW_PLAN_WIZARD,
  HIDE_MAPPING_WIZARD,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_MIGRATIONS_IN_PROGRESS
} from './OverviewConstants';

import { requestTransformationMappingsData } from './overview.fixtures';
import { requestActiveServiceRequests } from './overview.migrationsInProgress.fixtures';

const mockMode = globalMockMode;

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

const _getTransformationMappingsActionCreator = url => dispatch => {
  dispatch({
    type: FETCH_V2V_TRANSFORMATION_MAPPINGS,
    payload: API.get(url)
  }).catch(error => {
    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    if (mockMode) {
      dispatch({
        type: `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`,
        payload: requestTransformationMappingsData.response
      });
    }
  });
};

export const fetchTransformationMappingsAction = url => {
  const uri = new URI(url);
  return _getTransformationMappingsActionCreator(uri.toString());
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

const _getMigrationsInProgressAction = url => dispatch =>
  dispatch({
    type: FETCH_V2V_MIGRATIONS_IN_PROGRESS,
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_MIGRATIONS_IN_PROGRESS_PENDING, FETCH_V2V_MIGRATIONS_IN_PROGRESS_FULFILLED,
    // FETCH_V2V_MIGRATIONS_IN_PROGRESS_REJECTED

    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    if (mockMode) {
      dispatch({
        type: `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_FULFILLED`,
        payload: requestActiveServiceRequests.response
      });
    }
  });

export const fetchMigrationsInProgressAction = () => {
  const url =
    '/api/service_requests?' +
    "filter[]=state='active'" +
    "&filter[]=type='ServiceTemplateTransformationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks';

  const uri = new URI(url);

  return _getMigrationsInProgressAction(uri.toString());
};
