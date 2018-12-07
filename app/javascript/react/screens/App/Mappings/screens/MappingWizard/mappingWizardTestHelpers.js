export const constructClusterMappings = (targetCluster, sourceClusters = []) => [
  {
    ...targetCluster,
    nodes: sourceClusters
  }
];

export const constructDatastoreOrNetworkMappings = (targetCluster, target, sources) => [
  {
    ...targetCluster,
    nodes: [{ ...target, nodes: sources }]
  }
];
