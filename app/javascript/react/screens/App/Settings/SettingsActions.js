import URI from 'urijs';
import API from '../../../../common/API';

import { V2V_FETCH_SETTINGS } from './SettingsConstants';

const _getSettingsActionCreator = url => dispatch =>
  dispatch({
    type: V2V_FETCH_SETTINGS,
    // payload: API.get(url)
    payload: Promise.resolve({ someSettings: 'TODO' })
  });

export const fetchSettingsAction = url => {
  const uri = new URI(url);
  return _getSettingsActionCreator(uri.toString());
};
