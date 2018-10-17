import URI from 'urijs';

import {
  getTransformationMappingItemsBySourceType,
  getTransformationMappingItemsByDestinationType
} from '../../../../helpers';
import API from '../../../../../../../../../../common/API';
import {
  TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES,
  TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES
} from '../../../../MappingWizardConstants';
import { QUERY_ATTRIBUTES, FETCH_STORAGE_URLS, STORAGE_ATTRIBUTES } from '../../MappingWizardDatastoresStepConstants';

export const datastoreUsedSpace = (datastore = {}) => datastore.total_space - datastore.free_space;

export const totalUsedSpace = (datastores = []) =>
  datastores.reduce((totalSpace, datastore) => (totalSpace += datastoreUsedSpace(datastore)), 0);

export const targetDatastoreAvailableSpace = (targetDatastore, datastoresStepMappings) => {
  const datastoresMappings = datastoresStepMappings.reduce(
    (mappings, targetClusterWithDatastoresMappings) => mappings.concat(targetClusterWithDatastoresMappings.nodes),
    []
  );

  const matchingDatastoresMapping = datastoresMappings.find(
    targetDatastoreWithSourceDatastores => targetDatastoreWithSourceDatastores.id === targetDatastore.id
  );

  if (datastoresMappings.length > 0 && matchingDatastoresMapping) {
    return targetDatastore.free_space - totalUsedSpace(matchingDatastoresMapping.nodes);
  }
  return targetDatastore.free_space;
};

export const sourceDatastoreInfo = sourceDatastore =>
  sprintf(__('%s \\ %s \\ %s'), sourceDatastore.providerName, sourceDatastore.datacenterName, sourceDatastore.name);

export const targetDatastoreInfo = targetDatastore =>
  sprintf(__('%s \\ %s'), targetDatastore.providerName, targetDatastore.name);

export const targetDatastoreTreeViewInfo = targetDatastore => targetDatastore.name;

export const targetDatastoreWithTreeviewAttrs = targetDatastore => ({
  ...targetDatastore,
  text: targetDatastoreTreeViewInfo(targetDatastore),
  selectable: true,
  selected: false,
  state: {
    expanded: true
  }
});

export const sourceDatastoreWithTreeviewAttrs = sourceDatastore => ({
  ...sourceDatastore,
  text: sourceDatastore.name,
  icon: 'fa fa-file-o',
  selectable: true,
  selected: false
});

export const errorMessage = __('The size of the selected source datastores exceeds the available space in the target datastore'); // prettier-ignore

export const removeSourceDatastore = (datastoresMapping, nodeToRemove) => {
  const { nodes: sourceDatastores, ...targetDatastore } = datastoresMapping;
  const updatedSourceDatastores = sourceDatastores.filter(sourceDatastore => sourceDatastore.id !== nodeToRemove.id);
  return updatedSourceDatastores.length === 0
    ? undefined
    : {
        ...targetDatastore,
        nodes: updatedSourceDatastores
      };
};

export const updateMappings = (targetClusterWithDatastoresMappings, nodeToRemove) => {
  const isTargetDatastore = nodeToRemove.nodes;
  const { nodes: datastoresMappings, ...targetCluster } = targetClusterWithDatastoresMappings;

  const updatedDatastoresMappings = isTargetDatastore
    ? datastoresMappings.filter(
        targetDatastoreWithSourceDatastores => targetDatastoreWithSourceDatastores.id !== nodeToRemove.id
      )
    : datastoresMappings
        .map(datastoresMapping => removeSourceDatastore(datastoresMapping, nodeToRemove))
        .filter(item => item !== undefined);

  return updatedDatastoresMappings.length === 0
    ? undefined
    : {
        ...targetCluster,
        nodes: updatedDatastoresMappings
      };
};

const getMappedTargetDatastores = (datastores, mappedDatastoreIds) =>
  datastores.filter(datastore => mappedDatastoreIds.some(id => id === datastore.id));

const getMappedSourceDatastores = (targetDatastore, sourceDatastores, transformation) => {
  const datastoreMappingItems = getTransformationMappingItemsBySourceType(
    TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES.datastore,
    transformation
  );
  return sourceDatastores.filter(sourceDatastore =>
    datastoreMappingItems.some(
      item => item.destination_id === targetDatastore.id && item.source_id === sourceDatastore.id
    )
  );
};

const clusterWithStoragesUrl = (id, provider) => {
  const uri = new URI(`${FETCH_STORAGE_URLS[provider]}/${id}`);
  uri.addSearch({ attributes: QUERY_ATTRIBUTES[provider] });

  return uri.toString();
};

const targetDatastorePromises = (targetClusterIds, targetProvider) =>
  targetClusterIds.map(
    id =>
      new Promise((resolve, reject) => {
        API.get(clusterWithStoragesUrl(id, targetProvider))
          .then(res => {
            resolve(res.data);
          })
          .catch(e => reject(e));
      })
  );

const sourceDatastorePromises = sourceClusterIds =>
  sourceClusterIds.map(
    id =>
      new Promise((resolve, reject) => {
        API.get(clusterWithStoragesUrl(id, 'source'))
          .then(res => {
            resolve(res.data.storages.map(storage => ({ ...storage, sourceClusterId: id })));
          })
          .catch(e => reject(e));
      })
  );

export const createDatastoresMappings = (transformation, targetProvider) =>
  new Promise((resolve, reject) => {
    const targetClusterIds = getTransformationMappingItemsByDestinationType(
      TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES[targetProvider].cluster,
      transformation
    ).map(item => item.destination_id);
    const sourceClusterIds = getTransformationMappingItemsBySourceType(
      TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES.cluster,
      transformation
    ).map(item => item.source_id);
    const targetDatastoreIds = getTransformationMappingItemsByDestinationType(
      TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES[targetProvider].datastore,
      transformation
    ).map(item => item.destination_id);

    Promise.all([
      ...targetDatastorePromises(targetClusterIds, targetProvider),
      ...sourceDatastorePromises(sourceClusterIds)
    ])
      .then(res => {
        const datastoresMappings = [];
        const targetClustersWithDatastores = res.filter(resolvedPromise => !resolvedPromise.length);
        const sourceDatastores = res.reduce((datastores, resolvedPromise) => {
          if (resolvedPromise.length) {
            return [...datastores, ...resolvedPromise];
          }
          return datastores;
        }, []);
        targetClustersWithDatastores.forEach(mapping => {
          const nodes = getMappedTargetDatastores(mapping[STORAGE_ATTRIBUTES[targetProvider]], targetDatastoreIds).map(
            targetDatastore => ({
              ...targetDatastoreWithTreeviewAttrs(targetDatastore),
              nodes: getMappedSourceDatastores(targetDatastore, sourceDatastores, transformation).map(datastore =>
                sourceDatastoreWithTreeviewAttrs(datastore)
              )
            })
          );

          datastoresMappings.push({
            ...mapping,
            text: mapping.name,
            selectable: false,
            state: {
              expanded: true
            },
            nodes
          });
        });

        resolve(datastoresMappings);
      })
      .catch(e => reject(e));
  });
