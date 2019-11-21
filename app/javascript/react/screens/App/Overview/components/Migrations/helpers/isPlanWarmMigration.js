const isPlanWarmMigration = plan =>
  plan != null && plan.options && plan.options.config_info && plan.options.config_info.warm_migration;

export default isPlanWarmMigration;
