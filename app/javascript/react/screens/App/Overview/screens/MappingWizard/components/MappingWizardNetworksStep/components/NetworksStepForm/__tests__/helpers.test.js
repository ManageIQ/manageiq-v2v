import {
  getRepresentatives,
  sourceNetworksFilter,
  clustersMappingWithTreeViewAttrs,
  targetNetworkWithTreeViewAttrs,
  sourceNetworkWithTreeViewAttrs,
  networkGroupingForRep,
  dedupeMappedSourceNetworks,
  mappingsForTreeView
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
