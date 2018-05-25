import Immutable from 'seamless-immutable';

import {
  SHOW_MAPPING_WIZARD,
  HIDE_MAPPING_WIZARD,
  MAPPING_WIZARD_EXITED,
  SHOW_PLAN_WIZARD,
  HIDE_PLAN_WIZARD,
  PLAN_WIZARD_EXITED,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLANS,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
  CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
  V2V_FETCH_CLUSTERS,
  CONTINUE_TO_PLAN,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_RETRY_MIGRATION,
  SHOW_DELETE_CONFIRMATION_MODAL,
  HIDE_DELETE_CONFIRMATION_MODAL,
  SET_MAPPING_TO_DELETE
} from './OverviewConstants';

export const initialState = Immutable({
  mappingWizardVisible: false,
  hideMappingWizard: true,
  planWizardVisible: false,
  hidePlanWizard: true,
  planWizardId: null,
  transformationMappings: [],
  isRejectedTransformationMappings: false,
  isFetchingTransformationMappings: false,
  transformationPlans: [],
  isRejectedTransformationPlans: false,
  isFetchingTransformationPlans: false,
  errorTransformationPlans: null,
  plansPreviouslyFetched: false,
  allRequestsWithTasks: [],
  isRejectedAllRequestsWithTasks: false,
  isFetchingAllRequestsWithTasks: false,
  errorAllRequestsWithTasks: null,
  requestsWithTasksPreviouslyFetched: false,
  createTransformationPlanRequestResponse: {},
  isRejectedCreateTranformationPlanRequest: false,
  isCreatingTransformationPlanRequest: null,
  errorCreateTransformationPlanRequest: null,
  isContinuingToPlan: false,
  shouldReloadMappings: false,
  clusters: [],
  migrationsFilter: 'Migration Plans Not Started',
  showDeleteConfirmationModal: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MAPPING_WIZARD:
      return Immutable.merge(state, {
        mappingWizardVisible: true,
        hideMappingWizard: false
      });
    case HIDE_MAPPING_WIZARD: {
      const { payload } = action;
      return state
        .set('hideMappingWizard', true)
        .set(
          'shouldReloadMappings',
          (payload && payload.shouldReloadMappings) || false
        );
    }
    case MAPPING_WIZARD_EXITED:
      return state.set('mappingWizardVisible', false);
    case SHOW_PLAN_WIZARD: {
      const { payload } = action;
      return Immutable.merge(state, {
        planWizardVisible: true,
        hidePlanWizard: false,
        planWizardId: (payload && payload.id) || null
      });
    }
    case HIDE_PLAN_WIZARD:
      return state.set('hidePlanWizard', true).set('planWizardId', null);
    case PLAN_WIZARD_EXITED:
      return state.set('planWizardVisible', false);

    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_PENDING`:
      return state.set('isFetchingTransformationMappings', true);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`:
      if (action.payload.data && action.payload.data.resources) {
        return state
          .set('transformationMappings', action.payload.data.resources)
          .set('isRejectedTransformationMappings', false)
          .set('isFetchingTransformationMappings', false)
          .set('shouldReloadMappings', false)
          .set('isContinuingToPlan', false);
      }
      return state
        .set('sourceClusters', [])
        .set('isFetchingTransformationMappings', false)
        .set('isRejectedTransformationMappings', false);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_REJECTED`:
      return state
        .set('errorSourceClusters', action.payload)
        .set('isRejectedTransformationMappings', true)
        .set('isFetchingTransformationMappings', false);

    case `${FETCH_V2V_TRANSFORMATION_PLANS}_PENDING`:
      return state.set('isFetchingTransformationPlans', true);
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_FULFILLED`:
      return state
        .set('transformationPlans', action.payload.data.resources)
        .set('isFetchingTransformationPlans', false)
        .set('isRejectedTransformationPlans', false)
        .set('errorTransformationPlans', null)
        .set('plansPreviouslyFetched', true);
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_REJECTED`:
      return state
        .set('errorTransformationPlans', action.payload)
        .set('isRejectedTransformationPlans', true)
        .set('isFetchingTransformationPlans', false)
        .set('plansPreviouslyFetched', false);

    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_PENDING`:
      return state.set('isFetchingAllRequestsWithTasks', true);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_FULFILLED`:
      return state
        .set('allRequestsWithTasks', action.payload.data.results)
        .set('isFetchingAllRequestsWithTasks', false)
        .set('isRejectedAllRequestsWithTasks', false)
        .set('errorAllRequestsWithTasks', null)
        .set('requestsWithTasksPreviouslyFetched', true)
        .set('planId', '')
        .set('reloadCard', false);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_REJECTED`:
      return state
        .set('errorAllRequestsWithTasks', action.payload)
        .set('isRejectedAllRequestsWithTasks', true)
        .set('isFetchingAllRequestsWithTasks', false)
        .set('requestsWithTasksPreviouslyFetched', false);

    case `${V2V_FETCH_CLUSTERS}_FULFILLED`:
      return state.set('clusters', action.payload.data.resources);

    case `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_PENDING`:
      return state.set('isCreatingTransformationPlanRequest', action.payload);
    case `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_FULFILLED`:
      return state
        .set('createTransformationPlanRequestResponse', action.payload.data)
        .set('isCreatingTransformationPlanRequest', null)
        .set('isRejectedCreateTranformationPlanRequest', false)
        .set('errorCreateTransformationPlanRequest', null);
    case `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_REJECTED`:
      return state
        .set('errorCreateTransformationPlanRequest', action.payload)
        .set('isRejectedCreateTranformationPlanRequest', true)
        .set('isCreatingTransformationPlanRequest', null);

    case CONTINUE_TO_PLAN:
      return state
        .set('isContinuingToPlan', true)
        .set('shouldReloadMappings', true)
        .set('planWizardId', action.payload.id);
    case V2V_SET_MIGRATIONS_FILTER:
      return state.set('migrationsFilter', action.payload);
    case V2V_RETRY_MIGRATION:
      return state.set('planId', action.payload).set('reloadCard', true);

    case SHOW_DELETE_CONFIRMATION_MODAL:
    case HIDE_DELETE_CONFIRMATION_MODAL:
      return state.set('showDeleteConfirmationModal', action.payload);

    case SET_MAPPING_TO_DELETE:
      return state.set('mappingToDelete', action.payload);

    default:
      return state;
  }
};
