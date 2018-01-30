import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from './index';
import { initialState, requestData } from './mappingWizard.fixtures';
import { mockRequest, mockReset } from '../../../mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('mappingWizard actions', () => {
  it('should fetch source clusters and return PENDING and FULFILLED action', () => {
    const { url } = requestData;
    mockRequest({
      url,
      status: 200
    });
    return store.dispatch(actions.fetchSourceClusters(url)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should fetch source clusters and return PENDING and REJECTED action', () => {
    const { url } = requestData;
    mockRequest({
      url,
      status: 404
    });
    return store.dispatch(actions.fetchSourceClusters(url)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
