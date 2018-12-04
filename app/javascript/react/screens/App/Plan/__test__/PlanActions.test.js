import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { mockRequest, mockReset } from '../../../../../common/mockRequests';

import { _getPlanActionCreator, fetchPlanAction, resetPlanStateAction } from '../PlanActions';
import { requestPlanData } from '../plan.fixtures';
import { FETCH_V2V_PLAN, RESET_PLAN_STATE } from '../PlanConstants';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('FETCH_V2V_PLAN', () => {
  const id = '1';
  const { fetchPlanUrl } = requestPlanData(id);
  const request = {
    url: fetchPlanUrl,
    status: 200
  };

  describe('_getPlanActionCreator', () => {
    test('sets up the FETCH_V2V_PLAN action object', () => {
      const dispatch = jest.fn();
      mockRequest(request);

      _getPlanActionCreator(fetchPlanUrl, id)(dispatch);

      expect(dispatch).toHaveBeenLastCalledWith({
        type: FETCH_V2V_PLAN,
        payload: expect.any(Promise)
      });
    });
  });

  describe('fetchPlanAction', () => {
    test('dispatches the PENDING and FULFILLED actions', () => {
      mockRequest(request);
      return store.dispatch(fetchPlanAction(fetchPlanUrl, id)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    test('dispatches the PENDING and REJECTED actions', () => {
      mockRequest({
        ...request,
        status: 404
      });
      return store.dispatch(fetchPlanAction(fetchPlanUrl, id)).catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});

describe('resetPlanStateAction', () => {
  test('sets up the RESET_PLAN_STATE action object', () => {
    const action = resetPlanStateAction();

    expect(action).toEqual({
      type: RESET_PLAN_STATE
    });
  });
});
