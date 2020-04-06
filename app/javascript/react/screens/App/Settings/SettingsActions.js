import { reset } from 'redux-form';
import { saveAs } from 'file-saver';
import URI from 'urijs';
import API from '../../../../common/API';

import {
  V2V_FETCH_SERVERS,
  V2V_FETCH_SETTINGS,
  V2V_PATCH_SETTINGS,
  FETCH_V2V_CONVERSION_HOSTS,
  FETCH_V2V_CONVERSION_HOST_TASKS,
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
import { getApiSettingsFromFormValues } from './helpers';
import { stepIDs } from './screens/ConversionHostsSettings/components/ConversionHostWizard/ConversionHostWizardConstants';
import { V2V_NOTIFICATION_ADD } from '../common/NotificationList/NotificationConstants';

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

const _getConversionHostTasksActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CONVERSION_HOST_TASKS,
    payload: API.get(url)
  });

export const fetchConversionHostTasksAction = url => {
  const uri = new URI(url);
  return _getConversionHostTasksActionCreator(uri.toString());
};

export const showConversionHostWizardAction = () => dispatch => dispatch({ type: SHOW_V2V_CONVERSION_HOST_WIZARD });

export const hideConversionHostWizardAction = () => dispatch => dispatch({ type: HIDE_V2V_CONVERSION_HOST_WIZARD });

export const conversionHostWizardExitedAction = () => dispatch => {
  dispatch({ type: V2V_CONVERSION_HOST_WIZARD_EXITED });
  // Dispatch reset for all the wizard step forms here
  Object.values(stepIDs).forEach(formName => {
    dispatch(reset(formName));
  });
};

const _postConversionHostsActionCreator = (url, postBodies) => dispatch =>
  dispatch({
    type: POST_V2V_CONVERSION_HOSTS,
    payload: Promise.all(postBodies.map(body => API.post(url, body)))
  });

export const postConversionHostsAction = (url, postBodies) =>
  _postConversionHostsActionCreator(new URI(url).toString(), postBodies);

export const setHostToDeleteAction = hostOrTask => ({
  type: SET_V2V_CONVERSION_HOST_TO_DELETE,
  payload: hostOrTask
});

export const showConversionHostDeleteModalAction = () => ({
  type: SHOW_V2V_CONVERSION_HOST_DELETE_MODAL
});

export const hideConversionHostDeleteModalAction = () => ({
  type: HIDE_V2V_CONVERSION_HOST_DELETE_MODAL
});

export const _deleteConversionHostActionCreator = (url, host) => dispatch =>
  dispatch({
    type: DELETE_V2V_CONVERSION_HOST,
    payload: new Promise((resolve, reject) => {
      API.post(`${url}/${host.id}`, {
        action: 'delete'
      })
        .then(response => {
          resolve(response);
        })
        .catch(e => reject(e));
    })
  });

export const deleteConversionHostAction = (url, host) =>
  _deleteConversionHostActionCreator(new URI(url).toString(), host);

export const setConversionHostTaskToRetryAction = task => ({
  type: SET_V2V_CONVERSION_HOST_TASK_TO_RETRY,
  payload: task
});

export const showConversionHostRetryModalAction = () => ({
  type: SHOW_V2V_CONVERSION_HOST_RETRY_MODAL
});

export const hideConversionHostRetryModalAction = () => ({
  type: HIDE_V2V_CONVERSION_HOST_RETRY_MODAL
});

export const conversionHostRetryModalExitedAction = () => ({
  type: V2V_CONVERSION_HOST_RETRY_MODAL_EXITED
});

export const saveTextFileAction = ({ fileName, fileBody }) => dispatch => {
  saveAs(new File([fileBody], fileName, { type: 'text/plain;charset=utf-8' }));
  dispatch({
    type: V2V_NOTIFICATION_ADD,
    message: sprintf(__('"%s" download successful'), fileName),
    notificationType: 'success',
    actionEnabled: false
  });
};
