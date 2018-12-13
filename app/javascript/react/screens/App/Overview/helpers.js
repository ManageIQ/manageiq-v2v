import getMostRecentRequest from '../common/getMostRecentRequest';
import { PROVIDERS } from './OverviewConstants';
import { TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES } from '../Mappings/screens/MappingWizard/MappingWizardConstants';

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

export const attachTargetProvider = (plan, providers, clusters, targetProviderType) => {
  if (!plan.transformation_mapping) {
    return plan;
  }

  const {
    transformation_mapping: { transformation_mapping_items }
  } = plan;
  const clusterMapping = transformation_mapping_items.find(
    item => item.destination_type === TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES[targetProviderType].cluster
  );
  const targetCluster = clusters.find(cluster => cluster.id === clusterMapping.destination_id);
  const targetProvider = providers.find(provider => provider.id === targetCluster.ems_id);

  return { ...plan, targetProvider };
};

export const hasRsaKey = provider => {
  const { authentications } = provider;

  if (!authentications) {
    return false;
  }

  return authentications.some(auth => auth.authtype === 'ssh_keypair');
};
