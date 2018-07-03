import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Card,
  EmptyState,
  Grid,
  Icon,
  OverlayTrigger,
  Popover,
  Tooltip,
  UtilizationBar,
  Spinner
} from 'patternfly-react';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import getMostRecentRequest from '../../../common/getMostRecentRequest';

const MigrationsInProgressCard = ({ plan, allRequestsWithTasks, reloadCard, handleClick }) => {
  const requestsOfAssociatedPlan = allRequestsWithTasks.filter(request => request.source_id === plan.id);
  const mostRecentRequest = requestsOfAssociatedPlan.length > 0 && getMostRecentRequest(requestsOfAssociatedPlan);


  // === TODO FIXME THIS IS MOCK MUTATION CODE TO BE REMOVED ===
  // This code:
  // * sticks a fake active pre-playbook in the first migration on the screen
  // * sticks a fake active post-playbook in the third migration on the screen

  const a = window.dangerousGlobalAccumulator;

  const mockTasks = mostRecentRequest.miq_request_tasks.map((task, i) => ({
    ...task,
    options: {
      ...task.options,
      playbooks: {
        pre: {
          job_id: 4,
          status: (a === 0 && i === 0 ? "Active" : "Succeeded"),
          last_task: "Task name"
        },
        post: {
          job_id: 5,
          status: (a === 2 && i === 0 ? "Active" : "Succeeded"),
          last_task: "Task name"
        }
      }
    }
  }));

  window.dangerousGlobalAccumulator++;
  const mostRecentTasks = mockTasks;

  // ^^^ TODO FIXME THIS IS MOCK MUTATION CODE TO BE REMOVED ^^^
  // We should remove the above code when the real API data is in place.
  
  // const mostRecentTasks = mostRecentRequest.miq_request_tasks;

  const playbooksByTaskId = mostRecentTasks.reduce(
    (map, task) => ({
      ...map,
      [task.id]: task.options.playbooks
    }),
    {}
  );

  const tasksWithActivePlaybooks = mostRecentTasks.filter(task => {
    const playbooks = playbooksByTaskId[task.id];
    return playbooks.pre.status === 'Active' || playbooks.post.status === 'Active';
  });
  const isSomePlaybookActive = tasksWithActivePlaybooks.length > 0;

  // if most recent request is still pending, show loading card
  if (reloadCard || !mostRecentRequest || mostRecentRequest.request_state === 'pending') {
    return (
      <Grid.Col sm={12} md={6} lg={4}>
        <Card matchHeight>
          <Card.Heading>
            <h3 className="card-pf-title">{plan.name}</h3>
          </Card.Heading>
          <Card.Body>
            <EmptyState>
              <Spinner loading size="lg" style={{ marginBottom: '15px' }} />
              <EmptyState.Info>{__('Initiating migration. This might take a few minutes.')}</EmptyState.Info>
            </EmptyState>
          </Card.Body>
        </Card>
      </Grid.Col>
    );
  }

  // If we have active Ansible Playbooks, display their status instead of the overall status.
  if (isSomePlaybookActive) {
    return (
      <Grid.Col sm={12} md={6} lg={4}>
        <Card matchHeight>
          <Card.Heading>
            <h3 className="card-pf-title">PLAN NAME!</h3>
          </Card.Heading>
          <Card.Body>
            <EmptyState>
              <Spinner loading size="lg" style={{ marginBottom: '15px' }} />
              <EmptyState.Info>{__('Initiating migration. This might take a few minutes.')}</EmptyState.Info>
            </EmptyState>
          </Card.Body>
        </Card>
      </Grid.Col>
    );
  }

  // UX business rule 1: reflect failed immediately if any single task has failed
  // in the most recent request
  let failed = false;
  let failedVms = 0;
  mostRecentRequest.miq_request_tasks.forEach(task => {
    if (task.status === 'Error') {
      failed = true;
      failedVms += 1;
    }
  });

  // UX business rule 2: aggregrate the tasks across requests reflecting current status of all tasks,
  // (gather the last status for the vm, gather the last storage for use in UX bussiness rule 3)
  const tasks = {};
  requestsOfAssociatedPlan.forEach(request => {
    request.miq_request_tasks.forEach(task => {
      tasks[task.source_id] = tasks[task.source_id] || {};
      tasks[task.source_id].completed = task.status === 'Ok' && task.state === 'finished';
      tasks[task.source_id].virtv2v_disks = task.options.virtv2v_disks;
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // TODO / FIXME MJT: Hmm. Maybe we want to look at ALL tasks on all requests, for playbooks?
  //                   (and not just on the mostRecentRequest)
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  let completedVMs = 0;
  const totalVMs = Object.keys(tasks).length;
  Object.keys(tasks).forEach(task => {
    if (tasks[task].completed) completedVMs += 1;
  });

  // UX business rule 3: reflect the total disk space migrated, aggregated across requests
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

  // UX business rule 4: reflect most request recent elapsed time
  const elapsedTime = <TickingIsoElapsedTime startTime={mostRecentRequest.created_on} />;

  // Tooltips
  const vmBarLabel = (
    <span>
      <strong className="label-strong">{sprintf(__('%s of %s VMs'), completedVMs, totalVMs)}</strong> {__('migrated')}
    </span>
  );

  const diskSpaceBarLabel = (
    <span>
      <strong className="label-strong">{sprintf(__('%s of %s'), totalMigratedDiskSpaceGb, totalDiskSpaceGb)}</strong>{' '}
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
    <Grid.Col sm={12} md={6} lg={4}>
      <Card
        onClick={e => {
          if (!e.target.classList.contains('pficon-error-circle-o')) {
            handleClick(`/migration/plan/${plan.id}`);
          }
        }}
        matchHeight
        className="in-progress"
      >
        <Card.Heading>
          <h3 className="card-pf-title">
            {failed && (
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
            )}
            {plan.name}
          </h3>
        </Card.Heading>
        <Card.Body>
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
        </Card.Body>
      </Card>
    </Grid.Col>
  );
};

MigrationsInProgressCard.propTypes = {
  plan: PropTypes.object.isRequired,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
  handleClick: PropTypes.func
};

export default MigrationsInProgressCard;
