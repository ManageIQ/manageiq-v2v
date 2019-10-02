import {
  targetClusterWithExtendedData,
  sourceClusterWithExtendedData,
  updateMapping,
  createNewMapping
} from '../helpers';

import { srcClusters, tgtClusters } from '../clustersStepForm.fixtures';

test('targetClusterWithExtendedData adds attrs for displaying in TreeView', () => {
  const [targetCluster] = tgtClusters;

  expect(targetClusterWithExtendedData(targetCluster)).toMatchSnapshot();
});

test('sourceClusterWithExtendedData adds attrs for displaying in TreeView', () => {
  const [sourceCluster] = srcClusters;

  expect(sourceClusterWithExtendedData(sourceCluster)).toMatchSnapshot();
});

describe('updateMapping', () => {
  test('adds source clusters to mapping if target cluster id matches', () => {
    const [mappedTargetCluster] = tgtClusters;
    const [mappedSourceCluster, sourceClusterToAdd] = srcClusters;
    const clustersStepMapping = {
      ...mappedTargetCluster,
      nodes: [mappedSourceCluster]
    };

    expect(updateMapping(clustersStepMapping, mappedTargetCluster, [sourceClusterToAdd])).toMatchSnapshot();
  });

  test('does not add source clusters if target cluster id does not match', () => {
    const [mappedTargetCluster, targetClusterToAddTo] = tgtClusters;
    const [mappedSourceCluster, sourceClusterShouldNotBeAdded] = srcClusters;
    const clustersStepMapping = {
      ...mappedTargetCluster,
      nodes: [mappedSourceCluster]
    };

    expect(updateMapping(clustersStepMapping, targetClusterToAddTo, [sourceClusterShouldNotBeAdded])).toMatchSnapshot();
  });
});

test('createNewMapping constructs a clusters step mapping', () => {
  const [targetCluster] = tgtClusters;
  const [sourceCluster] = srcClusters;

  expect(createNewMapping(targetCluster, [sourceCluster])).toMatchSnapshot();
});
