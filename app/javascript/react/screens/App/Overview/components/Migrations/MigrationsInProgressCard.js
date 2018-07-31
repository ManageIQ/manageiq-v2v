import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { EmptyState, Icon, OverlayTrigger, Popover, Tooltip, UtilizationBar, Spinner } from 'patternfly-react';
import InProgressCard from './InProgressCard';
import InProgressWithDetailCard from './InProgressWithDetailCard';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import getMostRecentRequest from '../../../common/getMostRecentRequest';
import getMostRecentVMTasksFromRequests from './helpers/getMostRecentVMTasksFromRequests';
import getPlaybookName from './helpers/getPlaybookName';
import { PLAN_JOB_STATES } from '../../../../../../data/models/plans';

const MigrationsInProgressCard = ({
  plan,
  serviceTemplatePlaybooks,
  allRequestsWithTasks,
  reloadCard,
  handleClick
}) => {
  const requestsOfAssociatedPlan = allRequestsWithTasks.filter(request => request.source_id === plan.id);
  const mostRecentRequest = requestsOfAssociatedPlan.length > 0 && getMostRecentRequest(requestsOfAssociatedPlan);

  const emptyStateSpinner = emptyStateMessage => (
    <EmptyState>
      <Spinner loading size="lg" style={{ marginBottom: '15px' }} />
      <EmptyState.Info>{emptyStateMessage}</EmptyState.Info>
    </EmptyState>
  );

  // if most recent request is still pending, show loading card
  if (reloadCard || !mostRecentRequest || mostRecentRequest.request_state === 'pending') {
    return (
      <InProgressCard title={<h3 className="card-pf-title">{plan.name}</h3>}>
        {emptyStateSpinner(__('Initiating migration. This might take a few minutes.'))}
      </InProgressCard>
    );
  }

  // UX business rule: reflect failed immediately if any single task has failed
  // in the most recent request
  let failed = false;
  let failedVms = 0;
  mostRecentRequest.miq_request_tasks.forEach(task => {
    if (task.status === 'Error') {
      failed = true;
      failedVms += 1;
    }
  });

  // UX business rule: aggregrate the tasks across requests reflecting current status of all tasks,
  // (gather the last status for the vm, gather the last storage for use in UX bussiness rule 3)
  const tasks = {};
  let tasksOfPlan = {};
  if (requestsOfAssociatedPlan.length > 0) {
    tasksOfPlan = getMostRecentVMTasksFromRequests(requestsOfAssociatedPlan, plan.options.config_info.actions);
  } else if (mostRecentRequest) {
    tasksOfPlan = mostRecentRequest.miq_request_tasks;
  }
  tasksOfPlan.forEach(task => {
    tasks[task.source_id] = tasks[task.source_id] || {};
    tasks[task.source_id].completed = task.status === 'Ok' && task.state === 'finished';
    tasks[task.source_id].virtv2v_disks = task.options.virtv2v_disks;
    tasks[task.source_id].playbooks = task.options.playbooks;
  });

  let completedVMs = 0;
  const totalVMs = Object.keys(tasks).length;
  let taskRunningPreMigrationPlaybook = null;
  let taskRunningPostMigrationPlaybook = null;
  Object.keys(tasks).forEach(task => {
    if (tasks[task].completed) completedVMs += 1;

    // after we have assigned the latest tasks for each source, check the running playbook status
    const { playbooks } = tasks[task];
    if (playbooks) {
      if (
        playbooks.pre &&
        (playbooks.pre.job_state === PLAN_JOB_STATES.PENDING || playbooks.pre.job_state === PLAN_JOB_STATES.ACTIVE)
      ) {
        taskRunningPreMigrationPlaybook = tasks[task];
      }
      if (
        playbooks.post &&
        (playbooks.post.job_state === PLAN_JOB_STATES.PENDING || playbooks.post.job_state === PLAN_JOB_STATES.ACTIVE)
      ) {
        taskRunningPostMigrationPlaybook = tasks[task];
      }
    }
  });

  let failedOverlay = null;
  if (failed) {
    failedOverlay = (
      <OverlayTrigger
        overlay={
          <Popover id={`description_${plan.id}`} title={sprintf('%s', plan.name)}>
            <Icon
              type="pf"
              name="error-circle-o"
              size="sm"
              style={{
                width: 'inherit',
                backgroundColor: 'transparent',
                paddingRight: 5
              }}
            />
            {sprintf(__('%s of %s VM migrations failed.'), failedVms, totalVMs)}
          </Popover>
        }
        placement="top"
        trigger={['hover']}
        delay={500}
        rootClose={false}
      >
        <Icon
          type="pf"
          name="error-circle-o"
          size="md"
          style={{
            width: 'inherit',
            backgroundColor: 'transparent',
            paddingRight: 10
          }}
        />
      </OverlayTrigger>
    );
  }

  // UX business rule: if there are any pre migration playbooks running, show this content instead
  if (taskRunningPreMigrationPlaybook) {
    const playbookName = getPlaybookName(serviceTemplatePlaybooks, plan.options.config_info.pre_service_id);
    return (
      <InProgressWithDetailCard plan={plan} failedOverlay={failedOverlay} handleClick={handleClick}>
        {emptyStateSpinner(sprintf(__('Running playbook service %s. This might take a few minutes.'), playbookName))}
      </InProgressWithDetailCard>
    );
  }

  // UX business rule: reflect the total disk space migrated, aggregated across requests
  let totalDiskSpace = 0;
  let totalMigratedDiskSpace = 0;
  Object.keys(tasks).forEach(task => {
    const taskDisks = tasks[task].virtv2v_disks;
    if (taskDisks && taskDisks.length) {
      const totalTaskDiskSpace = taskDisks.reduce((a, b) => a + b.size, 0);
      const percentComplete = taskDisks.reduce((a, b) => a + b.percent, 0) / (100 * taskDisks.length);
      const taskDiskSpaceCompleted = percentComplete * totalTaskDiskSpace;

      totalDiskSpace += totalTaskDiskSpace;
      totalMigratedDiskSpace += taskDiskSpaceCompleted;
    }
  });

  const totalDiskSpaceGb = numeral(totalDiskSpace).format('0.00b');
  const totalMigratedDiskSpaceGb = numeral(totalMigratedDiskSpace).format('0.00b');

  // UX business rule: if all disks have been migrated and we have a post migration playbook running, show this instead
  if (totalMigratedDiskSpaceGb >= totalDiskSpaceGb && taskRunningPostMigrationPlaybook) {
    const playbookName = getPlaybookName(serviceTemplatePlaybooks, plan.options.config_info.post_service_id);
    return (
      <InProgressWithDetailCard plan={plan} failedOverlay={failedOverlay} handleClick={handleClick}>
        {emptyStateSpinner(sprintf(__('Running playbook service %s. This might take a few minutes.'), playbookName))}
      </InProgressWithDetailCard>
    );
  }

  // UX business rule: reflect most request recent elapsed time
  const elapsedTime = <TickingIsoElapsedTime startTime={mostRecentRequest.created_on} />;

  // Tooltips
  const vmBarLabel = (
    <span>
      <strong id="vms-migrated" className="label-strong">
        {sprintf(__('%s of %s VMs'), completedVMs, totalVMs)}
      </strong>{' '}
      {__('migrated')}
    </span>
  );

  const diskSpaceBarLabel = (
    <span>
      <strong id="size-migrated" className="label-strong">
        {sprintf(__('%s of %s'), totalMigratedDiskSpaceGb, totalDiskSpaceGb)}
      </strong>{' '}
      {__('migrated')}
    </span>
  );

  const availableTooltip = (id, max, now) => {
    if (max > 0) {
      return <Tooltip id={id}>{sprintf(__('%s%% Remaining'), Math.round(((max - now) / max) * 100))}</Tooltip>;
    }
    return <Tooltip id={id}>{__('No Data')}</Tooltip>;
  };
  const usedTooltip = (id, max, now) => {
    if (max > 0) {
      return <Tooltip id={id}>{sprintf(__('%s%% Complete'), Math.round((now / max) * 100))}</Tooltip>;
    }
    return <Tooltip id={id}>{__('No Data')}</Tooltip>;
  };

  const usedVmTooltip = () => usedTooltip(`used-vm-${plan.id}`, totalVMs, completedVMs);
  const availableVmTooltip = () => availableTooltip(`available-vm-${plan.id}`, totalVMs, completedVMs);

  const usedDiskSpaceTooltip = () => usedTooltip(`total-disk-${plan.id}`, totalDiskSpace, totalMigratedDiskSpace);
  const availableDiskSpaceTooltip = () =>
    availableTooltip(`migrated-disk-${plan.id}`, totalDiskSpace, totalMigratedDiskSpace);

  return (
    <InProgressWithDetailCard plan={plan} failedOverlay={failedOverlay} handleClick={handleClick}>
      <UtilizationBar
        now={totalMigratedDiskSpace}
        max={totalDiskSpace}
        description={__('Datastores')}
        label={diskSpaceBarLabel}
        descriptionPlacementTop
        availableTooltipFunction={availableDiskSpaceTooltip}
        usedTooltipFunction={usedDiskSpaceTooltip}
      />
      <UtilizationBar
        now={completedVMs}
        max={totalVMs}
        description={__('VMs')}
        label={vmBarLabel}
        descriptionPlacementTop
        availableTooltipFunction={availableVmTooltip}
        usedTooltipFunction={usedVmTooltip}
      />
      <div className="active-migration-elapsed-time">
        <Icon type="fa" name="clock-o" />
        {elapsedTime}
      </div>
    </InProgressWithDetailCard>
  );
};

MigrationsInProgressCard.propTypes = {
  plan: PropTypes.object.isRequired,
  serviceTemplatePlaybooks: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
  handleClick: PropTypes.func
};

export default MigrationsInProgressCard;
