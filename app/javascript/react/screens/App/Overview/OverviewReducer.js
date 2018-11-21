import Immutable from 'seamless-immutable';

import {
  validateOverviewPlans,
  validateOverviewProviders,
  validateOverviewRequests,
  validateOverviewMappings,
  validateServiceTemplatePlaybooks
} from './OverviewValidators';

import {
  SHOW_PLAN_WIZARD,
  HIDE_PLAN_WIZARD,
  PLAN_WIZARD_EXITED,
  SHOW_EDIT_PLAN_TITLE_MODAL,
  HIDE_EDIT_PLAN_TITLE_MODAL,
  FETCH_PROVIDERS,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_TRANSFORMATION_PLANS,
  FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS,
  FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
  FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS,
  CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
  CONTINUE_TO_PLAN,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_AUTO_SET_MIGRATIONS_FILTER,
  V2V_RETRY_MIGRATION,
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL,
  MIGRATIONS_FILTERS,
  ARCHIVE_TRANSFORMATION_PLAN,
  V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL,
  V2V_SCHEDULE_MIGRATION,
  SHOW_PLAN_WIZARD_EDIT_MODE,
  V2V_EDIT_PLAN_REQUEST
} from './OverviewConstants';

import { planTransmutation, sufficientProviders } from './helpers';

export const initialState = Immutable({
  planWizardVisible: false,
  hidePlanWizard: true,
  planWizardId: null, // id of infrastructure mapping to use for new plan
  editingPlanId: null, // id of migration plan to edit
  editPlanNameModalVisible: false,
  hasSufficientProviders: false,
  isRejectedProviders: false,
  isFetchingProviders: false,
  errorProviders: null,
  transformationMappings: [],
  isRejectedTransformationMappings: false,
  isFetchingTransformationMappings: false,
  transformationPlans: [],
  isRejectedTransformationPlans: false,
  isFetchingTransformationPlans: false,
  errorTransformationPlans: null,
  allRequestsWithTasks: [],
  isRejectedAllRequestsWithTasks: false,
  isFetchingAllRequestsWithTasks: false,
  errorAllRequestsWithTasks: null,
  requestsWithTasksPreviouslyFetched: false,
  archivedTransformationPlans: [],
  isRejectedArchivedTransformationPlans: false,
  isFetchingArchivedTransformationPlans: '',
  errorArchivedTransformationPlans: null,
  allArchivedPlanRequestsWithTasks: [],
  isRejectedAllArchivedPlanRequestsWithTasks: false,
  isFetchingAllArchivedPlanRequestsWithTasks: false,
  errorAllArchivedPlanRequestsWithTasks: null,
  createTransformationPlanRequestResponse: {},
  isRejectedCreateTranformationPlanRequest: false,
  isCreatingTransformationPlanRequest: null,
  errorCreateTransformationPlanRequest: null,
  isContinuingToPlan: false,
  migrationsFilter: MIGRATIONS_FILTERS.notStarted,
  showDeleteConfirmationModal: false,
  confirmModalVisible: false,
  confirmModalOptions: {},
  isArchivingTransformationPlan: false,
  isRejectedArchivingTransformationPlan: false,
  errorArchivingTransformationPlan: null,
  scheduleMigrationModal: false,
  scheduleMigrationPlan: {},
  isSchedulingMigration: false,
  isRejectedSchedulingMigration: false,
  errorSchedulingMigration: false,
  serviceTemplatePlaybooks: [],
  isFetchingServiceTemplatePlaybooks: false,
  isRejectedServiceTemplatePlaybooks: false,
  errorServiceTemplatePlaybooks: null,
  initialMigrationsFilterSet: false,
  isEditingPlanRequest: false,
  isRejectedEditingPlanRequest: false,
  errorEditingPlanRequest: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_MODAL:
      return state.set('confirmModalOptions', action.payload).set('confirmModalVisible', true);
    case HIDE_CONFIRM_MODAL:
      return state.set('confirmModalVisible', false);
    case SHOW_PLAN_WIZARD: {
      const { payload } = action;
      return Immutable.merge(state, {
        planWizardVisible: true,
        hidePlanWizard: false,
        planWizardId: (payload && payload.id) || null
      });
    }
    case SHOW_PLAN_WIZARD_EDIT_MODE: {
      const { editingPlanId } = action;
      return Immutable.merge(state, {
        planWizardVisible: true,
        hidePlanWizard: false,
        planWizardId: null,
        editingPlanId
      });
    }
    case HIDE_PLAN_WIZARD: {
      return state
        .set('hidePlanWizard', true)
        .set('planWizardId', null)
        .set('editingPlanId', null);
    }
    case SHOW_EDIT_PLAN_TITLE_MODAL:
      return state.set('editingPlanId', action.editingPlanId).set('editPlanNameModalVisible', true);
    case HIDE_EDIT_PLAN_TITLE_MODAL:
      return state.set('editingPlanId', null).set('editPlanNameModalVisible', false);
    case PLAN_WIZARD_EXITED:
      return state.set('planWizardVisible', false);
    case `${FETCH_PROVIDERS}_PENDING`:
      return state.set('isFetchingProviders', true);
    case `${FETCH_PROVIDERS}_FULFILLED`:
      return (() => {
        const insufficient = state
          .set('hasSufficientProviders', false)
          .set('isFetchingProviders', false)
          .set('isRejectedProviders', false);
        if (!action.payload.data || !action.payload.data.resources) {
          return insufficient;
        }
        validateOverviewProviders(action.payload.data.resources);
        return insufficient.set('hasSufficientProviders', sufficientProviders(action.payload.data.resources));
      })();
    case `${FETCH_PROVIDERS}_REJECTED`:
      return state
        .set('errorProviders', action.payload)
        .set('isFetchingProviders', false)
        .set('isRejectedProviders', true);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_PENDING`:
      return state.set('isFetchingTransformationMappings', true);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`:
      if (action.payload.data && action.payload.data.resources) {
        validateOverviewMappings(action.payload.data.resources);
        return state
          .set('transformationMappings', action.payload.data.resources)
          .set('isRejectedTransformationMappings', false)
          .set('isFetchingTransformationMappings', false)
          .set('isContinuingToPlan', false);
      }
      return state
        .set('transformationMappings', [])
        .set('isFetchingTransformationMappings', false)
        .set('isRejectedTransformationMappings', false);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_REJECTED`:
      return state
        .set('errorTransformationMappings', action.payload)
        .set('isRejectedTransformationMappings', true)
        .set('isFetchingTransformationMappings', false);
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_PENDING`:
      return state.set('isFetchingTransformationPlans', true);
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_FULFILLED`: {
      validateOverviewPlans(action.payload.data.resources);
      return state
        .set('transformationPlans', planTransmutation(action.payload.data.resources, state.transformationMappings))
        .set('isFetchingTransformationPlans', false)
        .set('isRejectedTransformationPlans', false)
        .set('errorTransformationPlans', null);
    }
    case `${FETCH_V2V_TRANSFORMATION_PLANS}_REJECTED`:
      return state
        .set('errorTransformationPlans', action.payload)
        .set('isRejectedTransformationPlans', true)
        .set('isFetchingTransformationPlans', false);
    case `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_PENDING`:
      return state
        .set('isFetchingArchivedTransformationPlans', 'true')
        .set('isRejectedArchivedTransformationPlans', false);
    case `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_FULFILLED`:
      validateOverviewPlans(action.payload.data.resources);
      return state
        .set(
          'archivedTransformationPlans',
          planTransmutation(action.payload.data.resources, state.transformationMappings)
        )
        .set('isFetchingArchivedTransformationPlans', '')
        .set('isRejectedArchivedTransformationPlans', false)
        .set('errorArchivedTransformationPlans', null);
    case `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_REJECTED`:
      return state
        .set('errorArchivedTransformationPlans', action.payload)
        .set('isRejectedArchivedTransformationPlans', true)
        .set('isFetchingArchivedTransformationPlans', '');
    case `${FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS}_PENDING`:
      return state.set('isFetchingServiceTemplatePlaybooks', true);
    case `${FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS}_FULFILLED`:
      validateServiceTemplatePlaybooks(action.payload.data.resources);
      return state
        .set('serviceTemplatePlaybooks', action.payload.data.resources)
        .set('isFetchingServiceTemplatePlaybooks', false)
        .set('isRejectedServiceTemplatePlaybooks', false)
        .set('errorServiceTemplatePlaybooks', null);
    case `${FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS}_REJECTED`:
      return state
        .set('errorServiceTemplatePlaybooks', action.payload)
        .set('isRejectedServiceTemplatePlaybooks', true)
        .set('isFetchingServiceTemplatePlaybooks', false);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_PENDING`:
      return state.set('isFetchingAllRequestsWithTasks', true);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_FULFILLED`:
      validateOverviewRequests(action.payload.data.results);
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
    case `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_PENDING`:
      return state
        .set('isFetchingAllArchivedPlanRequestsWithTasks', true)
        .set('isRejectedAllArchivedPlanRequestsWithTasks', false);
    case `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_FULFILLED`:
      validateOverviewRequests(action.payload.data.results);
      return state
        .set('allArchivedPlanRequestsWithTasks', action.payload.data.results)
        .set('isFetchingAllArchivedPlanRequestsWithTasks', false)
        .set('isRejectedAllArchivedPlanRequestsWithTasks', false)
        .set('requestsWithTasksPreviouslyFetched', true)
        .set('errorAllArchivedPlanRequestsWithTasks', null);
    case `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_REJECTED`:
      return state
        .set('errorAllArchivedPlanRequestsWithTasks', action.payload)
        .set('isRejectedAllArchivedPlanRequestsWithTasks', true)
        .set('isFetchingAllArchivedPlanRequestsWithTasks', false);
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
      return state.set('isContinuingToPlan', true).set('planWizardId', action.payload.id);
    case V2V_SET_MIGRATIONS_FILTER:
      return state.set('migrationsFilter', action.payload);
    case V2V_RETRY_MIGRATION:
      return state.set('planId', action.payload).set('reloadCard', true);
    case `${ARCHIVE_TRANSFORMATION_PLAN}_PENDING`:
      return state.set('isArchivingTransformationPlan', true).set('isRejectedArchivingTransformationPlan', false);
    case `${ARCHIVE_TRANSFORMATION_PLAN}_FULFILLED`:
      return state
        .set('isArchivingTransformationPlan', false)
        .set('isRejectedArchivingTransformationPlan', false)
        .set('errorArchivingTransformationPlan', null);
    case `${ARCHIVE_TRANSFORMATION_PLAN}_REJECTED`:
      return state
        .set('isArchivingTransformationPlan', false)
        .set('errorArchivingTransformationPlan', action.payload)
        .set('isRejectedArchivingTransformationPlan', true);
    case V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL:
      if (action.payload !== undefined) {
        return state
          .set('scheduleMigrationPlan', action.payload.plan)
          .set('scheduleMigrationModal', !state.scheduleMigrationModal);
      }
      return state.set('scheduleMigrationPlan', null).set('scheduleMigrationModal', !state.scheduleMigrationModal);
    case `${V2V_SCHEDULE_MIGRATION}_PENDING`:
      return state.set('isSchedulingMigration', true).set('isRejectedSchedulingMigration', false);
    case `${V2V_SCHEDULE_MIGRATION}_FULFILLED`:
      return state
        .set('isSchedulingMigration', false)
        .set('isRejectedSchedulingMigration', false)
        .set('errorSchedulingMigration', null)
        .set('scheduleMigrationModal', false);
    case `${V2V_SCHEDULE_MIGRATION}_REJECTED`:
      return state
        .set('isSchedulingMigration', false)
        .set('isRejectedSchedulingMigration', true)
        .set('errorSchedulingMigration', action.payload)
        .set('scheduleMigrationModal', false);

    case V2V_AUTO_SET_MIGRATIONS_FILTER:
      return state.set('initialMigrationsFilterSet', true);

    case `${V2V_EDIT_PLAN_REQUEST}_PENDING`:
      return state
        .set('isEditingPlanRequest', true)
        .set('isRejectedEditingPlanRequest', false)
        .set('errorEditingPlanRequest', null);
    case `${V2V_EDIT_PLAN_REQUEST}_FULFILLED`:
      return state
        .set('isEditingPlanRequest', false)
        .set('isRejectedEditingPlanRequest', false)
        .set('errorEditingPlanRequest', null);
    case `${V2V_EDIT_PLAN_REQUEST}_REJECTED`:
      return state
        .set('isEditingPlanRequest', false)
        .set('isRejectedEditingPlanRequest', true)
        .set('errorEditingPlanRequest', action.payload);

    default:
      return state;
  }
};
