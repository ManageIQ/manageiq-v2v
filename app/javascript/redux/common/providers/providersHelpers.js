import { PROVIDERS } from '../providers/providersConstants';

export const sufficientProviders = (providers = []) =>
  providers.some(provider => PROVIDERS.source.includes(provider.type)) &&
  providers.some(provider => PROVIDERS.target.includes(provider.type));
