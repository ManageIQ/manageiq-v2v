import URI from 'urijs';
// import API from '../../../../common/API';

import { V2V_FETCH_SETTINGS } from './SettingsConstants';

const _getSettingsActionCreator = url => dispatch =>
  dispatch({
    type: V2V_FETCH_SETTINGS,
    // payload: API.get(url)
    // TODO replace this dummy payload with actual settings from API
    payload: new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            maxMigrationsPerHost: 10
          }),
        2000
      );
    })
  });

export const fetchSettingsAction = url => {
  const uri = new URI(url);
  return _getSettingsActionCreator(uri.toString());
};
