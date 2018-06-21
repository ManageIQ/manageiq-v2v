import { groupByUidEms } from '../../MappingWizardNetworksStepSelectors';

export const getRepresentatives = (groupedNetworks = {}) => {
  const representatives = [];
  for (const uid_ems in groupedNetworks) {
    if ({}.hasOwnProperty.call(groupedNetworks, uid_ems)) {
      representatives.push(groupedNetworks[uid_ems][0]);
    }
  }
  return representatives;
};

export const sourceNetworksFilter = (
  groupedSourceNetworks,
  networksStepMappings
) => {
  const mappedNetworks = networksStepMappings.reduce(
    (mappedNetworksArray, targetClusterWithNetworkMappings) => {
      const sourceNetworks = targetClusterWithNetworkMappings.nodes.reduce(
        (networks, networkMapping) => [...networks, ...networkMapping.nodes],
        []
      );
      return [...mappedNetworksArray, ...sourceNetworks];
    },
    []
  );

  return getRepresentatives(groupedSourceNetworks).filter(
    network =>
      !mappedNetworks.some(
        mappedNetwork => mappedNetwork.uid_ems === network.uid_ems
      )
  );
};

export const clustersMappingWithTreeViewAttrs = clusterMapping => ({
  ...clusterMapping,
  text: clusterMapping.name,
  selectable: false
});

export const targetNetworkWithTreeViewAttrs = targetNetwork => ({
  ...targetNetwork,
  text: targetNetwork.name,
  selectable: true,
  selected: false,
  state: {
    expanded: true
  }
});

export const sourceNetworkWithTreeViewAttrs = (
  sourceNetwork,
  selectedCluster
) => ({
  ...sourceNetwork,
  text: sourceNetwork.name,
  icon: 'fa fa-file-o',
  sourceClusterId: selectedCluster.id,
  selectable: true,
  selected: false
});

export const networkGroupingForRep = (
  sourceNetworkRep,
  groupedSourceNetworks,
  selectedCluster
) => {
  const sourceNetworks = groupedSourceNetworks[sourceNetworkRep.uid_ems];
  return sourceNetworks.map(sourceNetwork =>
    sourceNetworkWithTreeViewAttrs(sourceNetwork, selectedCluster)
  );
};

export const dedupeMappedSourceNetworks = networksMapping => {
  const { nodes: sourceNetworks, ...targetNetwork } = networksMapping;
  const groupedNetworks = groupByUidEms(sourceNetworks);
  return {
    ...targetNetwork,
    nodes: getRepresentatives(groupedNetworks)
  };
};

export const dedupeMappedTargetNetworks = networksStepMapping => {
  const { nodes: networksMappings, ...targetCluster } = networksStepMapping;
  const groupedMappings = groupByUidEms(networksMappings);
  return {
    ...targetCluster,
    nodes: getRepresentatives(groupedMappings)
  };
};

export const mappingsForTreeView = mappings =>
  mappings.reduce((updatedMappings, networksStepMapping) => {
    const { nodes: networksMappings } = dedupeMappedTargetNetworks(
      networksStepMapping
    );
    const updatedNetworksMappings = networksMappings.reduce(
      (dedupedMappings, networksMapping) => [
        ...dedupedMappings,
        dedupeMappedSourceNetworks(networksMapping)
      ],
      []
    );
    const updatedMapping = {
      ...networksStepMapping,
      nodes: updatedNetworksMappings
    };
    return [...updatedMappings, updatedMapping];
  }, []);

export const mappingWithTargetNetworkRemoved = (
  networksStepMapping,
  targetNetworkToRemove
) => {
  const { nodes: networksMappings, ...targetCluster } = networksStepMapping;
  const updatedNetworksMappings = networksMappings.filter(
    targetNetworkWithSourceNetworks =>
      targetNetworkWithSourceNetworks.id !== targetNetworkToRemove.id
  );
  return updatedNetworksMappings.length === 0
    ? null
    : {
        ...targetCluster,
        nodes: updatedNetworksMappings
      };
};

export const mappingWithSourceNetworkRemoved = (
  networksMapping,
  sourceNetworkToRemove
) => {
  const { nodes: sourceNetworks, ...targetNetwork } = networksMapping;
  const updatedSourceNetworks = sourceNetworks.filter(
    sourceNetwork => sourceNetwork.uid_ems !== sourceNetworkToRemove.uid_ems
  );
  return updatedSourceNetworks.length === 0
    ? null
    : {
        ...targetNetwork,
        nodes: updatedSourceNetworks
      };
};
