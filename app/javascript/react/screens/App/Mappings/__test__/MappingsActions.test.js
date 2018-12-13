import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { mockRequest, mockReset } from '../../../../../common/mockRequests';
import { fetchCloudTenantsAction } from '../MappingsActions';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('fetchCloudTenantsAction', () => {
  test('dispatches PENDING and FULFILLED actions', () => {
    mockRequest({
      method: 'GET',
      url: '/api',
      status: 200,
      response: { mock: 'data' }
    });

    return store.dispatch(fetchCloudTenantsAction('/api')).then(() => {
      const actions = store.getActions();
      expect(actions).toMatchSnapshot();
    });
  });

  test('dispatches PENDING and REJECTED actions', () => {
    mockRequest({
      method: 'GET',
      url: '/api',
      status: 404,
      response: { error: 'error' }
    });

    return store.dispatch(fetchCloudTenantsAction('/api')).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
