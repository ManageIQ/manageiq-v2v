export const createTransformationMappings = (
  mappingWizardGeneralStep,
  mappingWizardClustersStep,
  mappingWizardDatastoresStep,
  mappingWizardNetworksStep
) => {
  const clustersUrlRegEx = /\/api\/clusters\/\d{1,}/;
  const clusterTransformationMappings = mappingWizardClustersStep.values.clusterMappings.reduce(
    (clusterTransformationsArray, targetClusterWithSourceClusters) => {
      const destination = targetClusterWithSourceClusters.href.match(clustersUrlRegEx)[0];
      const transformations = targetClusterWithSourceClusters.nodes.reduce(
        (clusterTransformations, sourceCluster) =>
          clusterTransformations.concat({
            source: sourceCluster.href.match(clustersUrlRegEx)[0],
            destination
          }),
        []
      );
      return clusterTransformationsArray.concat(transformations);
    },
    []
  );

  const datastoresUrlRegEx = /\/api\/data_stores\/\d{1,}/;
  const datastoreTransformationMappings = mappingWizardDatastoresStep.values.datastoresMappings.reduce(
    (datastoreTransformationsPerTargetCluster, targetClusterWithDatastoreMappings) => {
      const datastoreTransformationsForTargetCluster = targetClusterWithDatastoreMappings.nodes.reduce(
        (datastoreTransformationsPerDatastoreMapping, targetDatastoreWithSourceDatastores) => {
          const datastoreTransformations = targetDatastoreWithSourceDatastores.nodes.reduce(
            (transformations, sourceDatastore) =>
              transformations.concat({
                source: sourceDatastore.href.match(datastoresUrlRegEx)[0],
                destination: targetDatastoreWithSourceDatastores.href.match(datastoresUrlRegEx)[0]
              }),
            []
          );
          return datastoreTransformationsPerDatastoreMapping.concat(datastoreTransformations);
        },
        []
      );
      return datastoreTransformationsPerTargetCluster.concat(datastoreTransformationsForTargetCluster);
    },
    []
  );

  const networksUrlRegEx = /\/api\/lans\/\d{1,}/;
  const networkTransformationMappings = mappingWizardNetworksStep.values.networksMappings.reduce(
    (networkTransformationsPerTargetCluster, targetClusterWithNetworkMappings) => {
      const networkTransformationsForTargetCluster = targetClusterWithNetworkMappings.nodes.reduce(
        (networkTransformationsPerNetworkMapping, targetNetworkWithSourceNetworks) => {
          const networkTransformations = targetNetworkWithSourceNetworks.nodes.reduce(
            (transformations, sourceNetwork) =>
              transformations.concat({
                source: sourceNetwork.href.match(networksUrlRegEx)[0],
                destination: targetNetworkWithSourceNetworks.href.match(networksUrlRegEx)[0]
              }),
            []
          );
          return networkTransformationsPerNetworkMapping.concat(networkTransformations);
        },
        []
      );
      return networkTransformationsPerTargetCluster.concat(networkTransformationsForTargetCluster);
    },
    []
  );

  return {
    name: mappingWizardGeneralStep.values.name,
    description: mappingWizardGeneralStep.values.description,
    state: 'draft',
    transformation_mapping_items: [
      ...clusterTransformationMappings,
      ...datastoreTransformationMappings,
      ...networkTransformationMappings
    ]
  };
};

export const getMappedSourceClusters = clusterMappings =>
  clusterMappings.reduce(
    (sourceClusters, targetClusterWithSourceClusters) => sourceClusters.concat(targetClusterWithSourceClusters.nodes),
    []
  );

export const getSourceClustersWithMappings = mappings =>
  mappings.reduce((idsPerTargetCluster, targetClusterWithMappings) => {
    const idsForTargetCluster = targetClusterWithMappings.nodes.reduce(
      (idsPerMapping, targetObjectWithSourceObjects) => {
        const idsForSourceObjects = targetObjectWithSourceObjects.nodes.map(
          sourceObject => sourceObject.sourceClusterId
        );
        return idsPerMapping.concat(Array.from(new Set(idsForSourceObjects)));
      },
      []
    );
    return idsPerTargetCluster.concat(Array.from(new Set(idsForTargetCluster)));
  }, []);
