import URI from 'urijs';
import API, { globalMockMode } from '../../../../common/API';

import {
  SHOW_MAPPING_WIZARD,
  SHOW_PLAN_WIZARD,
  HIDE_MAPPING_WIZARD,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS,
  FETCH_V2V_TRANSFORMATION_PLANS
} from './OverviewConstants';

import { requestTransformationMappingsData } from './overview.fixtures';
import { requestTransformationPlanRequestsData } from './overview.transformationPlanRequests.fixtures';
import { requestTransformationPlansData } from './overview.transformationPlans.fixtures';

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

const _getTransformationPlanRequestsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS,
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS_PENDING, FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS_FULFILLED,
    // FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS_REJECTED

    // to enable UI development without the database, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    if (mockMode) {
      dispatch({
        type: `${FETCH_V2V_TRANSFORMATION_PLAN_REQUESTS}_FULFILLED`,
        payload: requestTransformationPlanRequestsData.response
      });
    }
  });

export const fetchTransformationPlanRequestsAction = url => {
  const uri = new URI(url);
  return _getTransformationPlanRequestsActionCreator(uri.toString());
};

const _getTransformationPlansActionCreator = url => dispatch =>
  dispatch({
    type: 'FETCH_V2V_TRANSFORMATION_PLANS',
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_TRANSFORMATION_PLANS_PENDING, FETCH_V2V_TRANSFORMATION_PLANS_FULFILLED,
    // FETCH_V2V_TRANSFORMATION_PLANS_REJECTED

    // to enable UI development without the database, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    if (mockMode) {
      dispatch({
        type: `${FETCH_V2V_TRANSFORMATION_PLANS}_FULFILLED`,
        payload: requestTransformationPlansData.response
      });
    }
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
