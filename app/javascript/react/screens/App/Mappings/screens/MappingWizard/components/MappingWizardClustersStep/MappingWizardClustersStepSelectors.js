import { CONVERSION_HOST_TYPES } from '../../../../../../../../common/constants';

export const sourceClustersFilter = (sourceClustersToFilter, clustersStepMappings) => {
  const mappedSourceClusters = clustersStepMappings.reduce(
    (sourceClusters, targetClusterWithSourceClusters) => sourceClusters.concat(targetClusterWithSourceClusters.nodes),
    []
  );

  return sourceClustersToFilter.filter(
    sourceCluster => !mappedSourceClusters.some(mappedSourceCluster => mappedSourceCluster.id === sourceCluster.id)
  );
};

export const conversionHostsFilter = (conversionHosts, providerType) =>
  conversionHosts.filter(host => host.resource && host.resource.type === CONVERSION_HOST_TYPES[providerType]);
