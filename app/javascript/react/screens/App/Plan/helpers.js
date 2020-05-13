import numeral from 'numeral';

import { V2V_DOWNLOAD_LOG_STATUS_MESSAGES, V2V_BACKEND_ERROR_MESSAGES } from './PlanConstants';
import { IsoElapsedTime } from '../../../../components/dates/IsoElapsedTime';
import getMostRecentVMTasksFromRequests from '../Overview/components/Migrations/helpers/getMostRecentVMTasksFromRequests';

const taskCompletedSuccessfully = task => task.state === 'finished' && task.status === 'Ok';

const taskCompletedUnsuccessfully = task => task.state === 'finished' && task.status !== 'Ok';

const processVMTasks = vmTasks => {
  const tasks = [];
  // FIXME (maybe someday): this is a mess, we shouldn't be altering the structure of the task object,
  // we should just pass the task objects directly through, perhaps omitting some keys.
  vmTasks.forEach(task => {
    const taskDetails = {
      id: task.id,
      message: task.message,
      delivered_on: new Date(task.options.delivered_on),
      updated_on: new Date(task.updated_on),
      completed: task.state === 'finished',
      completedSuccessfully: taskCompletedSuccessfully(task),
      state: task.state,
      status: task.status,
      options: {},
      cancelation_status: task.cancelation_status,
      source_id: task.source_id,
      log_available: task.options.virtv2v_wrapper && task.options.virtv2v_wrapper.v2v_log.length > 0
    };

    if (task.options.playbooks) {
      taskDetails.options.prePlaybookRunning =
        task.options.playbooks.pre && task.options.playbooks.pre.job_state === 'active';
      taskDetails.options.postPlaybookRunning =
        task.options.playbooks.post && task.options.playbooks.post.job_state === 'active';
      taskDetails.options.prePlaybookComplete =
        task.options.playbooks.pre && task.options.playbooks.pre.job_state === 'finished';
      taskDetails.options.postPlaybookComplete =
        task.options.playbooks.post && task.options.playbooks.post.job_state === 'finished';
      taskDetails.options.playbooks = task.options.playbooks;
    }

    taskDetails.options.progress = task.options.progress;
    taskDetails.options.virtv2v_wrapper = task.options.virtv2v_wrapper;
    taskDetails.options.virtv2v_disks = task.options.virtv2v_disks;

    if (!task.diskSpaceCompletedGb) {
      taskDetails.diskSpaceCompletedGb = '0';
    }

    if (!task.percentComplete) {
      taskDetails.percentComplete = 0;
    }

    if (!task.totalDiskSpaceGb) {
      taskDetails.totalDiskSpaceGb = '100%';
    }

    const grepVMName = task.description.match(/\[(.*?)\]/);

    if (grepVMName) {
      [taskDetails.descriptionPrefix, taskDetails.vmName] = grepVMName;
    }

    const startDateTime = taskDetails.delivered_on;
    const lastUpdateDateTime = taskDetails.updated_on;
    taskDetails.startDateTime = startDateTime;
    taskDetails.lastUpdateDateTime = lastUpdateDateTime;

    taskDetails.elapsedTime = IsoElapsedTime(new Date(startDateTime), new Date(lastUpdateDateTime));

    if (task.options && task.options.virtv2v_disks && task.options.virtv2v_disks.length) {
      taskDetails.totalDiskSpace = task.options.virtv2v_disks.reduce((a, b) => a + b.size, 0);
      taskDetails.totalDiskSpaceGb = numeral(taskDetails.totalDiskSpace).format('0.00 ib');

      const percentComplete =
        task.options.virtv2v_disks.reduce((a, b) => a + b.percent, 0) / (100 * task.options.virtv2v_disks.length);

      taskDetails.diskSpaceCompleted = percentComplete * taskDetails.totalDiskSpace;
      taskDetails.diskSpaceCompletedGb = numeral(taskDetails.diskSpaceCompleted).format('0.00 ib');
      taskDetails.percentComplete = Math.round(percentComplete * 100);
    }
    tasks.push(taskDetails);
  });
  return tasks;
};

export const removeCancelledTasksFromSelection = (allSelectedTasksForCancel, alreadyCancelledTasks) =>
  allSelectedTasksForCancel.filter(selectedTask =>
    alreadyCancelledTasks.every(cancelledTask => selectedTask.id !== cancelledTask.id)
  );

export const excludeDownloadDoneTaskId = (allDownloadLogInProgressTaskIds, taskId) =>
  allDownloadLogInProgressTaskIds.filter(element => element !== taskId);

export const includeDownloadInProgressTaskId = (allDownloadLogInProgressTaskIds, taskId) =>
  allDownloadLogInProgressTaskIds ? allDownloadLogInProgressTaskIds.concat(taskId) : [taskId];

export const getFailedMigrations = vmTasks => vmTasks.filter(task => taskCompletedUnsuccessfully(task));

export const getSuccessfulMigrations = vmTasks => vmTasks.filter(task => taskCompletedSuccessfully(task));

export const allVMTasksForRequestOfPlan = (requestWithTasks, actions) => {
  const tasksOfPlan = getMostRecentVMTasksFromRequests(requestWithTasks, actions);
  return processVMTasks(tasksOfPlan);
};

export const incompleteCancellationTasks = (requestWithTasks, actions, tasksForCancel) => {
  const tasksOfPlan = getMostRecentVMTasksFromRequests(requestWithTasks, actions);
  const completedTasksOfPlan = tasksOfPlan.filter(task => task.state === 'finished');
  return removeCancelledTasksFromSelection(tasksForCancel, completedTasksOfPlan);
};

const processRegExp = (property, complexErrorMessage) =>
  RegExp(V2V_BACKEND_ERROR_MESSAGES[property], 'g').exec(complexErrorMessage);

export const parseComplexErrorMessages = complexErrorMessage => {
  for (const property in V2V_BACKEND_ERROR_MESSAGES) {
    if (
      {}.hasOwnProperty.call(V2V_BACKEND_ERROR_MESSAGES, property) &&
      processRegExp(property, complexErrorMessage) !== null
    ) {
      return V2V_DOWNLOAD_LOG_STATUS_MESSAGES[property];
    }
  }
  return complexErrorMessage;
};
