import getMostRecentRequest from '../common/getMostRecentRequest';
import { PROVIDERS } from './OverviewConstants';

export const planTransmutation = (plans = [], mappings = []) =>
  plans.map(plan => {
    const request = getMostRecentRequest(plan.miq_requests);
    return {
      ...plan,
      infraMappingName: plan.transformation_mapping && plan.transformation_mapping.name,
      status: request ? request.status : null,
      configVmLength: plan.options.config_info.actions.length,
      scheduleTime: plan.schedules ? new Date(plan.schedules[0].run_at.start_time).getTime() : null
    };
  });

export const sufficientProviders = (providers = []) =>
  providers.some(provider => PROVIDERS.source.includes(provider.type)) &&
  providers.some(provider => PROVIDERS.target.includes(provider.type));
