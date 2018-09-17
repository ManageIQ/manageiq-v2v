import Immutable from 'seamless-immutable';

import { V2V_FETCH_SETTINGS, V2V_POST_SETTINGS } from './SettingsConstants';

export const initialState = Immutable({
  isFetchingSettings: false,
  fetchingSettingsRejected: false,
  errorFetchingSettings: null,
  savedSettings: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
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
        .set('savedSettings', action.payload);

    case V2V_POST_SETTINGS:
      return state; // TODO

    default:
      return state;
  }
};
