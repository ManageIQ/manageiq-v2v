const getPlanScheduleInfo = plan => {
  const migrationScheduled = (plan.schedules && plan.schedules[0].run_at.start_time) || 0;
  const staleMigrationSchedule = new Date(migrationScheduled).getTime() < Date.now();
  const migrationStarting = staleMigrationSchedule && new Date(migrationScheduled).getTime() > Date.now() - 120000;
  return {
    migrationScheduled,
    staleMigrationSchedule,
    migrationStarting
  };
};

export default getPlanScheduleInfo;
