import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { mockRequest, mockReset } from '../../../../../common/mockRequests';

import { fetchTransformationPlansAction } from '../OverviewActions';
import { requestTransformationPlansData } from '../overview.transformationPlans.fixtures';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('fetchTransformationPlansAction', () => {
  const { fetchTransformationPlansUrl } = requestTransformationPlansData;
  const request = { fetchTransformationPlansUrl };

  test('dispatches PENDING and FULFILLED actions', () => {
    mockRequest({
      ...request,
      status: 200
    });

    return store
      .dispatch(fetchTransformationPlansAction(fetchTransformationPlansUrl))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  test('dispatches PENDING and REJECTED actions', () => {
    mockRequest({
      ...request,
      status: 404
    });

    return store
      .dispatch(fetchTransformationPlansAction(fetchTransformationPlansUrl))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
