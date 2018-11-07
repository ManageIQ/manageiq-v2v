import { networkKey } from '../../../../../common/networkKey';
import { normalizeCloudNetworkHref } from './helpers';

export const uniqueNetworks = (networks = []) =>
  networks.reduce(
    (networksMap, network) => ({
      ...networksMap,
      [networkKey(network)]: networksMap[networkKey(network)]
        ? [...networksMap[networkKey(network)], network]
        : [network]
    }),
    {}
  );

export const combineNetworks = (privateNetworks, publicNetworks) => {
  const normalizedPublicNetworks = publicNetworks.filter(network => network.shared).map(normalizeCloudNetworkHref);

  return [...normalizedPublicNetworks, ...privateNetworks].reduce((networks, network) => {
    const networkIsDuplicate = networks.some(ntwk => ntwk.id === network.id);

    if (networkIsDuplicate) {
      return networks;
    }

    return [...networks, network];
  }, []);
};
