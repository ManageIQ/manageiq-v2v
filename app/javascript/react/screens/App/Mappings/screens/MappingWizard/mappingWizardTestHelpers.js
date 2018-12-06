export const constructClusterMappings = (targetCluster, sourceClusters = []) => [
  {
    ...targetCluster,
    nodes: sourceClusters
  }
];
