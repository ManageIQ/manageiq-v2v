import Immutable from 'seamless-immutable';

import {
  V2V_FETCH_SERVERS,
  V2V_FETCH_SETTINGS,
  V2V_PATCH_SETTINGS,
  FETCH_V2V_CONVERSION_HOSTS,
  SHOW_V2V_CONVERSION_HOST_WIZARD,
  HIDE_V2V_CONVERSION_HOST_WIZARD,
  V2V_CONVERSION_HOST_WIZARD_EXITED,
  FETCH_V2V_TARGET_COMPUTE_RESOURCES
} from './SettingsConstants';

import { getFormValuesFromApiSettings } from './helpers';

export const initialState = Immutable({
  isFetchingServers: false,
  fetchingServersRejected: false,
  errorFetchingServers: null,
  servers: [],
  isFetchingSettings: false,
  fetchingSettingsRejected: false,
  errorFetchingSettings: null,
  savedSettings: {},
  isSavingSettings: false,
  savingSettingsRejected: false,
  errorSavingSettings: null,
  isFetchingConversionHosts: false,
  isRejectedConversionHosts: false,
  errorFetchingConversionHosts: null,
  conversionHosts: [],
  conversionHostWizardMounted: false,
  conversionHostWizardVisible: false,
  isFetchingTargetComputeResources: false,
  isRejectedTargetComputeResources: false,
  errorFetchingTargetComputeResources: null,
  targetComputeResources: []
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
        .set('isRejectedConversionHosts', false)
        .set('errorFetchingConversionHosts', null);
    case `${FETCH_V2V_CONVERSION_HOSTS}_FULFILLED`:
      return state
        .set('conversionHosts', action.payload.data.resources)
        .set('isFetchingConversionHosts', false)
        .set('isRejectedConversionHosts', false)
        .set('errorFetchingConversionHosts', null);
    case `${FETCH_V2V_CONVERSION_HOSTS}_REJECTED`:
      return state
        .set('isFetchingConversionHosts', false)
        .set('isRejectedConversionHosts', true)
        .set('errorFetchingConversionHosts', action.payload);

    case SHOW_V2V_CONVERSION_HOST_WIZARD:
      return state.set('conversionHostWizardMounted', true).set('conversionHostWizardVisible', true);
    case HIDE_V2V_CONVERSION_HOST_WIZARD:
      return state.set('conversionHostWizardVisible', false);
    case V2V_CONVERSION_HOST_WIZARD_EXITED:
      return state.set('conversionHostWizardMounted', false);

    case `${FETCH_V2V_TARGET_COMPUTE_RESOURCES}_PENDING`:
      return state
        .set('isFetchingTargetComputeResources', true)
        .set('isRejectedTargetComputeResources', false)
        .set('errorFetchingTargetComputeResources', null);
    case `${FETCH_V2V_TARGET_COMPUTE_RESOURCES}_FULFILLED`:
      return state
        .set('targetComputeResources', action.payload.data.resources)
        .set('isFetchingTargetComputeResources', false)
        .set('isRejectedTargetComputeResources', false)
        .set('errorFetchingTargetComputeResources', null);
    case `${FETCH_V2V_TARGET_COMPUTE_RESOURCES}_REJECTED`:
      return state
        .set('isFetchingTargetComputeResources', false)
        .set('isRejectedTargetComputeResources', true)
        .set('errorFetchingTargetComputeResources', action.payload);

    default:
      return state;
  }
};
