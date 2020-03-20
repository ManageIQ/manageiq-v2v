import { PRECOPYING_DISKS } from './warmMigrationConstants';

// Ignore copy objects that do not include progress data
const filterCopies = copies => copies.filter(copy => copy.copied && copy.to_copy && copy.start_time);

// Find Math.min or Math.max among actual number values, excluding undefined/null.
const getNumericExtreme = (values, mathFn) => {
  const validNumbers = values.filter(value => typeof value === 'number');
  if (validNumbers.length === 0) return null;
  return mathFn(...validNumbers);
};

// Calculate size totals and timestamp extremes from a set of copies
// TODO when statuses are added to copies, also include the "worst" available status
const reduceCopies = copies => {
  const copiesSummary = copies.reduce(
    (prev, copy) => ({
      totalCopied: prev.totalCopied + (copy.copied || 0),
      totalToCopy: prev.totalToCopy + (copy.to_copy || 0),
      earliestStartTime: getNumericExtreme([prev.earliestStartTime, copy.start_time], Math.min),
      latestEndTime: getNumericExtreme([prev.latestEndTime, copy.end_time], Math.max)
    }),
    {
      totalCopied: 0,
      totalToCopy: 0,
      earliestStartTime: null,
      latestEndTime: null
    }
  );
  return {
    ...copiesSummary,
    finishedWithErrors: !!copiesSummary.latestEndTime && copiesSummary.totalCopied !== copiesSummary.totalToCopy
  };
};

export const reduceCopiesFromTask = task => {
  const disks = task && task.options && task.options.virtv2v_disks;
  if (!disks || disks.length === 0) return [];
  const allCopiesByDisk = disks.map(disk => (disk.copies ? filterCopies(disk.copies) : [])); // [diskIndex][copyIndex]
  const numCopies = Math.max(...allCopiesByDisk.map(copies => copies.length));
  const reducedCopies = [...new Array(numCopies)].map((_, copyIndex) => {
    const perDisk = allCopiesByDisk.map(diskCopies => diskCopies[copyIndex] || {});
    return { perDisk, ...reduceCopies(perDisk) };
  });
  // One array of copies, reduced from the Nth copy of each disk, latest copy first
  return reducedCopies.sort((a, b) => b.earliestStartTime - a.earliestStartTime);
};

export const getPlanCopySummary = planRequestWithTasks => {
  const tasks = planRequestWithTasks.miq_request_tasks;
  if (!tasks || tasks.length === 0) return {};
  const isPreCopyingAllVms = tasks.every(
    task => task.options && task.options.progress && task.options.progress.current_state === PRECOPYING_DISKS
  );
  const isPreCopyingNoVms = tasks.every(
    task => task.options && task.options.progress && task.options.progress.current_state !== PRECOPYING_DISKS
  );
  const allCopiesByTask = tasks.map(task => reduceCopiesFromTask(task));
  const hasInitialCopyFinished =
    allCopiesByTask.length > 0 &&
    allCopiesByTask.every(reducedCopies => reducedCopies.some(copy => !!copy.latestEndTime));
  const lastPreCopyFailedForSomeTask = allCopiesByTask.some(
    reducedCopies => reducedCopies[0] && reducedCopies[0].finishedWithErrors
  );
  const hasCutoverTimePassed = new Date(planRequestWithTasks.options.cutover_datetime) < new Date();
  const hasCutoverStarted = isPreCopyingNoVms && hasCutoverTimePassed;
  return {
    isPreCopyingAllVms,
    allCopiesByTask,
    hasInitialCopyFinished,
    lastPreCopyFailedForSomeTask,
    hasCutoverStarted
  };
};
