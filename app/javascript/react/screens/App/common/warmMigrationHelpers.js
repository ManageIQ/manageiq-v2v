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
const reduceCopies = copies =>
  copies.reduce(
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

export const reduceCopiesFromTask = task => {
  const disks = task.options.virtv2v_disks;
  if (!disks || disks.length === 0) return [];
  const allCopiesByDisk = disks.map(disk => (disk.copies ? filterCopies(disk.copies) : [])); // [diskIndex][copyIndex]
  const numCopies = Math.max(...allCopiesByDisk.map(copies => copies.length));
  const reducedCopies = [...new Array(numCopies)].map((_, copyIndex) => {
    const perDisk = allCopiesByDisk.map(diskCopies => diskCopies[copyIndex] || {});
    return { perDisk, ...reduceCopies(perDisk) };
  });
  return reducedCopies; // One array of copies, reduced from the Nth copy of each disk
};

export const getPlanCopySummary = planRequestWithTasks => {
  const tasks = planRequestWithTasks.miq_request_tasks;
  if (!tasks || tasks.length === 0) return {};
  const isPreCopyingAllVms = tasks.every(
    task => task.options && task.options.progress && task.options.progress.current_state === PRECOPYING_DISKS
  );
  const allCopiesByTask = tasks.map(task => reduceCopiesFromTask(task));
  const hasInitialCopyFinished =
    allCopiesByTask.length > 0 &&
    allCopiesByTask.every(reducedCopies => reducedCopies.some(copy => !!copy.latestEndTime));
  return {
    isPreCopyingAllVms,
    allCopiesByTask,
    hasInitialCopyFinished
  };
};
