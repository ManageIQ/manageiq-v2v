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

  // transform cluster mappings to key/value
  const clustersByMappingId = {};
  clusterMappingItems.forEach(cluster => {
    clustersByMappingId[cluster.transformation_mapping_id] = cluster;
  });

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

  // create unique datastore mappings by unique target datastore
  const targetDatastores = {};
  datastoreMappingItems.forEach(datastoreMapping => {
    const clusterMapping = clustersByMappingId[datastoreMapping.transformation_mapping_id];
    const sourceCluster = clusters.find(c => c.id === clusterMapping.source_id);
    const targetCluster = clusters.find(c => c.id === clusterMapping.destination_id);
    const sourceDatastore = datastores.find(d => d.id === datastoreMapping.source_id);
    const targetDatastore = datastores.find(d => d.id === datastoreMapping.destination_id);

    if (clusterMapping && sourceCluster && targetCluster && sourceDatastore && targetDatastore) {
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

  // create unique networks mappings by unique target network (using ems_uid)
  const targetNetworks = {};
  networkMappingItems.forEach(networkMapping => {
    const clusterMapping = clustersByMappingId[networkMapping.transformation_mapping_id];
    const sourceCluster = clusters.find(c => c.id === clusterMapping.source_id);
    const targetCluster = clusters.find(c => c.id === clusterMapping.destination_id);
    const sourceNetwork = networks.find(d => d.id === networkMapping.source_id);
    const targetNetwork = networks.find(d => d.id === networkMapping.destination_id);

    if (clusterMapping && sourceCluster && targetCluster && sourceNetwork && targetNetwork) {
      const source = {
        sourceNetwork,
        sourceCluster
      };

      const target = {
        targetNetwork,
        targetCluster
      };
      // LANs are currently duplicated in the backend database model, so
      // we dedupe them using uid_ems attribute for now.
      if (targetNetworks[targetNetwork.uid_ems]) {
        const duplicatedLanIndex = targetNetworks[targetNetwork.uid_ems].sources.findIndex(
          s => s.sourceNetwork.uid_ems === sourceNetwork.uid_ems
        );
        if (duplicatedLanIndex === -1) {
          targetNetworks[targetNetwork.uid_ems].sources.push(source);
        }
      } else {
        targetNetworks[targetNetwork.uid_ems] = {};
        targetNetworks[targetNetwork.uid_ems].target = target;
        targetNetworks[targetNetwork.uid_ems].sources = [source];
      }
    }
  });

  return {
    targetClusters,
    targetDatastores,
    targetNetworks
  };
};
