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
import {
  QUERY_ATTRIBUTES,
  FETCH_NETWORK_URLS,
  NETWORK_ATTRIBUTES,
  HAS_CLOUD_NETWORKS
} from '../../MappingWizardNetworksStepConstants';
import { uniqueNetworks, combineNetworks } from '../../MappingWizardNetworksStepSelectors';
import { networkKey } from '../../../../../../../common/networkKey';

export const getRepresentatives = (groupedNetworks = {}) => {
  const representatives = [];
  for (const key in groupedNetworks) {
    if ({}.hasOwnProperty.call(groupedNetworks, key)) {
      representatives.push(groupedNetworks[key][0]);
    }
  }
  return representatives;
};

export const sourceNetworksFilter = (groupedSourceNetworks, networksStepMappings) => {
  const mappedNetworks = networksStepMappings.reduce((mappedNetworksArray, targetClusterWithNetworkMappings) => {
    const sourceNetworks = targetClusterWithNetworkMappings.nodes.reduce(
      (networks, networkMapping) => [...networks, ...networkMapping.nodes],
      []
    );
    return [...mappedNetworksArray, ...sourceNetworks];
  }, []);

  return getRepresentatives(groupedSourceNetworks).filter(
    network => !mappedNetworks.some(mappedNetwork => networkKey(mappedNetwork) === networkKey(network))
  );
};

export const sourceNetworkInfo = (sourceNetwork, selectedCluster) =>
  `${sourceNetwork.providerName} \\ ${selectedCluster.v_parent_datacenter} \\ ${sourceNetwork.name}`;

export const targetNetworkInfo = targetNetwork => `${targetNetwork.providerName} \\ ${targetNetwork.name}`;

export const clustersMappingWithTreeViewAttrs = clusterMapping => ({
  ...clusterMapping,
  text: clusterMapping.name,
  selectable: false
});

export const targetNetworkWithTreeViewAttrs = targetNetwork => ({
  ...targetNetwork,
  text: `${targetNetwork.providerName} \\ ${targetNetwork.name}`,
  selectable: true,
  selected: false,
  state: {
    expanded: true
  }
});

export const sourceNetworkWithTreeViewAttrs = (sourceNetwork, selectedCluster) => ({
  ...sourceNetwork,
  text: `${sourceNetwork.providerName} \\ ${sourceNetwork.name}`,
  icon: 'fa fa-file-o',
  sourceClusterId: selectedCluster.id,
  selectable: true,
  selected: false
});

export const networkGroupingForRep = (sourceNetworkRep, groupedSourceNetworks, selectedCluster) => {
  const sourceNetworks = groupedSourceNetworks[networkKey(sourceNetworkRep)];
  return sourceNetworks.map(sourceNetwork => sourceNetworkWithTreeViewAttrs(sourceNetwork, selectedCluster));
};

export const dedupeMappedSourceNetworks = networksMapping => {
  const { nodes: sourceNetworks, ...targetNetwork } = networksMapping;
  const groupedNetworks = uniqueNetworks(sourceNetworks);
  return {
    ...targetNetwork,
    nodes: getRepresentatives(groupedNetworks)
  };
};

export const dedupeMappedTargetNetworks = networksStepMapping => {
  const { nodes: networksMappings, ...targetCluster } = networksStepMapping;
  const groupedMappings = uniqueNetworks(networksMappings);
  return {
    ...targetCluster,
    nodes: getRepresentatives(groupedMappings)
  };
};

export const mappingsForTreeView = mappings =>
  mappings.reduce((updatedMappings, networksStepMapping) => {
    const { nodes: networksMappings } = dedupeMappedTargetNetworks(networksStepMapping);
    const updatedNetworksMappings = networksMappings.reduce(
      (dedupedMappings, networksMapping) => [...dedupedMappings, dedupeMappedSourceNetworks(networksMapping)],
      []
    );
    const updatedMapping = {
      ...networksStepMapping,
      nodes: updatedNetworksMappings
    };
    return [...updatedMappings, updatedMapping];
  }, []);

export const mappingWithTargetNetworkRemoved = (networksStepMapping, targetNetworkToRemove) => {
  const { nodes: networksMappings, ...targetCluster } = networksStepMapping;
  const updatedNetworksMappings = networksMappings.filter(
    targetNetworkWithSourceNetworks => targetNetworkWithSourceNetworks.id !== targetNetworkToRemove.id
  );
  return updatedNetworksMappings.length === 0
    ? null
    : {
        ...targetCluster,
        nodes: updatedNetworksMappings
      };
};

export const mappingWithSourceNetworkRemoved = (networksMapping, sourceNetworkToRemove) => {
  const { nodes: sourceNetworks, ...targetNetwork } = networksMapping;
  const updatedSourceNetworks = sourceNetworks.filter(
    sourceNetwork => networkKey(sourceNetwork) !== networkKey(sourceNetworkToRemove)
  );
  return updatedSourceNetworks.length === 0
    ? null
    : {
        ...targetNetwork,
        nodes: updatedSourceNetworks
      };
};

const getMappedTargetNetworks = (networks, mappedNetworkIds) =>
  networks.filter(network => mappedNetworkIds.some(id => id === network.id));

const getMappedSourceNetworks = (targetNetwork, sourceNetworks, transformation) => {
  const networkMappingItems = getTransformationMappingItemsBySourceType(
    TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES.network,
    transformation
  );
  return sourceNetworks.filter(sourceNetwork =>
    networkMappingItems.some(item => item.destination_id === targetNetwork.id && item.source_id === sourceNetwork.id)
  );
};

const clusterWithNetworksUrl = (id, provider) => {
  const uri = new URI(`${FETCH_NETWORK_URLS[provider]}/${id}`);
  uri.addSearch({ attributes: QUERY_ATTRIBUTES[provider] });

  return uri.toString();
};

const targetNetworkPromises = (targetClusterIds, targetProvider) =>
  targetClusterIds.map(
    id =>
      new Promise((resolve, reject) => {
        API.get(clusterWithNetworksUrl(id, targetProvider))
          .then(res => {
            const updatedTargetNetworks = res.data[NETWORK_ATTRIBUTES[targetProvider]].map(targetNetwork => ({
              ...targetNetwork,
              clusterId: id,
              providerName: res.data.ext_management_system.name
            }));
            resolve({ ...res.data, [NETWORK_ATTRIBUTES[targetProvider]]: updatedTargetNetworks });
          })
          .catch(e => reject(e));
      })
  );

const sourceNetworkPromises = sourceClusterIds =>
  sourceClusterIds.map(
    id =>
      new Promise((resolve, reject) => {
        API.get(clusterWithNetworksUrl(id, 'source'))
          .then(res => {
            resolve(
              res.data.lans.map(lan => ({
                ...lan,
                sourceClusterId: id,
                clusterId: id,
                providerName: res.data.ext_management_system.name
              }))
            );
          })
          .catch(e => reject(e));
      })
  );

const publicNetworksUrl = targetProviderId => {
  const uri = new URI(`${FETCH_NETWORK_URLS.public}/${targetProviderId}/cloud_networks`);
  uri.addSearch({ expand: 'resources' });
  return uri.toString();
};

const publicNetworksPromises = (clusterMappings, targetProvider) => {
  if (!HAS_CLOUD_NETWORKS[targetProvider]) return [Promise.resolve([])];
  return clusterMappings.map(
    mapping =>
      new Promise((resolve, reject) => {
        API.get(publicNetworksUrl(mapping.ext_management_system.id))
          .then(res =>
            resolve(
              res.data.resources.map(network => ({
                ...network,
                providerName: mapping.ext_management_system.name,
                clusterId: mapping.id
              }))
            )
          )
          .catch(e => reject(e));
      })
  );
};

export const createNetworksMappings = (transformation, targetProvider, clusterMappings) =>
  new Promise((resolve, reject) => {
    const targetClusterIds = getTransformationMappingItemsByDestinationType(
      TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES[targetProvider].cluster,
      transformation
    ).map(item => item.destination_id);
    const sourceClusterIds = getTransformationMappingItemsBySourceType(
      TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES.cluster,
      transformation
    ).map(item => item.source_id);
    const targetNetworkIds = getTransformationMappingItemsByDestinationType(
      TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES[targetProvider].network,
      transformation
    ).map(item => item.destination_id);

    Promise.all([
      Promise.all(targetNetworkPromises(targetClusterIds, targetProvider)),
      Promise.all(sourceNetworkPromises(sourceClusterIds)),
      Promise.all(publicNetworksPromises(clusterMappings, targetProvider))
    ])
      .then(res => {
        const networksMappings = [];
        const [targetClustersWithNetworks, sourceNetworkResults, publicNetworksResults] = res;
        const sourceNetworks = sourceNetworkResults.reduce(
          (networks, resolvedPromise) => [...networks, ...resolvedPromise],
          []
        );
        const publicNetworks = publicNetworksResults.reduce(
          (networks, resolvedPromise) => [...networks, ...resolvedPromise],
          []
        );
        targetClustersWithNetworks.forEach(mapping => {
          const privateNetworks = mapping[NETWORK_ATTRIBUTES[targetProvider]];
          const nodes = getMappedTargetNetworks(combineNetworks(privateNetworks, publicNetworks), targetNetworkIds).map(
            targetNetwork => ({
              ...targetNetworkWithTreeViewAttrs(targetNetwork),
              nodes: getMappedSourceNetworks(targetNetwork, sourceNetworks, transformation).map(network =>
                sourceNetworkWithTreeViewAttrs(network, { id: network.sourceClusterId })
              )
            })
          );

          networksMappings.push({
            ...mapping,
            text: mapping.name,
            selectable: false,
            state: {
              expanded: true
            },
            nodes
          });
        });

        resolve(networksMappings);
      })
      .catch(e => reject(e));
  });
