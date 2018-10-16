import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../MappingWizardClustersStepActions';
import {
  initialState,
  requestSourceClustersData,
  requestTargetClustersData
} from '../mappingWizardClustersStep.fixtures';
import { mockRequest, mockReset } from '../../../../../../../../../common/mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('mappingWizard actions', () => {
  it('should fetch source clusters and return PENDING and FULFILLED action', () => {
    const { fetchSourceClustersUrl } = requestSourceClustersData;
    mockRequest({
      fetchSourceClustersUrl,
      status: 200
    });
    return store.dispatch(actions.fetchSourceClustersAction(fetchSourceClustersUrl)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should fetch source clusters and return PENDING and REJECTED action', () => {
    const { fetchSourceClustersUrl } = requestSourceClustersData;
    mockRequest({
      fetchSourceClustersUrl,
      status: 404
    });
    return store.dispatch(actions.fetchSourceClustersAction(fetchSourceClustersUrl)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should fetch target clusters and return PENDING and FULFILLED action', () => {
    const { fetchTargetClustersUrl } = requestTargetClustersData;
    mockRequest({
      fetchTargetClustersUrl,
      status: 200
    });
    return store.dispatch(actions.fetchTargetClustersAction(fetchTargetClustersUrl)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should fetch target clusters and return PENDING and REJECTED action', () => {
    const { fetchTargetClustersUrl } = requestTargetClustersData;
    mockRequest({
      fetchTargetClustersUrl,
      status: 404
    });
    return store.dispatch(actions.fetchTargetClustersAction(fetchTargetClustersUrl)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
