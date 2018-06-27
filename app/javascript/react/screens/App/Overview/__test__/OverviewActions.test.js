import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { mockRequest, mockReset } from '../../../../../common/mockRequests';

import { fetchTransformationPlansAction, setMigrationsFilterAction } from '../OverviewActions';
import { requestTransformationPlansData } from '../overview.transformationPlans.fixtures';
import { V2V_SET_MIGRATIONS_FILTER } from '../OverviewConstants';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('fetchTransformationPlansAction', () => {
  const { fetchTransformationPlansUrl, response } = requestTransformationPlansData;

  test('dispatches PENDING and FULFILLED actions', () => {
    mockRequest({
      method: 'GET',
      url: fetchTransformationPlansUrl,
      params: null,
      status: 200,
      ...response
    });

    return store
      .dispatch(
        fetchTransformationPlansAction({
          url: fetchTransformationPlansUrl,
          archived: false
        })
      )
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  test('dispatches PENDING and REJECTED actions', () => {
    mockRequest({
      method: 'GET',
      url: fetchTransformationPlansUrl,
      params: null,
      status: 404,
      ...response
    });

    return store
      .dispatch(
        fetchTransformationPlansAction({
          url: fetchTransformationPlansUrl,
          archived: false
        })
      )
      .catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});

describe('setMigrationsFilterAction', () => {
  test('sets up the migrations filter action object', () => {
    const activeFilter = 'Migrations Plans Not Started';
    const result = setMigrationsFilterAction(activeFilter);

    expect(result).toEqual({
      type: V2V_SET_MIGRATIONS_FILTER,
      payload: activeFilter
    });
  });
});
