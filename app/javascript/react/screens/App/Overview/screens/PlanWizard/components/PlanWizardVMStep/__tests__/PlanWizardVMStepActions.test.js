import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../PlanWizardVMStepActions';
import { initialState } from '../PlanWizardVMStepReducer';
import { validateVMsData } from '../PlanWizardVMStep.fixtures';
import { mockRequest, mockReset } from '../../../../../../../../../common/mockRequests';
import { V2V_VALIDATE_VMS } from '../PlanWizardVMStepConstants';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('validate VMs action creator', () => {
  it('should return PENDING and FULFILLED actions with metadata', () => {
    const { method, response } = validateVMsData;
    const url = '/dummy/api/validateVms';
    const id = '1';
    const meta = { some: 'metadata', csvRows: [] };
    mockRequest({ method, url: `${url}/${id}`, response });
    return store.dispatch(actions.validateVmsAction(url, id, [], '1', { some: 'metadata' })).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({ type: `${V2V_VALIDATE_VMS}_PENDING`, meta });
      expect(storeActions[1]).toEqual({ type: `${V2V_VALIDATE_VMS}_FULFILLED`, meta, payload: response });
    });
  });

  it('should return PENDING and REJECTED actions', () => {
    const { method, response } = validateVMsData;
    const url = '/dummy/api/validateVms';
    const id = '1';
    const meta = { some: 'metadata', csvRows: [] };
    mockRequest({ method, url: `${url}/${id}`, response, status: 500 });
    return store.dispatch(actions.validateVmsAction(url, id, [], '1', { some: 'metadata' })).catch(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({ type: `${V2V_VALIDATE_VMS}_PENDING`, meta });
      expect(storeActions[1].type).toEqual(`${V2V_VALIDATE_VMS}_REJECTED`);
    });
  });
});
