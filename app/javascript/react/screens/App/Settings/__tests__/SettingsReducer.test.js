import settingsReducer, { initialState } from '../SettingsReducer';
import {
  V2V_FETCH_SERVERS,
  V2V_FETCH_SETTINGS,
  V2V_PATCH_SETTINGS,
  FETCH_V2V_CONVERSION_HOSTS,
  SHOW_V2V_CONVERSION_HOST_WIZARD,
  HIDE_V2V_CONVERSION_HOST_WIZARD
} from '../SettingsConstants';
import { servers, settings } from '../settings.fixures';

it('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = settingsReducer(undefined, action);
  expect(state).toMatchSnapshot();
});

describe('fetching servers', () => {
  it('is pending', () => {
    const action = {
      type: `${V2V_FETCH_SERVERS}_PENDING`
    };
    const prevState = initialState.set('fetchingServersRejected', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${V2V_FETCH_SERVERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingServers', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${V2V_FETCH_SERVERS}_FULFILLED`,
      payload: { data: servers }
    };
    const prevState = initialState.set('fetchingServersRejected', true).set('isFetchingServers', true);
    const state = settingsReducer(prevState, action);
    expect(state.fetchingServersRejected).toBe(false);
    expect(state.isFetchingServers).toBe(false);
    expect(state.servers).toHaveLength(2);
  });
});

describe('fetching settings', () => {
  it('is pending', () => {
    const action = {
      type: `${V2V_FETCH_SETTINGS}_PENDING`
    };
    const prevState = initialState.set('fetchingSettingsRejected', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${V2V_FETCH_SETTINGS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${V2V_FETCH_SETTINGS}_FULFILLED`,
      payload: { data: settings }
    };
    const prevState = initialState.set('fetchingSettingsRejected', true).set('isFetchingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('saving settings', () => {
  it('is pending', () => {
    const action = {
      type: `${V2V_PATCH_SETTINGS}_PENDING`
    };
    const prevState = initialState.set('savingSettingsRejected', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${V2V_PATCH_SETTINGS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isSavingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${V2V_PATCH_SETTINGS}_FULFILLED`,
      payload: settings
    };
    const prevState = initialState.set('savingSettingsRejected', true).set('isSavingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('fetching conversion hosts', () => {
  it('is pending', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOSTS}_PENDING`
    };
    const prevState = initialState.set('isRejectedConversionHosts', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOSTS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingConversionHosts', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOSTS}_FULFILLED`,
      payload: { data: { resources: [{ mock: 'conversionHost' }] } }
    };
    const prevState = initialState.set('isRejectedConversionHosts', true).set('isFetchingConversionHosts', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('showing and hiding the conversion host wizard', () => {
  it('shows', () => {
    const action = { type: SHOW_V2V_CONVERSION_HOST_WIZARD };
    const state = settingsReducer(initialState, action);
    expect(state.conversionHostWizardVisible).toBeTruthy();
  });

  it('hides', () => {
    const action = { type: HIDE_V2V_CONVERSION_HOST_WIZARD };
    const prevState = initialState.set('conversionHostWizardVisible', true);
    const state = settingsReducer(prevState, action);
    expect(state.conversionHostWizardVisible).toBeFalsy();
  });
});
