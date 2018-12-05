import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../SettingsActions';
import {
  fetchServersData,
  servers,
  settingsFormValues,
  fetchSettingsData,
  patchSettingsData
} from '../settings.fixures';
import { initialState } from '../SettingsReducer';
import { mockRequest, mockReset } from '../../../../../common/mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('settings actions', () => {
  it('should fetch servers and return PENDING and FULFILLED action', () => {
    const { method, fetchServersUrl, response } = fetchServersData;
    mockRequest({
      method,
      url: fetchServersUrl,
      status: 200,
      response
    });
    return store.dispatch(actions.fetchServersAction(fetchServersUrl)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should fetch servers and return PENDING and REJECTED action', () => {
    const { method, fetchServersUrl } = fetchServersData;
    mockRequest({
      method,
      url: fetchServersUrl,
      status: 500
    });
    return store.dispatch(actions.fetchServersAction(fetchServersUrl)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should fetch settings and return PENDING and FULFILLED action', () => {
    const { method, fetchSettingsUrl, response } = fetchSettingsData;
    mockRequest({
      method,
      url: fetchSettingsUrl,
      status: 200,
      response
    });
    return store.dispatch(actions.fetchSettingsAction(fetchSettingsUrl)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should fetch settings and return PENDING and REJECTED action', () => {
    const { method, fetchSettingsUrl } = fetchSettingsData;
    mockRequest({
      method,
      url: fetchSettingsUrl,
      status: 500
    });
    return store.dispatch(actions.fetchSettingsAction(fetchSettingsUrl)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should patch settings and return PENDING and FULFILLED actions', () => {
    const { method, response } = patchSettingsData;
    servers.resources.forEach(server => {
      mockRequest({
        method,
        url: `${server.href}/settings`,
        status: 200,
        response
      });
    });
    return store.dispatch(actions.patchSettingsAction(servers.resources, settingsFormValues)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should patch settings and return PENDING and REJECTED action', () => {
    const { method } = patchSettingsData;
    servers.resources.forEach(server => {
      mockRequest({
        method,
        url: `${server.href}/settings`,
        status: 500
      });
    });
    return store.dispatch(actions.patchSettingsAction(servers.resources, settingsFormValues)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
