import {
  getLocalStorageState,
  saveLocalStorageState,
  LOCAL_STORAGE_KEYS
} from '../../../../../../../../common/LocalStorage';

const _formatLocalStoragePlan = (migrationPlans, planSchedule, valid_vms) => {
  const plan = migrationPlans.asMutable({ deep: true });
  plan.id = Math.floor(Math.random() * 1000);
  plan.href = `http://localhost:3000/api/service_templates/${plan.id}`;
  plan.miq_requests = [];

  // construct tasks (for use later if not started immediately)
  const tasks = [];
  valid_vms.forEach(vm => {
    const task = {};
    task.created_on = new Date().toISOString();
    task.message = 'Pending';
    task.options = {};
    task.options.progress = {};
    task.options.progress.states = {};
    task.options.progress.percent = 0;
    task.options.progress.current_description = 'Pending';
    task.options.transformation_host_name = vm.name;
    task.options.virtv2v_disks = [];
    task.options.virtv2v_wrapper = {
      v2v_log: `/var/log/vdsm/import/v2v-import-${task.created_on
        .replace(/:/g, '-')
        .substring(0, 19)}.log`
    };
    task.state = 'pending';
    task.status = 'Ok';
    tasks.push(task);
  });

  if (planSchedule === 'migration_plan_now') {
    const request = {};
    request.description = plan.name;
    request.approval_state = 'approved';
    request.status = 'pending';
    request.created_on = new Date().toString();
    request.miq_request_tasks = tasks;
    plan.miq_requests.push(request);
  } else {
    // temporarily stored for local storage only
    plan.pending_tasks = tasks;
  }
  return plan;
};

export const saveMigrationPlanToLocalStorage = (
  migrationPlans,
  planSchedule,
  valid_vms
) => {
  let existingPlans = getLocalStorageState(LOCAL_STORAGE_KEYS.V2V_PLANS);
  const formattedPlan = _formatLocalStoragePlan(
    migrationPlans,
    planSchedule,
    valid_vms
  );
  if (existingPlans) {
    const existingIndex = existingPlans.findIndex(
      p => p.name === formattedPlan.name
    );
    if (existingIndex > -1) {
      existingPlans[existingIndex] = formattedPlan;
    } else {
      existingPlans.push(formattedPlan);
    }
  } else {
    existingPlans = [formattedPlan];
  }

  saveLocalStorageState(LOCAL_STORAGE_KEYS.V2V_PLANS, existingPlans);
};
