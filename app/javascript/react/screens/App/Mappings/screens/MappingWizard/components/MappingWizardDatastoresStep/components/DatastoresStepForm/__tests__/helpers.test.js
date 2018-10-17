import { removeSourceDatastore, updateMappings } from '../helpers';

import { targetClusters, sourceDatastores, targetDatastores } from '../DatastoresStepForm.fixtures';

describe('removeSourceDatastore', () => {
  let targetDatastore;

  beforeEach(() => {
    [targetDatastore] = targetDatastores;
  });

  test('removes specified source datastore', () => {
    const [sourceDatastoreToRemove, sourceDatastoreShouldRemain] = sourceDatastores;
    const datastoresMapping = {
      ...targetDatastore,
      nodes: [sourceDatastoreToRemove, sourceDatastoreShouldRemain]
    };

    expect(removeSourceDatastore(datastoresMapping, sourceDatastoreToRemove)).toMatchSnapshot();
  });

  test('removes entire mapping if no source datastores remain', () => {
    const [sourceDatastoreToRemove] = sourceDatastores;
    const datastoresMapping = {
      ...targetDatastore,
      nodes: [sourceDatastoreToRemove]
    };

    expect(removeSourceDatastore(datastoresMapping, sourceDatastoreToRemove)).toMatchSnapshot();
  });
});

describe('updateMappings', () => {
  let targetCluster;

  beforeEach(() => {
    [targetCluster] = targetClusters;
  });

  test('removes specified source datastore', () => {
    const [sourceDatastoreToRemove, sourceDatastoreShouldRemain] = sourceDatastores;
    const [targetDatastore] = targetDatastores;
    const datastoresStepMapping = {
      ...targetCluster,
      nodes: [
        {
          ...targetDatastore,
          nodes: [sourceDatastoreToRemove, sourceDatastoreShouldRemain]
        }
      ]
    };

    expect(updateMappings(datastoresStepMapping, sourceDatastoreToRemove)).toMatchSnapshot();
  });

  describe('selected node is a target datastore', () => {
    test('removes specified target datastore along with its mapped source datastores', () => {
      const [targetDatastoreToRemove, targetDatastoreShouldRemain] = targetDatastores;
      const [sourceDatastoreToRemove, sourceDatastoreShouldRemain] = sourceDatastores;
      const datastoresStepMapping = {
        ...targetCluster,
        nodes: [
          {
            ...targetDatastoreToRemove,
            nodes: [sourceDatastoreToRemove]
          },
          {
            ...targetDatastoreShouldRemain,
            nodes: [sourceDatastoreShouldRemain]
          }
        ]
      };

      expect(updateMappings(datastoresStepMapping, targetDatastoreToRemove)).toMatchSnapshot();
    });

    test('removes entire datastores step mapping if no target datastores remain', () => {
      const [targetDatastoreToRemove] = targetDatastores;
      const [sourceDatastoreToRemove] = sourceDatastores;
      const datastoresStepMapping = {
        ...targetCluster,
        nodes: [
          {
            ...targetDatastoreToRemove,
            nodes: [sourceDatastoreToRemove]
          }
        ]
      };

      expect(updateMappings(datastoresStepMapping, targetDatastoreToRemove)).toMatchSnapshot();
    });
  });
});
