export const getClusterOptions = clusterMappings => {
  const sourceClustersWithAssociatedTargetClusters = clusterMappings.reduce(
    (mappings, targetClusterWithSourceClusters) => {
      const { nodes: sourceClusters, ...targetCluster } = targetClusterWithSourceClusters;
      const sourceToTargetMappings = sourceClusters.map(sourceCluster => ({
        sourceCluster,
        targetCluster,
        sourceClusterMappedToTargetCluster: {
          name: `${sourceCluster.name} (${targetCluster.name})`,
          id: sourceCluster.id
        }
      }));
      return mappings.concat(sourceToTargetMappings);
    },
    []
  );

  return sourceClustersWithAssociatedTargetClusters.map(
    ({ sourceClusterMappedToTargetCluster }) => sourceClusterMappedToTargetCluster
  );
};
