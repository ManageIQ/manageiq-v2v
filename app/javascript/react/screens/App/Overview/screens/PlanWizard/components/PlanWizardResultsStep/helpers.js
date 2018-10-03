export const planHasBeenEdited = (editingPlan, postBody, planSchedule) => {
  const originalConfigInfo = JSON.stringify(editingPlan.options.config_info);
  const currentConfigInfo = JSON.stringify(postBody.config_info);
  return (
    planSchedule === 'migration_plan_now' ||
    editingPlan.name !== postBody.name ||
    editingPlan.description !== postBody.description ||
    originalConfigInfo !== currentConfigInfo
  );
};
