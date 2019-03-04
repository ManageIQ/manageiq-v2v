import Immutable from 'seamless-immutable';

import {
  V2V_FETCH_SERVERS,
  V2V_FETCH_SETTINGS,
  V2V_PATCH_SETTINGS,
  FETCH_V2V_CONVERSION_HOSTS,
  SHOW_V2V_CONVERSION_HOST_WIZARD,
  HIDE_V2V_CONVERSION_HOST_WIZARD,
  V2V_CONVERSION_HOST_WIZARD_EXITED,
  POST_V2V_CONVERSION_HOSTS,
  SET_V2V_CONVERSION_HOST_TO_DELETE,
  SHOW_V2V_CONVERSION_HOST_DELETE_MODAL,
  HIDE_V2V_CONVERSION_HOST_DELETE_MODAL,
  DELETE_V2V_CONVERSION_HOST
} from './SettingsConstants';

import { getFormValuesFromApiSettings } from './helpers';

export const initialState = Immutable({
  conversionHosts: [],
  conversionHostToDelete: null,
  conversionHostWizardMounted: false,
  conversionHostWizardVisible: false,
  errorDeleteConversionHost: false,
  errorFetchingConversionHosts: null,
  errorFetchingServers: null,
  errorFetchingSettings: null,
  errorPostingConversionHosts: null,
  errorSavingSettings: null,
  fetchingServersRejected: false,
  fetchingSettingsRejected: false,
  isDeletingConversionHost: false,
  isFetchingConversionHosts: false,
  isFetchingServers: false,
  isFetchingSettings: false,
  isPostingConversionHosts: false,
  isRejectedDeletingConversionHost: false,
  isRejectedFetchingConversionHosts: false,
  isRejectedPostingConversionHosts: false,
  isSavingSettings: false,
  postConversionHostsResults: [],
  savedSettings: {},
  savingSettingsRejected: false,
  servers: [],
  showConversionHostDeleteModal: false
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
        .set('showConversionHostDeleteModal', false)
        .set('errorFetchingConversionHosts', null);
    case `${FETCH_V2V_CONVERSION_HOSTS}_REJECTED`:
      return state
        .set('isFetchingConversionHosts', false)
        .set('isRejectedFetchingConversionHosts', true)
        .set('showConversionHostDeleteModal', false)
        .set('errorFetchingConversionHosts', action.payload);

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
      return state.set('showConversionHostDeleteModal', true);
    case HIDE_V2V_CONVERSION_HOST_DELETE_MODAL:
      return state.set('showConversionHostDeleteModal', false);

    case `${DELETE_V2V_CONVERSION_HOST}_PENDING`:
      return state.set('isDeletingConversionHost', action.payload);
    case `${DELETE_V2V_CONVERSION_HOST}_FULFILLED`:
      return state
        .set('deleteConversionHostResponse', action.payload.data)
        .set('isDeletingConversionHost', null)
        .set('isRejectedDeletingConversionHost', false)
        .set('errorDeleteConversionHost', null);
    case `${DELETE_V2V_CONVERSION_HOST}_REJECTED`:
      return state
        .set('errorDeleteConversionHost', action.payload)
        .set('isRejectedDeletingConversionHost', true)
        .set('isDeletingConversionHost', null);

    default:
      return state;
  }
};
