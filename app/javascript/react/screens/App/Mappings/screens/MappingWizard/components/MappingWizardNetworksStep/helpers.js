export const normalizeCloudNetworkHref = network => {
  const normalizedHref = network.href && network.href.replace(/\/providers\/\d+/, '');

  return { ...network, href: normalizedHref };
};
