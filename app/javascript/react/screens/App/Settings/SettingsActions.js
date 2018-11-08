import URI from 'urijs';
import API from '../../../../common/API';

import { V2V_FETCH_SETTINGS, V2V_PATCH_SETTINGS } from './SettingsConstants';
import { getApiSettingsFromFormValues } from './helpers';

const _getSettingsActionCreator = url => dispatch =>
  dispatch({
    type: V2V_FETCH_SETTINGS,
    payload: API.get(url)
  });

export const fetchSettingsAction = url => {
  const uri = new URI(url);
  return _getSettingsActionCreator(uri.toString());
};

const _patchSettingsActionCreator = (url, settingsFormValues) => dispatch =>
  dispatch({
    type: V2V_PATCH_SETTINGS,
    payload: API.patch(url, getApiSettingsFromFormValues(settingsFormValues))
  });

export const patchSettingsAction = (url, newSettings) => {
  const uri = new URI(url);
  return _patchSettingsActionCreator(uri.toString(), newSettings);
};
