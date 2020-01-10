import { PROVIDERS } from '../providers/providersConstants';

export const checkSourceProviders = (providers = []) =>
  providers.some(provider => PROVIDERS.source.includes(provider.type));
export const checkTargetProviders = (providers = []) =>
  providers.some(provider => PROVIDERS.target.includes(provider.type));

export const sufficientProviders = (providers = []) =>
  checkSourceProviders(providers) && checkTargetProviders(providers);
