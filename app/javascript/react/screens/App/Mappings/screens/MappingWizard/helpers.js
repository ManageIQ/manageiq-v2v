import Immutable from 'seamless-immutable';
import { TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES } from './MappingWizardConstants';

export const mappingUrlRegex = /\/api\/\w{1,}\/\d{1,}/;

export const createTransformationMappings = (
  mappingWizardGeneralStep,
  mappingWizardClustersStep,
  mappingWizardDatastoresStep,
  mappingWizardNetworksStep
) => {
  const clusterTransformationMappings = mappingWizardClustersStep.values.clusterMappings.reduce(
    (clusterTransformationsArray, targetClusterWithSourceClusters) => {
      const destination = targetClusterWithSourceClusters.href.match(mappingUrlRegex)[0];
      const transformations = targetClusterWithSourceClusters.nodes.reduce(
        (clusterTransformations, sourceCluster) =>
          clusterTransformations.concat({
            source: sourceCluster.href.match(mappingUrlRegex)[0],
            destination
          }),
        []
      );
      return clusterTransformationsArray.concat(transformations);
    },
    []
  );

  const datastoreTransformationMappings = mappingWizardDatastoresStep.values.datastoresMappings.reduce(
    (datastoreTransformationsPerTargetCluster, targetClusterWithDatastoreMappings) => {
      const datastoreTransformationsForTargetCluster = targetClusterWithDatastoreMappings.nodes.reduce(
        (datastoreTransformationsPerDatastoreMapping, targetDatastoreWithSourceDatastores) => {
          const datastoreTransformations = targetDatastoreWithSourceDatastores.nodes.reduce(
            (transformations, sourceDatastore) =>
              transformations.concat({
                source: sourceDatastore.href.match(mappingUrlRegex)[0],
                destination: targetDatastoreWithSourceDatastores.href.match(mappingUrlRegex)[0]
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

  const networkTransformationMappings = mappingWizardNetworksStep.values.networksMappings.reduce(
    (networkTransformationsPerTargetCluster, targetClusterWithNetworkMappings) => {
      const networkTransformationsForTargetCluster = targetClusterWithNetworkMappings.nodes.reduce(
        (networkTransformationsPerNetworkMapping, targetNetworkWithSourceNetworks) => {
          const networkTransformations = targetNetworkWithSourceNetworks.nodes.reduce(
            (transformations, sourceNetwork) =>
              transformations.concat({
                source: sourceNetwork.href.match(mappingUrlRegex)[0],
                destination: targetNetworkWithSourceNetworks.href.match(mappingUrlRegex)[0]
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

export const groupClusterTransformationItemsByDestinationId = (transformationItems = []) =>
  transformationItems.reduce(
    (map, item) => ({
      ...map,
      [item.destination_id]: map[item.destination_id] ? [...map[item.destination_id], item.source_id] : [item.source_id]
    }),
    {}
  );

export const getTransformationMappingItemsBySourceType = (type, transformation) =>
  transformation.transformation_mapping_items.filter(item => item.source_type === type);

export const getTransformationMappingItemsByDestinationType = (type, transformation) =>
  transformation.transformation_mapping_items.filter(item => item.destination_type === type);

export const determineTargetProvider = transformation =>
  getTransformationMappingItemsByDestinationType(
    TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES.openstack.cluster,
    transformation
  ).length
    ? 'openstack'
    : 'rhevm';

export const sortBy = getValue => items =>
  Immutable(items ? Immutable.asMutable(items).sort((a, b) => (getValue(a) > getValue(b) ? 1 : -1)) : []);
