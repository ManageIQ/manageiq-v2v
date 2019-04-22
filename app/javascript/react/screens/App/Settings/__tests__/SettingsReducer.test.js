import settingsReducer, { initialState } from '../SettingsReducer';
import {
  V2V_FETCH_SERVERS,
  V2V_FETCH_SETTINGS,
  V2V_PATCH_SETTINGS,
  FETCH_V2V_CONVERSION_HOSTS,
  SHOW_V2V_CONVERSION_HOST_WIZARD,
  HIDE_V2V_CONVERSION_HOST_WIZARD,
  FETCH_V2V_CONVERSION_HOST_TASKS,
  V2V_CONVERSION_HOST_WIZARD_EXITED,
  POST_V2V_CONVERSION_HOSTS,
  DELETE_V2V_CONVERSION_HOST,
  SET_V2V_CONVERSION_HOST_TO_DELETE,
  SHOW_V2V_CONVERSION_HOST_DELETE_MODAL,
  HIDE_V2V_CONVERSION_HOST_DELETE_MODAL,
  SET_V2V_CONVERSION_HOST_TASK_TO_RETRY,
  SHOW_V2V_CONVERSION_HOST_RETRY_MODAL,
  HIDE_V2V_CONVERSION_HOST_RETRY_MODAL,
  V2V_CONVERSION_HOST_RETRY_MODAL_EXITED
} from '../SettingsConstants';
import { servers, settings, exampleConversionHostTasks } from '../settings.fixtures';

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
    const prevState = initialState.set('isRejectedFetchingConversionHosts', true);
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
    const prevState = initialState
      .set('isRejectedFetchingConversionHosts', true)
      .set('isFetchingConversionHosts', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('fetching conversion host tasks', () => {
  it('is pending', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOST_TASKS}_PENDING`
    };
    const prevState = initialState.set('isRejectedFetchingConversionHostTasks', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOST_TASKS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingConversionHostTasks', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOST_TASKS}_FULFILLED`,
      payload: { data: { resources: [exampleConversionHostTasks[0]] } }
    };
    const prevState = initialState
      .set('isRejectedFetchingConversionHostTasks', true)
      .set('isFetchingConversionHostTasks', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('showing and hiding the conversion host wizard', () => {
  it('shows', () => {
    const action = { type: SHOW_V2V_CONVERSION_HOST_WIZARD };
    const state = settingsReducer(initialState, action);
    expect(state.conversionHostWizardVisible).toBeTruthy();
    expect(state.conversionHostWizardMounted).toBeTruthy();
  });

  it('hides', () => {
    const action = { type: HIDE_V2V_CONVERSION_HOST_WIZARD };
    const prevState = initialState.set('conversionHostWizardVisible', true).set('conversionHostWizardMounted', true);
    const state = settingsReducer(prevState, action);
    expect(state.conversionHostWizardVisible).toBeFalsy();
    expect(state.conversionHostWizardMounted).toBeTruthy();
  });

  it('exits', () => {
    const action = { type: V2V_CONVERSION_HOST_WIZARD_EXITED };
    const prevState = initialState.set('conversionHostWizardVisible', false).set('conversionHostWizardMounted', true);
    const state = settingsReducer(prevState, action);
    expect(state.conversionHostWizardVisible).toBeFalsy();
    expect(state.conversionHostWizardMounted).toBeFalsy();
  });
});

describe('posting conversion hosts', () => {
  it('is pending', () => {
    const action = {
      type: `${POST_V2V_CONVERSION_HOSTS}_PENDING`
    };
    const prevState = initialState.set('isRejectedPostingConversionHosts', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${POST_V2V_CONVERSION_HOSTS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isPostingConversionHosts', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${POST_V2V_CONVERSION_HOSTS}_FULFILLED`,
      payload: { data: { mock: 'payload' } }
    };
    const prevState = initialState.set('isRejectedPostingConversionHosts', true).set('isPostingConversionHosts', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('deleting conversion hosts', () => {
  it('sets host to delete', () => {
    const action = { type: SET_V2V_CONVERSION_HOST_TO_DELETE, payload: { mock: 'host' } };
    const state = settingsReducer(initialState, action);
    expect(state.conversionHostToDelete).toEqual({ mock: 'host' });
  });

  it('shows delete modal', () => {
    const action = { type: SHOW_V2V_CONVERSION_HOST_DELETE_MODAL };
    const state = settingsReducer(initialState, action);
    expect(state.conversionHostDeleteModalVisible).toBeTruthy();
  });

  it('hides delete modal', () => {
    const action = { type: HIDE_V2V_CONVERSION_HOST_DELETE_MODAL };
    const state = settingsReducer(initialState.set('conversionHostDeleteModalVisible', true), action);
    expect(state.conversionHostDeleteModalVisible).toBeFalsy();
  });

  it('is pending', () => {
    const action = {
      type: `${DELETE_V2V_CONVERSION_HOST}_PENDING`
    };
    const state = settingsReducer(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${DELETE_V2V_CONVERSION_HOST}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isDeletingConversionHost', true).set('conversionHostDeleteModalVisible', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${DELETE_V2V_CONVERSION_HOST}_FULFILLED`,
      payload: { data: { mock: 'payload' } }
    };
    const prevState = initialState
      .set('isRejectedDeletingConversionHost', true)
      .set('isDeletingConversionHost', true)
      .set('conversionHostDeleteModalVisible', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('retrying conversion host configuration', () => {
  it('sets task to retry', () => {
    const action = { type: SET_V2V_CONVERSION_HOST_TASK_TO_RETRY, payload: { mock: 'task' } };
    const state = settingsReducer(initialState, action);
    expect(state.conversionHostTaskToRetry).toEqual({ mock: 'task' });
  });

  it('shows retry modal', () => {
    const action = { type: SHOW_V2V_CONVERSION_HOST_RETRY_MODAL };
    const state = settingsReducer(initialState, action);
    expect(state.conversionHostRetryModalMounted).toBeTruthy();
    expect(state.conversionHostRetryModalVisible).toBeTruthy();
  });

  it('hides retry modal', () => {
    const action = { type: HIDE_V2V_CONVERSION_HOST_RETRY_MODAL };
    const prevState = initialState
      .set('conversionHostRetryModalVisible', true)
      .set('conversionHostRetryModalMounted', true);
    const state = settingsReducer(prevState, action);
    expect(state.conversionHostRetryModalMounted).toBeTruthy();
    expect(state.conversionHostRetryModalVisible).toBeFalsy();
  });

  it('exits retry modal', () => {
    const action = { type: V2V_CONVERSION_HOST_RETRY_MODAL_EXITED };
    const prevState = initialState
      .set('conversionHostRetryModalVisible', false)
      .set('conversionHostRetryModalMounted', true);
    const state = settingsReducer(prevState, action);
    expect(state.conversionHostRetryModalMounted).toBeFalsy();
    expect(state.conversionHostRetryModalVisible).toBeFalsy();
  });
});
