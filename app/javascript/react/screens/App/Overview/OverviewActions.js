import URI from 'urijs';
import API, { globalMockMode } from '../../../../common/API';

import {
  SHOW_MAPPING_WIZARD,
  SHOW_PLAN_WIZARD,
  HIDE_MAPPING_WIZARD,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLANS,
  V2V_FETCH_CLUSTERS
} from './OverviewConstants';

import { requestTransformationMappingsData } from './overview.fixtures';
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

const _getClustersActionCreator = url => dispatch =>
  dispatch({
    type: `${V2V_FETCH_CLUSTERS}`,
    payload: API.get(url)
  }).catch(error => {
    if (mockMode) {
      dispatch({
        type: `${V2V_FETCH_CLUSTERS}_FULFILLED`,
        payload: {}
      });
    }
  });

export const fetchClustersAction = url => {
  const uri = new URI(url);
  return _getClustersActionCreator(uri.toString());
};
