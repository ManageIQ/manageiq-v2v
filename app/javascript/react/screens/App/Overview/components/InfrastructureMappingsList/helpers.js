import Immutable from 'seamless-immutable';
import { networkKey } from '../../../common/networkKey';

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
  const clusterMappingItems = transformation_mapping_items.filter(
    item => item.destination_type.toLowerCase() === 'emscluster'
  );
  const datastoreMappingItems = transformation_mapping_items.filter(
    item => item.destination_type.toLowerCase() === 'storage'
  );
  const networkMappingItems = transformation_mapping_items.filter(
    item => item.destination_type.toLowerCase() === 'lan'
  );

  // create unique cluster mappings by unique target cluster
  const targetClusters = {};
  clusterMappingItems.forEach(clusterMapping => {
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
    }
  });

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
  datastoreMappingItems.forEach(datastoreMapping => {
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
    }
  });

  // create unique networks mappings by unique target network
  const targetNetworks = {};
  networkMappingItems.forEach(networkMapping => {
    const sourceCluster = clusters.find(c => c.id === clusterLans[networkMapping.source_id]);
    const targetCluster = clusters.find(c => c.id === clusterLans[networkMapping.destination_id]);

    const sn = networks.find(d => d.id === networkMapping.source_id);
    const sourceNetwork = Immutable.set(sn, 'clusterId', sourceCluster.id);

    const tn = networks.find(d => d.id === networkMapping.destination_id);
    const targetNetwork = Immutable.set(tn, 'clusterId', targetCluster.id);

    if (sourceCluster && targetCluster && sourceNetwork && targetNetwork) {
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
    }
  });

  return {
    targetClusters,
    targetDatastores,
    targetNetworks
  };
};
