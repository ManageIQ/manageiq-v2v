import clustersReducer, { initialState } from '../MappingWizardClustersStepReducer';
import { FETCH_V2V_SOURCE_CLUSTERS } from '../MappingWizardClustersStepConstants';
import { sourceClusters } from '../mappingWizardClustersStep.fixtures';

test('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = clustersReducer(undefined, action);

  expect(state).toMatchSnapshot();
});

describe('fetching source clusters', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_CLUSTERS}_PENDING`
    };
    const prevState = initialState.set('isRejectedSourceClusters', true);
    const state = clustersReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_CLUSTERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingSourceClusters', true);
    const state = clustersReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  describe('is successful,', () => {
    let prevState;
    beforeEach(() => {
      prevState = initialState.set('isRejectedSourceClusters', true).set('isFetchingSourceClusters', true);
    });

    test('and there is data', () => {
      const { resources } = sourceClusters;
      const payload = {
        data: {
          ...sourceClusters,
          resources: [
            {
              ...resources
            }
          ]
        }
      };
      const action = {
        type: `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = clustersReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });

    test('and there is no data', () => {
      const payload = {
        data: {
          ...sourceClusters,
          resources: []
        }
      };
      const action = {
        type: `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = clustersReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });
  });
});
