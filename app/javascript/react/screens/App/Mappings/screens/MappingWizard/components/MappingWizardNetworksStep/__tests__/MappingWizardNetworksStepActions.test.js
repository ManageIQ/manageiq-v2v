import { mockStore } from '../../../../../../common/testReduxHelpers';
import { mockRequest, mockReset } from '../../../../../../../../../common/mockRequests';
import { fetchTargetNetworksAction, fetchPublicCloudNetworksAction } from '../MappingWizardNetworksStepActions';
import { cloudTenants, targetClusters } from '../../MappingWizardClustersStep/mappingWizardClustersStep.fixtures';
import { V2V_TARGET_PROVIDER_NETWORK_KEYS, V2V_TARGET_PROVIDERS } from '../../../MappingWizardConstants';

const store = mockStore({});

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('fetchTargetNetworksAction', () => {
  describe('if the target provider is OSP,', () => {
    const targetProvider = V2V_TARGET_PROVIDERS[1].id;
    const [targetCloudTenant] = cloudTenants.resources;

    test('dispatches PENDING and FULFILLED actions and sets the clusterId and providerName', () => {
      mockRequest({
        method: 'GET',
        url: '/api',
        status: 200,
        response: {
          data: {
            ...targetCloudTenant,
            ext_management_system: { name: 'some provider' },
            [V2V_TARGET_PROVIDER_NETWORK_KEYS[targetProvider]]: [{}]
          }
        }
      });

      return store.dispatch(fetchTargetNetworksAction('/api', '1', targetProvider)).then(() => {
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
      });
    });
  });

  describe('if the target provider is RHV,', () => {
    const targetProvider = V2V_TARGET_PROVIDERS[0].id;
    const [targetCluster] = targetClusters.resources;

    test('dispatches PENDING and FULFILLED actions and sets the clusterId and providerName', () => {
      mockRequest({
        method: 'GET',
        url: '/api',
        status: 200,
        response: {
          data: {
            ...targetCluster,
            ext_management_system: { name: 'some provider' },
            [V2V_TARGET_PROVIDER_NETWORK_KEYS[targetProvider]]: [{}]
          }
        }
      });

      return store.dispatch(fetchTargetNetworksAction('/api', '1', targetProvider)).then(() => {
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
      });
    });
  });

  test('dispatches PENDING and REJECTED actions', () => {
    mockRequest({
      method: 'GET',
      url: '/api',
      status: 404,
      response: { error: 'error' }
    });

    return store.dispatch(fetchTargetNetworksAction('/api', '1', 'provider')).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});

describe('fetchPublicCloudNetworksAction', () => {
  const targetTenant = cloudTenants.resources[0];

  test('dispatches PENDING and FULFILLED actions and sets the clusterId and providerName', () => {
    mockRequest({
      method: 'GET',
      url: '/api',
      status: 200,
      response: { data: { resources: [{}] } }
    });

    return store.dispatch(fetchPublicCloudNetworksAction('/api', targetTenant)).then(() => {
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

    return store.dispatch(fetchPublicCloudNetworksAction('/api', targetTenant)).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
