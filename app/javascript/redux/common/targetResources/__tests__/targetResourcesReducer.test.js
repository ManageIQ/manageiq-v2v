import targetResourcesReducer, { initialState } from '../targetResourcesReducer';
import { FETCH_V2V_TARGET_CLUSTERS } from '../targetResourcesConstants';
import { targetClusters } from '../targetResources.fixtures';

test('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = targetResourcesReducer(undefined, action);

  expect(state).toMatchSnapshot();
});

describe('fetching target clusters', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_CLUSTERS}_PENDING`
    };
    const prevState = initialState.set('isRejectedTargetClusters', true);
    const state = targetResourcesReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_CLUSTERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingTargetClusters', true);
    const state = targetResourcesReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  describe('is successful,', () => {
    let prevState;
    beforeEach(() => {
      prevState = initialState.set('isRejectedTargetClusters', true).set('isFetchingTargetClusters', true);
    });
    test('and there is data', () => {
      const { resources } = targetClusters;
      const payload = {
        data: {
          ...targetClusters,
          resources: [
            {
              ...resources
            }
          ]
        }
      };
      const action = {
        type: `${FETCH_V2V_TARGET_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = targetResourcesReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });

    test('and there is no data', () => {
      const payload = {
        data: {
          ...targetClusters,
          resources: []
        }
      };
      const action = {
        type: `${FETCH_V2V_TARGET_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = targetResourcesReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });
  });
});
