import getMostRecentRequest from '../common/getMostRecentRequest';

export const planTransmutation = (plans = [], mappings = []) =>
  plans.map(plan => {
    const infraMappingName = mappings.find(
      mapping => mapping.id === plan.options.config_info.transformation_mapping_id
    );
    const request = getMostRecentRequest(plan.miq_requests);
    return {
      ...plan,
      infraMappingName: infraMappingName ? infraMappingName.name : null,
      status: request ? request.status : null,
      configVmLength: plan.options.config_info.actions.length,
      scheduleTime: plan.schedules ? new Date(plan.schedules[0].run_at.start_time).getTime() : null
    };
  });
