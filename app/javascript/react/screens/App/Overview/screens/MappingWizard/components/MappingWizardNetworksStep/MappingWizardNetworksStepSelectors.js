export const sourceNetworksFilter = (
  networksToFilter,
  networksStepMappings
) => {
  const mappedNetworks = networksStepMappings.reduce(
    (mappedNetworksArray, targetClusterWithNetworkMappings) => {
      const sourceNetworks = targetClusterWithNetworkMappings.nodes.reduce(
        (networks, networkMapping) => networks.concat(networkMapping.nodes),
        []
      );
      return mappedNetworksArray.concat(sourceNetworks);
    },
    []
  );

  return networksToFilter.filter(
    network =>
      !mappedNetworks.some(mappedNetwork => mappedNetwork.id === network.id)
  );
};
