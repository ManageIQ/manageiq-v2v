import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { saveAs } from 'file-saver';
import * as actions from '../SettingsActions';
import {
  fetchServersData,
  servers,
  settingsFormValues,
  fetchSettingsData,
  patchSettingsData
} from '../settings.fixtures';
import { requestConversionHostsData } from '../../Mappings/screens/MappingWizard/components/MappingWizardGeneralStep/mappingWizardGeneralStep.fixtures';
import { initialState } from '../SettingsReducer';
import { mockRequest, mockReset } from '../../../../../common/mockRequests';
import {
  SHOW_V2V_CONVERSION_HOST_WIZARD,
  HIDE_V2V_CONVERSION_HOST_WIZARD,
  SET_V2V_CONVERSION_HOST_TO_DELETE,
  SHOW_V2V_CONVERSION_HOST_DELETE_MODAL,
  HIDE_V2V_CONVERSION_HOST_DELETE_MODAL,
  SET_V2V_CONVERSION_HOST_TASK_TO_RETRY,
  SHOW_V2V_CONVERSION_HOST_RETRY_MODAL,
  HIDE_V2V_CONVERSION_HOST_RETRY_MODAL,
  V2V_CONVERSION_HOST_RETRY_MODAL_EXITED
} from '../SettingsConstants';
import { V2V_NOTIFICATION_ADD } from '../../common/NotificationList/NotificationConstants';

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

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
      status: 200,
      response: ['mock', 'conversion', 'hosts']
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

  it('should fetch conversion host tasks and return PENDING and FULFILLED action', () => {
    const url = '/api/tasks?mock=filters';
    mockRequest({
      url,
      status: 200,
      response: ['mock', 'tasks']
    });
    return store.dispatch(actions.fetchConversionHostTasksAction(url)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should fetch conversion host tasks and return PENDING and REJECTED action', () => {
    const url = '/api/tasks?mock=filters';
    mockRequest({
      url,
      status: 500
    });
    return store.dispatch(actions.fetchConversionHostTasksAction(url)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch show wizard action', () => {
    store.dispatch(actions.showConversionHostWizardAction());
    expect(store.getActions()).toEqual([{ type: SHOW_V2V_CONVERSION_HOST_WIZARD }]);
  });

  it('should dispatch hide wizard action', () => {
    store.dispatch(actions.hideConversionHostWizardAction());
    expect(store.getActions()).toEqual([{ type: HIDE_V2V_CONVERSION_HOST_WIZARD }]);
  });

  it('should dispatch wizard exited action and reset actions for wizard step forms', () => {
    store.dispatch(actions.conversionHostWizardExitedAction());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should post conversion hosts and return PENDING and FULFILLED action', () => {
    const url = '/api/conversion_hosts';
    const postBodies = [{ mock: 'data' }, { mock: 'data' }];
    mockRequest({
      method: 'POST',
      url,
      status: 200,
      response: { mock: 'response' }
    });
    return store.dispatch(actions.postConversionHostsAction(url, postBodies)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should post conversion hosts and return PENDING and REJECTED action', () => {
    const url = '/api/conversion_hosts';
    const postBodies = [{ mock: 'data' }, { mock: 'data' }];
    mockRequest({
      method: 'POST',
      url,
      status: 500
    });
    return store.dispatch(actions.postConversionHostsAction(url, postBodies)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch setHostToDeleteAction', () => {
    store.dispatch(actions.setHostToDeleteAction({ mock: 'host' }));
    expect(store.getActions()).toEqual([
      {
        type: SET_V2V_CONVERSION_HOST_TO_DELETE,
        payload: { mock: 'host' }
      }
    ]);
  });

  it('should dispatch show delete modal action', () => {
    store.dispatch(actions.showConversionHostDeleteModalAction());
    expect(store.getActions()).toEqual([{ type: SHOW_V2V_CONVERSION_HOST_DELETE_MODAL }]);
  });

  it('should dispatch hide delete modal action', () => {
    store.dispatch(actions.hideConversionHostDeleteModalAction());
    expect(store.getActions()).toEqual([{ type: HIDE_V2V_CONVERSION_HOST_DELETE_MODAL }]);
  });

  it('should delete conversion host and return PENDING and FULFILLED action', () => {
    const url = '/api/conversion_hosts';
    const host = { mock: 'host', id: '12345', href: `${url}/12345` };
    mockRequest({
      method: 'POST',
      url: `${url}/${host.id}`,
      status: 200,
      response: { mock: 'response' }
    });
    return store.dispatch(actions.deleteConversionHostAction(host)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should delete conversion host and return PENDING and REJECTED action', () => {
    const url = '/api/conversion_hosts';
    const host = { mock: 'host', id: '12345', href: `${url}/12345` };
    mockRequest({
      method: 'POST',
      url: `${url}/${host.id}`,
      status: 500
    });
    return store.dispatch(actions.deleteConversionHostAction(host)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch setConversionHostTaskToRetryAction', () => {
    store.dispatch(actions.setConversionHostTaskToRetryAction({ mock: 'task' }));
    expect(store.getActions()).toEqual([
      {
        type: SET_V2V_CONVERSION_HOST_TASK_TO_RETRY,
        payload: { mock: 'task' }
      }
    ]);
  });

  it('should dispatch show convhost retry modal action', () => {
    store.dispatch(actions.showConversionHostRetryModalAction());
    expect(store.getActions()).toEqual([{ type: SHOW_V2V_CONVERSION_HOST_RETRY_MODAL }]);
  });

  it('should dispatch hide convhost retry modal action', () => {
    store.dispatch(actions.hideConversionHostRetryModalAction());
    expect(store.getActions()).toEqual([{ type: HIDE_V2V_CONVERSION_HOST_RETRY_MODAL }]);
  });

  it('should dispatch convhost retry modal exited action', () => {
    store.dispatch(actions.conversionHostRetryModalExitedAction());
    expect(store.getActions()).toEqual([{ type: V2V_CONVERSION_HOST_RETRY_MODAL_EXITED }]);
  });

  it('should save a file and dispatch notification action', () => {
    const fileName = 'some-file.txt';
    const fileBody = 'Hello World';
    store.dispatch(actions.saveTextFileAction({ fileName, fileBody }));
    expect(saveAs).toHaveBeenCalledTimes(1);
    const savedFile = saveAs.mock.calls[0][0];
    expect(savedFile.name).toBe(fileName);
    expect(savedFile.type).toBe('text/plain;charset=utf-8');
    expect(savedFile.size).toBe(fileBody.length);
    expect(store.getActions()).toEqual([
      {
        type: V2V_NOTIFICATION_ADD,
        message: '"some-file.txt" download successful',
        notificationType: 'success',
        actionEnabled: false
      }
    ]);
  });
});
