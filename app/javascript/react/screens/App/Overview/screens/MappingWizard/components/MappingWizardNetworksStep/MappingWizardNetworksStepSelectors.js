import { networkKey } from '../../../../../common/networkKey';

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
