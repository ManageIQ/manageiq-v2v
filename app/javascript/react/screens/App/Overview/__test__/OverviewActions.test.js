import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../OverviewActions';
import { mockRequest, mockReset } from '../../../../../common/mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const createMockStore = configureMockStore(middlewares);
const store = createMockStore({});

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('fetchMigrationsInProgressAction', () => {
  const url =
    '/api/service_requests?' +
    "filter[]=state='active'" +
    "&filter[]=type='ServiceTemplateTransformationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks';

  test('fetches migrations in progress and returns PENDING and FULFILLED actions', () => {
    mockRequest({
      url,
      status: 200
    });

    return store
      .dispatch(actions.fetchMigrationsInProgressAction())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  test('fetches migrations in progress and returns PENDING and REJECTED actions', () => {
    mockRequest({
      url,
      status: 404
    });

    return store
      .dispatch(actions.fetchMigrationsInProgressAction())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});

describe('fetchMigrationsCompletedAction', () => {
  const url =
    '/api/service_requests?' +
    "filter[]=state='finished'" +
    "&filter[]=type='ServiceTemplateTransformationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks';

  test('fetches completed migrations and returns PENDING and FULFILLED actions', () => {
    mockRequest({
      url,
      status: 200
    });

    return store.dispatch(actions.fetchMigrationsCompletedAction()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  test('fetches completed migrations and returns PENDING and REJECTED actions', () => {
    mockRequest({
      url,
      status: 404
    });

    return store.dispatch(actions.fetchMigrationsCompletedAction()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
