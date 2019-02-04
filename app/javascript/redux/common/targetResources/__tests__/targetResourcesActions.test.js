import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../targetResourcesActions';
import { requestTargetClustersData } from '../targetResources.fixtures';
import { initialState } from '../targetResourcesReducer';
import { mockRequest, mockReset } from '../../../../common/mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('target resources actions', () => {
  it('should fetch target clusters and return PENDING and FULFILLED action', () => {
    const { fetchTargetClustersUrl } = requestTargetClustersData;
    mockRequest({
      url: fetchTargetClustersUrl,
      status: 200
    });
    return store.dispatch(actions.fetchTargetClustersAction(fetchTargetClustersUrl)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should fetch target clusters and return PENDING and REJECTED action', () => {
    const { fetchTargetClustersUrl } = requestTargetClustersData;
    mockRequest({
      url: fetchTargetClustersUrl,
      status: 404
    });
    return store.dispatch(actions.fetchTargetClustersAction(fetchTargetClustersUrl)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
