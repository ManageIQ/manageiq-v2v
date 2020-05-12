import Immutable from 'seamless-immutable';

import {
  V2V_FETCH_SERVERS,
  V2V_FETCH_SETTINGS,
  V2V_PATCH_SETTINGS,
  FETCH_V2V_CONVERSION_HOSTS,
  FETCH_V2V_CONVERSION_HOST_TASKS,
  FETCH_V2V_ACTIVE_MIGRATION_TASKS,
  SHOW_V2V_CONVERSION_HOST_WIZARD,
  HIDE_V2V_CONVERSION_HOST_WIZARD,
  V2V_CONVERSION_HOST_WIZARD_EXITED,
  POST_V2V_CONVERSION_HOSTS,
  SET_V2V_CONVERSION_HOST_TO_DELETE,
  SHOW_V2V_CONVERSION_HOST_DELETE_MODAL,
  HIDE_V2V_CONVERSION_HOST_DELETE_MODAL,
  DELETE_V2V_CONVERSION_HOST,
  SET_V2V_CONVERSION_HOST_TASK_TO_RETRY,
  SHOW_V2V_CONVERSION_HOST_RETRY_MODAL,
  HIDE_V2V_CONVERSION_HOST_RETRY_MODAL,
  V2V_CONVERSION_HOST_RETRY_MODAL_EXITED
} from './SettingsConstants';

import {
  getFormValuesFromApiSettings,
  parseConversionHostTasksMetadata,
  indexConversionHostTasksByResource,
  getActiveConversionHostIds
} from './helpers';

export const initialState = Immutable({
  conversionHosts: [],
  conversionHostTasks: [],
  conversionHostTasksByResource: {},
  activeMigrationTasks: [],
  activeConversionHostIds: [],
  conversionHostToDelete: null,
  conversionHostDeleteModalVisible: false,
  conversionHostRetryModalMounted: false,
  conversionHostRetryModalVisible: false,
  conversionHostTaskToRetry: null,
  conversionHostWizardMounted: false,
  conversionHostWizardVisible: false,
  errorDeleteConversionHost: false,
  errorFetchingConversionHosts: null,
  errorFetchingConversionHostTasks: null,
  errorFetchingActiveMigrationTasks: null,
  errorFetchingServers: null,
  errorFetchingSettings: null,
  errorPostingConversionHosts: null,
  errorSavingSettings: null,
  fetchingServersRejected: false,
  fetchingSettingsRejected: false,
  isDeletingConversionHost: false,
  isFetchingConversionHosts: false,
  isFetchingConversionHostTasks: false,
  isFetchingActiveMigrationTasks: false,
  isFetchingServers: false,
  isFetchingSettings: false,
  isPostingConversionHosts: false,
  isRejectedDeletingConversionHost: false,
  isRejectedFetchingConversionHosts: false,
  isRejectedFetchingConversionHostTasks: false,
  isRejectedFetchingActiveMigrationTasks: false,
  isRejectedPostingConversionHosts: false,
  isSavingSettings: false,
  postConversionHostsResults: [],
  savedSettings: {},
  savingSettingsRejected: false,
  servers: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${V2V_FETCH_SERVERS}_PENDING`:
      return state
        .set('isFetchingServers', true)
        .set('fetchingServersRejected', false)
        .set('errorFetchingServers', null);
    case `${V2V_FETCH_SERVERS}_REJECTED`:
      return state
        .set('isFetchingServers', false)
        .set('fetchingServersRejected', true)
        .set('errorFetchingServers', action.payload);
    case `${V2V_FETCH_SERVERS}_FULFILLED`:
      return state
        .set('isFetchingServers', false)
        .set('fetchingServersRejected', false)
        .set('errorFetchingServers', null)
        .set('servers', action.payload.data.resources);

    case `${V2V_FETCH_SETTINGS}_PENDING`:
      return state
        .set('isFetchingSettings', true)
        .set('fetchingSettingsRejected', false)
        .set('errorFetchingSettings', null);
    case `${V2V_FETCH_SETTINGS}_REJECTED`:
      return state
        .set('isFetchingSettings', false)
        .set('fetchingSettingsRejected', true)
        .set('errorFetchingSettings', action.payload);
    case `${V2V_FETCH_SETTINGS}_FULFILLED`:
      return state
        .set('isFetchingSettings', false)
        .set('fetchingSettingsRejected', false)
        .set('errorFetchingSettings', null)
        .set('savedSettings', getFormValuesFromApiSettings(action.payload.data));

    case `${V2V_PATCH_SETTINGS}_PENDING`:
      return state
        .set('isSavingSettings', true)
        .set('savingSettingsRejected', false)
        .set('errorSavingSettings', null);
    case `${V2V_PATCH_SETTINGS}_REJECTED`:
      return state
        .set('isSavingSettings', false)
        .set('savingSettingsRejected', true)
        .set('errorSavingSettings', action.payload);
    case `${V2V_PATCH_SETTINGS}_FULFILLED`:
      return state
        .set('isSavingSettings', false)
        .set('savingSettingsRejected', false)
        .set('errorSavingSettings', null)
        .set('savedSettings', getFormValuesFromApiSettings(action.payload));

    case `${FETCH_V2V_CONVERSION_HOSTS}_PENDING`:
      return state
        .set('isFetchingConversionHosts', true)
        .set('isRejectedFetchingConversionHosts', false)
        .set('errorFetchingConversionHosts', null);
    case `${FETCH_V2V_CONVERSION_HOSTS}_FULFILLED`:
      return state
        .set('conversionHosts', action.payload.data.resources)
        .set('isFetchingConversionHosts', false)
        .set('isRejectedFetchingConversionHosts', false)
        .set('errorFetchingConversionHosts', null);
    case `${FETCH_V2V_CONVERSION_HOSTS}_REJECTED`:
      return state
        .set('isFetchingConversionHosts', false)
        .set('isRejectedFetchingConversionHosts', true)
        .set('errorFetchingConversionHosts', action.payload);

    case `${FETCH_V2V_CONVERSION_HOST_TASKS}_PENDING`:
      return state
        .set('isFetchingConversionHostTasks', true)
        .set('isRejectedFetchingConversionHostTasks', false)
        .set('errorFetchingConversionHostTasks', null);
    case `${FETCH_V2V_CONVERSION_HOST_TASKS}_FULFILLED`: {
      const tasksWithMetadata = parseConversionHostTasksMetadata(action.payload.data.resources);
      const tasksByResource = indexConversionHostTasksByResource(tasksWithMetadata);
      return state
        .set('conversionHostTasks', tasksWithMetadata)
        .set('conversionHostTasksByResource', tasksByResource)
        .set('isFetchingConversionHostTasks', false)
        .set('isRejectedFetchingConversionHostTasks', false)
        .set('errorFetchingConversionHostTasks', null);
    }
    case `${FETCH_V2V_CONVERSION_HOST_TASKS}_REJECTED`:
      return state
        .set('isFetchingConversionHostTasks', false)
        .set('isRejectedFetchingConversionHostTasks', true)
        .set('errorFetchingConversionHostTasks', action.payload);

    case `${FETCH_V2V_ACTIVE_MIGRATION_TASKS}_PENDING`:
      return state
        .set('isFetchingActiveMigrationTasks', true)
        .set('isRejectedFetchingActiveMigrationTasks', false)
        .set('errorFetchingActiveMigrationTasks', null);
    case `${FETCH_V2V_ACTIVE_MIGRATION_TASKS}_FULFILLED`: {
      return state
        .set('activeMigrationTasks', action.payload.data.resources)
        .set('activeConversionHostIds', getActiveConversionHostIds(action.payload.data.resources))
        .set('isFetchingActiveMigrationTasks', false)
        .set('isRejectedFetchingActiveMigrationTasks', false)
        .set('errorFetchingActiveMigrationTasks', null);
    }
    case `${FETCH_V2V_ACTIVE_MIGRATION_TASKS}_REJECTED`:
      return state
        .set('isFetchingActiveMigrationTasks', false)
        .set('isRejectedFetchingActiveMigrationTasks', true)
        .set('errorFetchingActiveMigrationTasks', action.payload);

    case SHOW_V2V_CONVERSION_HOST_WIZARD:
      return state.set('conversionHostWizardMounted', true).set('conversionHostWizardVisible', true);
    case HIDE_V2V_CONVERSION_HOST_WIZARD:
      return state.set('conversionHostWizardVisible', false);
    case V2V_CONVERSION_HOST_WIZARD_EXITED:
      return state.set('conversionHostWizardMounted', false);

    case `${POST_V2V_CONVERSION_HOSTS}_PENDING`:
      return state
        .set('isPostingConversionHosts', true)
        .set('isRejectedPostingConversionHosts', false)
        .set('errorPostingConversionHosts', false);
    case `${POST_V2V_CONVERSION_HOSTS}_FULFILLED`:
      return state
        .set('isPostingConversionHosts', false)
        .set('isRejectedPostingConversionHosts', false)
        .set('errorPostingConversionHosts', null)
        .set('postConversionHostsResults', action.payload);
    case `${POST_V2V_CONVERSION_HOSTS}_REJECTED`:
      return state
        .set('isPostingConversionHosts', false)
        .set('isRejectedPostingConversionHosts', true)
        .set('errorPostingConversionHosts', action.payload);
    case SET_V2V_CONVERSION_HOST_TO_DELETE:
      return state.set('conversionHostToDelete', action.payload);
    case SHOW_V2V_CONVERSION_HOST_DELETE_MODAL:
      return state.set('conversionHostDeleteModalVisible', true);
    case HIDE_V2V_CONVERSION_HOST_DELETE_MODAL:
      return state.set('conversionHostDeleteModalVisible', false);

    case `${DELETE_V2V_CONVERSION_HOST}_PENDING`:
      return state.set('isDeletingConversionHost', true);
    case `${DELETE_V2V_CONVERSION_HOST}_FULFILLED`:
      return state
        .set('deleteConversionHostResponse', action.payload.data)
        .set('isDeletingConversionHost', false)
        .set('isRejectedDeletingConversionHost', false)
        .set('errorDeleteConversionHost', null)
        .set('conversionHostDeleteModalVisible', false);
    case `${DELETE_V2V_CONVERSION_HOST}_REJECTED`:
      return state
        .set('errorDeleteConversionHost', action.payload)
        .set('isRejectedDeletingConversionHost', true)
        .set('isDeletingConversionHost', false)
        .set('conversionHostDeleteModalVisible', false);

    case SET_V2V_CONVERSION_HOST_TASK_TO_RETRY:
      return state.set('conversionHostTaskToRetry', action.payload);
    case SHOW_V2V_CONVERSION_HOST_RETRY_MODAL:
      return state.set('conversionHostRetryModalMounted', true).set('conversionHostRetryModalVisible', true);
    case HIDE_V2V_CONVERSION_HOST_RETRY_MODAL:
      return state.set('conversionHostRetryModalVisible', false);
    case V2V_CONVERSION_HOST_RETRY_MODAL_EXITED:
      return state.set('conversionHostRetryModalMounted', false);

    default:
      return state;
  }
};
