import Immutable from 'seamless-immutable';
import { networkKey } from '../../../common/networkKey';

export const getMappingType = transformation_mapping_items => {
  const isOSPMapping =
    transformation_mapping_items.some(item => item.destination_type === 'CloudTenant') &&
    transformation_mapping_items.some(item => item.destination_type === 'CloudVolumeType') &&
    transformation_mapping_items.some(item => item.destination_type === 'CloudNetwork');
  if (isOSPMapping) return 'OSP';
  return 'RHV';
};

export const getHeaderText = transformation_mapping_items => {
  const mappingType = getMappingType(transformation_mapping_items);
  if (mappingType === 'OSP') {
    return {
      sourceNetworks: __('Source Provider \\ Datacenter \\ Network'),
      targetNetworks: __('Target Project \\ Network'),
      sourceDatastores: __('Source Provider \\ Datacenter \\ Datastore'),
      targetDatastores: __('Target Project \\ Volume Type'),
      sourceClusters: __('Source Provider \\ Datacenter \\ Cluster'),
      targetClusters: __('Target Provider \\ Project')
    };
  }
  return {
    sourceNetworks: __('Source Networks'),
    targetNetworks: __('Target Networks'),
    sourceDatastores: __('Source Datastores'),
    targetDatastores: __('Target Datastores'),
    sourceClusters: __('Source Clusters'),
    targetClusters: __('Target Clusters')
  };
};

export const mapInfrastructureMappings = (transformation_mapping_items, clusters, datastores, networks) => {
  /**
   * map the target source -> destination clusters/networks/datastores for
   * display on the infrastructure mappings list view
   *
   * SQL-JOIN-MIQ-IN-JS ;)
   *
   * results in the following structure:
   * {
   *  targetClusters: {
   *    `clusterId`: {
   *      targetCluster: {...},
   *      sourceClusters: [{...}]
   *    }
   *  },
   *  targetDatastores: {
   *   `datastoreId`: {
   *     target: {
   *       targetCluster: {...},
   *       targetDatastore: {...}
   *     },
   *     sources: [
   *       {
   *         sourceDatastore: {...},
   *         sourceCluster: {...}
   *       }
   *     ]
   *   }
   *  }
   *  targetNetworks: {
   *   `networkId`: {
   *     target: {
   *       targetCluster: {...},
   *       targetNetwork: {...}
   *     },
   *     sources: [
   *       {
   *         sourceNetwork: {...},
   *         sourceCluster: {...}
   *       }
   *     ]
   *   }
   *  }
   * }
   *
   */
  const clusterMappingItems = transformation_mapping_items.filter(item => {
    const destination = item.destination_type.toLowerCase();
    return destination === 'emscluster' || destination === 'cloudtenant';
  });
  const datastoreMappingItems = transformation_mapping_items.filter(item => {
    const destination = item.destination_type.toLowerCase();
    return destination === 'storage' || destination === 'cloudvolumetype';
  });
  const networkMappingItems = transformation_mapping_items.filter(item => {
    const destination = item.destination_type.toLowerCase();
    return destination === 'lan' || destination === 'cloudnetwork';
  });

  // create unique cluster mappings by unique target cluster
  const targetClusters = {};
  for (const clusterMapping of clusterMappingItems) {
    const sourceCluster = clusters.find(c => c.id === clusterMapping.source_id);
    const targetCluster = clusters.find(c => c.id === clusterMapping.destination_id);

    if (sourceCluster && targetCluster) {
      if (targetClusters[targetCluster.id]) {
        targetClusters[targetCluster.id].sourceClusters.push(sourceCluster);
      } else {
        targetClusters[targetCluster.id] = {};
        targetClusters[targetCluster.id].targetCluster = targetCluster;
        targetClusters[targetCluster.id].sourceClusters = [sourceCluster];
      }
    } else {
      // we have missing cluster data, just return null and show missing data
      return {
        targetClusters: null,
        targetDatastores: null,
        targetNetworks: null
      };
    }
  }

  // transform cluster lans and datastores to key/value lookups for use in datastore/lan mappings
  const clusterDatastores = {};
  const clusterLans = {};
  clusters.forEach(cluster => {
    if (cluster.storages && cluster.storages.length) {
      cluster.storages.forEach(datastore => {
        clusterDatastores[datastore.id] = cluster.id;
      });
    }
    if (cluster.lans && cluster.lans.length) {
      cluster.lans.forEach(lan => {
        clusterLans[lan.id] = cluster.id;
      });
    }
  });

  // create unique datastore mappings by unique target datastore
  const targetDatastores = {};
  let missingDatastores = false;
  for (const datastoreMapping of datastoreMappingItems) {
    const sourceCluster = clusters.find(c => c.id === clusterDatastores[datastoreMapping.source_id]);
    const targetCluster = clusters.find(c => c.id === clusterDatastores[datastoreMapping.destination_id]);
    const sourceDatastore = datastores.find(d => d.id === datastoreMapping.source_id);
    const targetDatastore = datastores.find(d => d.id === datastoreMapping.destination_id);

    if (sourceCluster && targetCluster && sourceDatastore && targetDatastore) {
      const source = {
        sourceDatastore,
        sourceCluster
      };
      const target = {
        targetDatastore,
        targetCluster
      };
      if (targetDatastores[targetDatastore.id]) {
        targetDatastores[targetDatastore.id].sources.push(source);
      } else {
        targetDatastores[targetDatastore.id] = {};
        targetDatastores[targetDatastore.id].target = target;
        targetDatastores[targetDatastore.id].sources = [source];
      }
    } else {
      missingDatastores = true;
      break;
    }
  }

  // create unique networks mappings by unique target network
  const targetNetworks = {};
  let missingNetworks = false;
  for (const networkMapping of networkMappingItems) {
    if (!(networkMapping.source_id in clusterLans)) {
      missingNetworks = true;
      break;
    }
    if (!(networkMapping.destination_id in clusterLans)) {
      missingNetworks = true;
      break;
    }
    const sourceCluster = clusters.find(c => c.id === clusterLans[networkMapping.source_id]);
    const targetCluster = clusters.find(c => c.id === clusterLans[networkMapping.destination_id]);
    const sn = networks.find(d => d.id === networkMapping.source_id);
    const tn = networks.find(d => d.id === networkMapping.destination_id);

    if (sourceCluster && targetCluster && sn && tn) {
      const sourceNetwork = Immutable.set(sn, 'clusterId', sourceCluster.id);
      const targetNetwork = Immutable.set(tn, 'clusterId', targetCluster.id);
      const source = {
        sourceNetwork,
        sourceCluster
      };

      const target = {
        targetNetwork,
        targetCluster
      };

      const targetNetworkKey = networkKey(targetNetwork);
      if (targetNetworks[targetNetworkKey]) {
        const duplicatedLanIndex = targetNetworks[targetNetworkKey].sources.findIndex(
          s => networkKey(s.sourceNetwork) === networkKey(sourceNetwork)
        );
        if (duplicatedLanIndex === -1) {
          targetNetworks[targetNetworkKey].sources.push(source);
        }
      } else {
        targetNetworks[targetNetworkKey] = {};
        targetNetworks[targetNetworkKey].target = target;
        targetNetworks[targetNetworkKey].sources = [source];
      }
    } else {
      missingNetworks = true;
      break;
    }
  }

  return {
    targetClusters,
    targetDatastores: missingDatastores ? null : targetDatastores,
    targetNetworks: missingNetworks ? null : targetNetworks
  };
};
