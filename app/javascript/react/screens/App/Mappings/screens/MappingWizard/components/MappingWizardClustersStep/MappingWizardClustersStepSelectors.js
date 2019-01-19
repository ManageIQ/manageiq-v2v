import { OPENSTACK_CONVERSION_HOST_TYPE } from './MappingWizardClustersStepConstants';

export const sourceClustersFilter = (sourceClustersToFilter, clustersStepMappings) => {
  const mappedSourceClusters = clustersStepMappings.reduce(
    (sourceClusters, targetClusterWithSourceClusters) => sourceClusters.concat(targetClusterWithSourceClusters.nodes),
    []
  );

  return sourceClustersToFilter.filter(
    sourceCluster => !mappedSourceClusters.some(mappedSourceCluster => mappedSourceCluster.id === sourceCluster.id)
  );
};

export const ospConversionHostsFilter = conversionHosts =>
  conversionHosts.filter(host => host.resource && host.resource.type === OPENSTACK_CONVERSION_HOST_TYPE);
