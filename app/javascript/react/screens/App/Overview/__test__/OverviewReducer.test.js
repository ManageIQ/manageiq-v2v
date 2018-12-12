import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_TRANSFORMATION_PLANS,
  V2V_SET_MIGRATIONS_FILTER,
  V2V_CANCEL_PLAN_REQUEST,
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL,
  SHOW_PLAN_WIZARD,
  SHOW_PLAN_WIZARD_EDIT_MODE,
  HIDE_PLAN_WIZARD,
  SHOW_EDIT_PLAN_TITLE_MODAL,
  HIDE_EDIT_PLAN_TITLE_MODAL,
  PLAN_WIZARD_EXITED,
  FETCH_PROVIDERS,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS,
  FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS,
  FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS,
  CREATE_V2V_TRANSFORMATION_PLAN_REQUEST,
  CONTINUE_TO_PLAN,
  V2V_RETRY_MIGRATION,
  ARCHIVE_TRANSFORMATION_PLAN,
  V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL,
  V2V_SCHEDULE_MIGRATION,
  V2V_AUTO_SET_MIGRATIONS_FILTER,
  V2V_EDIT_PLAN_REQUEST
} from '../OverviewConstants';
import overviewReducer, { initialState } from '../OverviewReducer';
import { transformationPlans } from '../overview.transformationPlans.fixtures';
import { cancelRequestResponse } from '../overview.cancelRequest.fixtures';
import { providers } from '../overview.providers.fixtures';
import { transformationMappings } from '../overview.transformationMappings.fixtures';
import { playbooks } from '../overview.playbooks.fixtures';
import { allRequestsWithTasks } from '../overview.requestWithTasks.fixtures';
import { planRequest } from '../overview.planRequest.fixtures';

const initialStateWithInfraMapping = Immutable({
  ...initialState,
  transformationMappings: [{ id: '1' }]
});

test('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = overviewReducer(undefined, action);
  expect(state).toMatchSnapshot();
});

describe('confirm modal actions', () => {
  test('show', () => {
    const action = { type: SHOW_CONFIRM_MODAL, payload: { mock: 'options' } };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      confirmModalOptions: { mock: 'options' },
      confirmModalVisible: true
    });
  });

  test('hide', () => {
    const action = { type: HIDE_CONFIRM_MODAL };
    const prevState = initialState.set('confirmModalVisible', true);
    const state = overviewReducer(prevState, action);
    expect(state).toEqual({
      ...prevState,
      confirmModalVisible: false
    });
  });
});

describe('plan wizard actions', () => {
  test('show in normal mode without a mapping id', () => {
    const action = { type: SHOW_PLAN_WIZARD };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      planWizardVisible: true,
      hidePlanWizard: false,
      planWizardId: null
    });
  });

  test('show in normal mode with a mapping id carried over', () => {
    const action = { type: SHOW_PLAN_WIZARD, payload: { id: '12345' } };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      planWizardVisible: true,
      hidePlanWizard: false,
      planWizardId: '12345'
    });
  });

  test('show in edit mode', () => {
    const action = { type: SHOW_PLAN_WIZARD_EDIT_MODE, editingPlanId: '12345' };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      planWizardVisible: true,
      hidePlanWizard: false,
      planWizardId: null,
      editingPlanId: '12345'
    });
  });

  test('hide', () => {
    const action = { type: HIDE_PLAN_WIZARD };
    const prevState = Immutable({
      ...initialState,
      hidePlanWizard: false,
      planWizardId: '12345',
      editingPlanId: '12345'
    });
    const state = overviewReducer(prevState, action);
    expect(state).toEqual({
      ...initialState,
      hidePlanWizard: true,
      planWizardId: null,
      editingPlanId: null
    });
  });

  test('exit', () => {
    const action = { type: PLAN_WIZARD_EXITED };
    const prevState = initialState.set('planWizardVisible', true);
    const state = overviewReducer(prevState, action);
    expect(state).toEqual({
      ...prevState,
      planWizardVisible: false
    });
  });
});

describe('edit plan title modal', () => {
  test('show', () => {
    const action = { type: SHOW_EDIT_PLAN_TITLE_MODAL, editingPlanId: '12345' };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      editingPlanId: '12345',
      editPlanNameModalVisible: true
    });
  });

  test('hide', () => {
    const action = { type: HIDE_EDIT_PLAN_TITLE_MODAL };
    const prevState = initialState.set('editingPlanId', '12345').set('editPlanNameModalVisible', true);
    const state = overviewReducer(prevState, action);
    expect(state).toEqual({
      ...initialState,
      editingPlanId: null,
      editPlanNameModalVisible: false
    });
  });
});

describe('fetching providers', () => {
  test('is pending', () => {
    const action = { type: `${FETCH_PROVIDERS}_PENDING` };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isFetchingProviders: true
    });
  });

  test('is successful with sufficient providers', () => {
    const payload = { data: providers };
    const action = {
      type: `${FETCH_PROVIDERS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingProviders: true,
      isRejectedProviders: true,
      errorProviders: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isFetchingProviders: false,
      isRejectedProviders: false,
      errorProviders: null,
      hasSufficientProviders: true
    });
  });

  test('is successful with insufficient providers', () => {
    const payload = { data: [{ type: 'unrelated' }, { type: 'stuff' }] };
    const action = {
      type: `${FETCH_PROVIDERS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingProviders: true,
      isRejectedProviders: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isFetchingProviders: false,
      isRejectedProviders: false,
      hasSufficientProviders: false
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_PROVIDERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingProviders: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedProviders: true,
      errorProviders: 'error'
    });
  });
});

describe('fetching transformation mappings', () => {
  test('is pending', () => {
    const action = { type: `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_PENDING` };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isFetchingTransformationMappings: true
    });
  });

  test('is successful with mappings', () => {
    const payload = { data: transformationMappings };
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingTransformationMappings: true,
      isRejectedTransformationMappings: true,
      isContinuingToPlan: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      transformationMappings: payload.data.resources,
      isRejectedTransformationMappings: false,
      isFetchingTransformationMappings: false,
      isContinuingToPlan: false
    });
  });

  test('is successful with no mappings', () => {
    const payload = { data: {} };
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingTransformationMappings: true,
      isRejectedTransformationMappings: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      transformationMappings: [],
      isRejectedTransformationMappings: false,
      isFetchingTransformationMappings: false
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingTransformationMappings: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedTransformationMappings: true,
      errorTransformationMappings: 'error'
    });
  });
});

describe('fetching transformation plans', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_PENDING`
    };
    const state = overviewReducer(initialStateWithInfraMapping, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      isFetchingTransformationPlans: true
    });
  });

  test('is successful', () => {
    const payload = {
      data: transformationPlans
    };
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialStateWithInfraMapping,
      isFetchingTransformationPlans: true,
      isRejectedTransformationPlans: true,
      errorTransformationPlans: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      transformationPlans: payload.data.resources
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TRANSFORMATION_PLANS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialStateWithInfraMapping,
      isFetchingTransformationPlans: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      isRejectedTransformationPlans: true,
      errorTransformationPlans: 'error'
    });
  });
});

describe('fetching archived transformation plans', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_PENDING`
    };
    const prevState = Immutable({
      ...initialStateWithInfraMapping,
      isRejectedArchivedTransformationPlans: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      isFetchingArchivedTransformationPlans: true
    });
  });

  test('is successful', () => {
    const payload = {
      data: transformationPlans
    };
    const action = {
      type: `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialStateWithInfraMapping,
      isFetchingArchivedTransformationPlans: true,
      isRejectedArchivedTransformationPlans: true,
      errorArchivedTransformationPlans: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      archivedTransformationPlans: payload.data.resources
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialStateWithInfraMapping,
      isFetchingArchivedTransformationPlans: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialStateWithInfraMapping,
      isRejectedArchivedTransformationPlans: true,
      errorArchivedTransformationPlans: 'error'
    });
  });
});

describe('fetching service template playbooks', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS}_PENDING`
    };
    const state = overviewReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isFetchingServiceTemplatePlaybooks: true
    });
  });

  test('is successful', () => {
    const payload = {
      data: playbooks
    };
    const action = {
      type: `${FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingServiceTemplatePlaybooks: true,
      isRejectedServiceTemplatePlaybooks: true,
      errorServiceTemplatePlaybooks: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      serviceTemplatePlaybooks: payload.data.resources
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingServiceTemplatePlaybooks: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedServiceTemplatePlaybooks: true,
      errorServiceTemplatePlaybooks: 'error'
    });
  });
});

describe('fetching plan requests with tasks', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_PENDING`
    };
    const state = overviewReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isFetchingAllRequestsWithTasks: true
    });
  });

  test('is successful', () => {
    const payload = {
      data: allRequestsWithTasks
    };
    const action = {
      type: `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingAllRequestsWithTasks: true,
      isRejectedAllRequestsWithTasks: true,
      errorAllRequestsWithTasks: 'error',
      requestsWithTasksPreviouslyFetched: false,
      reloadCard: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      allRequestsWithTasks: payload.data.results,
      requestsWithTasksPreviouslyFetched: true,
      planId: '',
      reloadCard: false
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingAllRequestsWithTasks: true,
      requestsWithTasksPreviouslyFetched: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedAllRequestsWithTasks: true,
      errorAllRequestsWithTasks: 'error'
    });
  });
});

describe('fetching archived plan requests with tasks', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_PENDING`
    };
    const prevState = Immutable({
      ...initialState,
      isRejectedAllArchivedPlanRequestsWithTasks: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isFetchingAllArchivedPlanRequestsWithTasks: true,
      isRejectedAllArchivedPlanRequestsWithTasks: false
    });
  });

  test('is successful', () => {
    const payload = {
      data: allRequestsWithTasks
    };
    const action = {
      type: `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingAllArchivedPlanRequestsWithTasks: true,
      isRejectedAllArchivedPlanRequestsWithTasks: true,
      errorAllArchivedPlanRequestsWithTasks: 'error',
      requestsWithTasksPreviouslyFetched: false
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      allArchivedPlanRequestsWithTasks: payload.data.results,
      requestsWithTasksPreviouslyFetched: true
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingAllArchivedPlanRequestsWithTasks: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedAllArchivedPlanRequestsWithTasks: true,
      errorAllArchivedPlanRequestsWithTasks: 'error'
    });
  });
});

describe('creating a transformation plan request', () => {
  test('is pending', () => {
    const payload = 'http://0.0.0.0:8080/api/service_templates/3';
    const action = {
      type: `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_PENDING`,
      payload
    };
    const state = overviewReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isCreatingTransformationPlanRequest: payload
    });
  });

  test('is successful', () => {
    const payload = {
      data: planRequest
    };
    const action = {
      type: `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isCreatingTransformationPlanRequest: '/mock/href',
      isRejectedCreateTranformationPlanRequest: true,
      errorCreateTransformationPlanRequest: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      createTransformationPlanRequestResponse: payload.data,
      isCreatingTransformationPlanRequest: null,
      isRejectedCreateTranformationPlanRequest: false,
      errorCreateTransformationPlanRequest: null
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${CREATE_V2V_TRANSFORMATION_PLAN_REQUEST}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isCreatingTransformationPlanRequest: '/mock/href'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedCreateTranformationPlanRequest: true,
      errorCreateTransformationPlanRequest: 'error'
    });
  });
});

test('continuing from mapping wizard to plan wizard', () => {
  const action = {
    type: CONTINUE_TO_PLAN,
    payload: { id: '12345' }
  };
  const state = overviewReducer(initialState, action);
  expect(state).toEqual({
    ...initialState,
    isContinuingToPlan: true,
    planWizardId: '12345'
  });
});

test('sets the active migration filter', () => {
  const activeFilter = 'foo';
  const action = {
    type: V2V_SET_MIGRATIONS_FILTER,
    payload: activeFilter
  };
  const state = overviewReducer(initialStateWithInfraMapping, action);

  expect(state.migrationsFilter).toBe(activeFilter);
});

test('retrying a migration', () => {
  const action = {
    type: V2V_RETRY_MIGRATION,
    payload: '12345'
  };
  const state = overviewReducer(initialState, action);
  expect(state).toEqual({
    ...initialState,
    planId: '12345',
    reloadCard: true
  });
});

describe('archiving a transformation plan', () => {
  test('is pending', () => {
    const action = {
      type: `${ARCHIVE_TRANSFORMATION_PLAN}_PENDING`
    };
    const prevState = Immutable({
      ...initialState,
      isRejectedArchivingTransformationPlan: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isArchivingTransformationPlan: true,
      isRejectedArchivingTransformationPlan: false
    });
  });

  test('is successful', () => {
    const payload = {
      data: { success: true, message: 'Archived Service Template' }
    };
    const action = {
      type: `${ARCHIVE_TRANSFORMATION_PLAN}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isArchivingTransformationPlan: true,
      isRejectedArchivingTransformationPlan: true,
      errorArchivingTransformationPlan: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual(initialState);
  });

  test('is rejected', () => {
    const action = {
      type: `${ARCHIVE_TRANSFORMATION_PLAN}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isArchivingTransformationPlan: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedArchivingTransformationPlan: true,
      errorArchivingTransformationPlan: 'error'
    });
  });
});

describe('schedule migration modal', () => {
  test('toggle on with plan', () => {
    const payload = {
      plan: { mock: 'data' }
    };
    const action = {
      type: V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL,
      payload
    };
    const state = overviewReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      scheduleMigrationPlan: payload.plan,
      scheduleMigrationModal: true
    });
  });

  test('toggle off without plan', () => {
    const action = {
      type: V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL
    };
    const prevState = Immutable({
      ...initialState,
      scheduleMigrationModal: true,
      scheduleMigrationPlan: { mock: 'data' }
    });
    const state = overviewReducer(prevState, action);
    expect(state).toEqual({
      ...initialState,
      scheduleMigrationPlan: null
    });
  });
});

describe('scheduling a migration', () => {
  test('is pending', () => {
    const action = {
      type: `${V2V_SCHEDULE_MIGRATION}_PENDING`
    };
    const prevState = Immutable({
      ...initialState,
      isRejectedSchedulingMigration: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isSchedulingMigration: true,
      isRejectedSchedulingMigration: false
    });
  });

  test('is successful', () => {
    const action = {
      type: `${V2V_SCHEDULE_MIGRATION}_FULFILLED`,
      payload: { mock: 'data' }
    };
    const prevState = Immutable({
      ...initialState,
      isSchedulingMigration: true,
      isRejectedSchedulingMigration: true,
      errorSchedulingMigration: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      errorSchedulingMigration: null
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${V2V_SCHEDULE_MIGRATION}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isSchedulingMigration: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedSchedulingMigration: true,
      errorSchedulingMigration: 'error'
    });
  });
});

test('auto set migration filter', () => {
  const action = {
    type: V2V_AUTO_SET_MIGRATIONS_FILTER
  };
  const state = overviewReducer(initialState, action);
  expect(state).toEqual({
    ...initialState,
    initialMigrationsFilterSet: true
  });
});

describe('editing a plan request', () => {
  test('is pending', () => {
    const action = {
      type: `${V2V_EDIT_PLAN_REQUEST}_PENDING`
    };
    const prevState = Immutable({
      ...initialState,
      isRejectedEditingPlanRequest: true,
      errorEditingPlanRequest: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isEditingPlanRequest: true,
      isRejectedEditingPlanRequest: false
    });
  });

  test('is successful', () => {
    const action = {
      type: `${V2V_EDIT_PLAN_REQUEST}_FULFILLED`,
      payload: { mock: 'data' }
    };
    const prevState = Immutable({
      ...initialState,
      isEditingPlanRequest: true,
      isRejectedEditingPlanRequest: true,
      errorEditingPlanRequest: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      errorEditingPlanRequest: null
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${V2V_EDIT_PLAN_REQUEST}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isEditingPlanRequest: true
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedEditingPlanRequest: true,
      errorEditingPlanRequest: 'error'
    });
  });
});

describe('cancelling a request', () => {
  const url = '/api/requests/1';

  test('is pending', () => {
    const action = {
      type: `${V2V_CANCEL_PLAN_REQUEST}_PENDING`,
      payload: url
    };

    const state = overviewReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isCancellingPlanRequest: true,
      requestsProcessingCancellation: [url]
    });
  });

  test('is successful', () => {
    const payload = {
      data: cancelRequestResponse
    };
    const action = {
      type: `${V2V_CANCEL_PLAN_REQUEST}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isCancellingPlanRequest: true,
      isRejectedCancelPlanRequest: true,
      errorCancelPlanRequest: 'error'
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual(initialState);
  });

  test('is rejected', () => {
    const action = {
      type: `${V2V_CANCEL_PLAN_REQUEST}_REJECTED`,
      payload: 'error',
      meta: { url }
    };
    const prevState = Immutable({
      ...initialState,
      isCancellingPlanRequest: true,
      requestsProcessingCancellation: [url]
    });
    const state = overviewReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedCancelPlanRequest: true,
      errorCancelPlanRequest: 'error',
      requestsProcessingCancellation: []
    });
  });
});
