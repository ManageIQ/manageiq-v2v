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
import { requestConversionHostsData } from '../../Mappings/screens/MappingWizard/components/MappingWizardGeneralStep/mappingWizardGeneralStep.fixtures';
import { initialState } from '../SettingsReducer';
import { mockRequest, mockReset } from '../../../../../common/mockRequests';
import { SHOW_V2V_CONVERSION_HOST_WIZARD, HIDE_V2V_CONVERSION_HOST_WIZARD } from '../SettingsConstants';

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

  it('should fetch conversion hosts and return PENDING and FULFILLED action', () => {
    const { fetchConversionHostsUrl } = requestConversionHostsData;
    mockRequest({
      url: fetchConversionHostsUrl,
      status: 200
    });
    return store.dispatch(actions.fetchConversionHostsAction(fetchConversionHostsUrl)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should fetch conversion hosts and return PENDING and REJECTED action', () => {
    const { fetchConversionHostsUrl } = requestConversionHostsData;
    mockRequest({
      url: fetchConversionHostsUrl,
      status: 500
    });
    return store.dispatch(actions.fetchConversionHostsAction(fetchConversionHostsUrl)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch show wizard action', () => {
    store.dispatch(actions.showConversionHostWizard());
    expect(store.getActions()).toEqual([{ type: SHOW_V2V_CONVERSION_HOST_WIZARD }]);
  });

  it('should dispatch hide wizard action', () => {
    store.dispatch(actions.hideConversionHostWizard());
    expect(store.getActions()).toEqual([{ type: HIDE_V2V_CONVERSION_HOST_WIZARD }]);
  });
});
