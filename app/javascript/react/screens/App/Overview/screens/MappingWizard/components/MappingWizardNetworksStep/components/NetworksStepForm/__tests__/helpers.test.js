import {
  getRepresentatives,
  sourceNetworksFilter,
  clustersMappingWithTreeViewAttrs,
  targetNetworkWithTreeViewAttrs,
  sourceNetworkWithTreeViewAttrs,
  networkGroupingForRep,
  dedupeMappedSourceNetworks,
  dedupeMappedTargetNetworks,
  mappingsForTreeView,
  mappingWithTargetNetworkRemoved,
  mappingWithSourceNetworkRemoved
} from '../helpers';
import { groupByUidEms } from '../../../MappingWizardNetworksStepSelectors';
import {
  sourceNetworks,
  targetNetworks,
  sourceCluster,
  targetCluster,
  clustersMapping,
  networkGrouping
} from '../networksStepForm.fixtures';

test('getRepresentatives should return an array with a representative from each source network grouping', () => {
  expect(getRepresentatives(groupByUidEms(sourceNetworks))).toMatchSnapshot();
});

test('sourceNetworksFilter should return a representative for each source network grouping that have not been mapped', () => {
  const networksStepMapping = {
    ...targetCluster,
    nodes: [
      {
        ...targetNetworks[0],
        nodes: [
          {
            ...sourceNetworks[2]
          }
        ]
      }
    ]
  };
  expect(
    sourceNetworksFilter(groupByUidEms(sourceNetworks), [networksStepMapping])
  ).toMatchSnapshot();
});

test('clustersMappingWithTreeViewAttrs adds extra attributes for display in TreeView', () => {
  expect(clustersMappingWithTreeViewAttrs(clustersMapping)).toMatchSnapshot();
});

test('targetNetworkWithTreeViewAttrs adds extra attributes for display in TreeView', () => {
  expect(targetNetworkWithTreeViewAttrs(targetNetworks[0])).toMatchSnapshot();
});

test('sourceNetworkWithTreeViewAttrs adds extra attributes for display in TreeView', () => {
  const [sourceNetwork] = sourceNetworks;
  const selectedCluster = sourceCluster;

  expect(
    sourceNetworkWithTreeViewAttrs(sourceNetwork, selectedCluster)
  ).toMatchSnapshot();
});

test('networkGroupingForRep returns the network grouping, with TreeView attrs, for a representative', () => {
  const [sourceNetworkRep] = networkGrouping;
  const groupedSourceNetworks = groupByUidEms(networkGrouping);
  const selectedCluster = sourceCluster;

  expect(
    networkGroupingForRep(
      sourceNetworkRep,
      groupedSourceNetworks,
      selectedCluster
    )
  ).toMatchSnapshot();
});

test("dedupeMappedSourceNetworks reduces a network mapping's source networks to representatives", () => {
  const networksMapping = {
    ...targetNetworks[0],
    nodes: networkGrouping
  };

  expect(dedupeMappedSourceNetworks(networksMapping)).toMatchSnapshot();
});

test("dedupeMappedTargetNetworks reduces a networks step mapping's nodes to representatives of each target network grouping", () => {
  const [targetNetworkSwitchOne, targetNetworkSwitchTwo] = targetNetworks;
  const networksStepMapping = {
    ...targetCluster,
    nodes: [targetNetworkSwitchOne, targetNetworkSwitchTwo]
  };

  expect(dedupeMappedTargetNetworks(networksStepMapping).nodes).toHaveLength(1);
});

test('mappingsForTreeView reduces source networks to representatives for all networks step mappings', () => {
  const networksStepMapping = {
    ...targetCluster,
    nodes: [
      {
        ...targetNetworks[0],
        nodes: networkGrouping
      }
    ]
  };

  expect(mappingsForTreeView([networksStepMapping])).toMatchSnapshot();
});

describe('mappingWithTargetNetworkRemoved', () => {
  const [targetNetworkToRemove, targetNetworkShouldRemain] = targetNetworks;
  const [sourceNetworkOne, sourceNetworkTwo] = sourceNetworks;
  const nodeToRemove = {
    ...targetNetworkToRemove,
    nodes: [sourceNetworkOne]
  };

  test('removes the networks mapping for the specified target network', () => {
    const nodeShouldRemain = {
      ...targetNetworkShouldRemain,
      nodes: [sourceNetworkTwo]
    };
    const networksStepMapping = {
      ...targetCluster,
      nodes: [nodeToRemove, nodeShouldRemain]
    };

    expect(
      mappingWithTargetNetworkRemoved(
        networksStepMapping,
        targetNetworkToRemove
      )
    ).toMatchSnapshot();
  });

  test('returns null if no networks mappings remain', () => {
    const networksStepMapping = {
      ...targetCluster,
      nodes: [nodeToRemove]
    };

    expect(
      mappingWithTargetNetworkRemoved(
        networksStepMapping,
        targetNetworkToRemove
      )
    ).toMatchSnapshot();
  });
});

describe('mappingWithSourceNetworkRemoved', () => {
  const [, , sourceNetworkShouldRemain] = sourceNetworks;
  const [sourceNetworkToRemove] = networkGrouping;
  const [targetNetwork] = targetNetworks;

  test('removes all networks whose uid_ems matches that of the specified source network', () => {
    const networksMapping = {
      ...targetNetwork,
      nodes: [...networkGrouping, sourceNetworkShouldRemain]
    };

    expect(
      mappingWithSourceNetworkRemoved(networksMapping, sourceNetworkToRemove)
    ).toMatchSnapshot();
  });

  test('returns null if no source networks remain', () => {
    const networksMapping = {
      ...targetNetwork,
      nodes: [sourceNetworkToRemove]
    };

    expect(
      mappingWithSourceNetworkRemoved(networksMapping, sourceNetworkToRemove)
    ).toMatchSnapshot();
  });
});
