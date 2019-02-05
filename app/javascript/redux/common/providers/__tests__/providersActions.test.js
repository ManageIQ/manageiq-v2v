import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../providersActions';
import { providers } from '../providers.fixtures';
import { initialState } from '../providersReducer';
import { FETCH_V2V_PROVIDERS } from '../providersConstants';
import { mockRequest, mockReset } from '../../../../common/mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('providers actions', () => {
  const fetchProvidersUrl = '/mock/api/fetchProviders';

  it('should fetch providers and return PENDING and FULFILLED action', () => {
    mockRequest({
      method: 'GET',
      url: fetchProvidersUrl,
      status: 200,
      response: providers
    });
    return store.dispatch(actions.fetchProvidersAction(fetchProvidersUrl)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({ type: `${FETCH_V2V_PROVIDERS}_PENDING` });
      expect(storeActions[1].type).toEqual(`${FETCH_V2V_PROVIDERS}_FULFILLED`);
      expect(storeActions[1].payload).toEqual(providers);
    });
  });

  it('should fetch providers and return PENDING and REJECTED action', () => {
    mockRequest({
      method: 'GET',
      url: fetchProvidersUrl,
      status: 500
    });
    return store.dispatch(actions.fetchProvidersAction(fetchProvidersUrl)).catch(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({ type: `${FETCH_V2V_PROVIDERS}_PENDING` });
      expect(storeActions[1].type).toEqual(`${FETCH_V2V_PROVIDERS}_REJECTED`);
    });
  });
});
