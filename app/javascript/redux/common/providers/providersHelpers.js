import { PROVIDERS } from '../providers/providersConstants';

export const sufficientProviders = (providers = []) =>
  providers.some(provider => PROVIDERS.source.includes(provider.type)) &&
  providers.some(provider => PROVIDERS.target.includes(provider.type));

export const hasRsaKey = provider => {
  const { authentications } = provider;

  if (!authentications) {
    return false;
  }

  return authentications.some(auth => auth.authtype === 'ssh_keypair');
};
