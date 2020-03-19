const getPlanScheduleInfo = ({ plan, planRequest = null }) => {
  const migrationScheduled = (plan && plan.schedules && plan.schedules[0].run_at.start_time) || 0;
  const staleMigrationSchedule = new Date(migrationScheduled).getTime() < Date.now();
  const migrationStarting = staleMigrationSchedule && new Date(migrationScheduled).getTime() > Date.now() - 120000;
  const showInitialScheduleButton = staleMigrationSchedule && !migrationStarting;
  const isWarmMigration = plan && plan.options && plan.options.config_info && plan.options.config_info.warm_migration;
  const migrationCutover = (isWarmMigration && planRequest && planRequest.options.cutover_datetime) || 0;
  return {
    migrationScheduled,
    staleMigrationSchedule,
    migrationStarting,
    showInitialScheduleButton,
    migrationCutover
  };
};

export default getPlanScheduleInfo;
