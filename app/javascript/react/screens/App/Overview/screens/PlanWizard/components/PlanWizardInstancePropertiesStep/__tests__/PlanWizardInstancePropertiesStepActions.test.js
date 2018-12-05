import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../PlanWizardInstancePropertiesStepActions';
import {
  queryTenantsWithAttributesData,
  bestFitFlavorData,
  flavorMappings,
  processedBestFitFlavors
} from '../planWizardInstancePropertiesStep.fixtures';
import { initialState } from '../PlanWizardInstancePropertiesStepReducer';
import { mockRequest, mockReset } from '../../../../../../../../../common/mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('PlanWizard instance properties step actions', () => {
  it('should query tenants with attributes and return PENDING and FULFILLED actions', () => {
    const { method, argumentUrl, requestUrl, response } = queryTenantsWithAttributesData;
    mockRequest({
      method,
      url: requestUrl,
      response
    });
    return store
      .dispatch(
        actions.queryTenantsWithAttributesAction(
          argumentUrl,
          ['42000000000003'],
          ['flavors', 'security_groups', 'default_security_group']
        )
      )
      .then(() => {
        expect(global.API.post.mock.calls[global.API.post.mock.calls.length - 1][0]).toBe(requestUrl);
        const storeActions = store.getActions();
        expect(storeActions).toHaveLength(2);
        expect(storeActions[0].type).toBe('QUERY_V2V_OSP_TENANT_ATTRIBUTES_PENDING');
        expect(storeActions[1].type).toBe('QUERY_V2V_OSP_TENANT_ATTRIBUTES_FULFILLED');
        expect(storeActions[1].payload).toEqual(response);
      });
  });

  it('should query best fit flavors and return PENDING, SET... and FULFILLED actions', () => {
    const { method, url, response } = bestFitFlavorData;
    mockRequest({ method, url, response });
    return store.dispatch(actions.bestFitFlavorAction(url, flavorMappings, null)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions).toHaveLength(3);
      expect(storeActions[0].type).toBe('QUERY_V2V_OSP_BEST_FIT_FLAVOR_PENDING');
      expect(storeActions[1].type).toBe('SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS');
      expect(storeActions[1].payload).toEqual(processedBestFitFlavors);
      expect(storeActions[2].type).toBe('QUERY_V2V_OSP_BEST_FIT_FLAVOR_FULFILLED');
      expect(storeActions[2].payload).toEqual(response);
    });
  });

  it('should dispatch the correct action on instancePropertiesRowsAction', () => {
    store.dispatch(actions.instancePropertiesRowsAction([{ mock: 'row1' }, { mock: 'row2' }]));
    expect(store.getActions()).toMatchSnapshot();
  });
});
