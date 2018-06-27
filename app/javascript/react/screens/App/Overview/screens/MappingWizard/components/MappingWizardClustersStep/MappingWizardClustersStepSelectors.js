export const sourceClustersFilter = (sourceClustersToFilter, clustersStepMappings) => {
  const mappedSourceClusters = clustersStepMappings.reduce(
    (sourceClusters, targetClusterWithSourceClusters) => sourceClusters.concat(targetClusterWithSourceClusters.nodes),
    []
  );

  return sourceClustersToFilter.filter(
    sourceCluster => !mappedSourceClusters.some(mappedSourceCluster => mappedSourceCluster.id === sourceCluster.id)
  );
};
