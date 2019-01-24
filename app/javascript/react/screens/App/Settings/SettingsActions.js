import URI from 'urijs';
import API from '../../../../common/API';

import {
  V2V_FETCH_SERVERS,
  V2V_FETCH_SETTINGS,
  V2V_PATCH_SETTINGS,
  FETCH_V2V_CONVERSION_HOSTS,
  SHOW_V2V_CONVERSION_HOST_WIZARD,
  HIDE_V2V_CONVERSION_HOST_WIZARD
} from './SettingsConstants';
import { getApiSettingsFromFormValues } from './helpers';

const _getServersActionCreator = url => dispatch =>
  dispatch({
    type: V2V_FETCH_SERVERS,
    payload: API.get(url)
  });

export const fetchServersAction = url => {
  const uri = new URI(url);
  return _getServersActionCreator(uri.toString());
};

const _getSettingsActionCreator = url => dispatch =>
  dispatch({
    type: V2V_FETCH_SETTINGS,
    payload: API.get(url)
  });

export const fetchSettingsAction = url => {
  const uri = new URI(url);
  return _getSettingsActionCreator(uri.toString());
};

const _patchSettingsActionCreator = (urls, settingsFormValues) => dispatch => {
  const patchBody = getApiSettingsFromFormValues(settingsFormValues);
  return dispatch({
    type: V2V_PATCH_SETTINGS,
    payload: new Promise((resolve, reject) => {
      Promise.all(urls.map(url => API.patch(url, patchBody)))
        .then(payloads => resolve(payloads[0]))
        .catch(e => reject(e));
    })
  });
};

export const patchSettingsAction = (servers, newSettings) => {
  const settingsUrls = servers.map(server => new URI(`${server.href}/settings`).toString());
  return _patchSettingsActionCreator(settingsUrls, newSettings);
};

const _getConversionHostsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CONVERSION_HOSTS,
    payload: API.get(url)
  });

export const fetchConversionHostsAction = url => {
  const uri = new URI(url);
  return _getConversionHostsActionCreator(uri.toString());
};

export const showConversionHostWizard = () => dispatch => dispatch({ type: SHOW_V2V_CONVERSION_HOST_WIZARD });

export const hideConversionHostWizard = () => dispatch => dispatch({ type: HIDE_V2V_CONVERSION_HOST_WIZARD });
