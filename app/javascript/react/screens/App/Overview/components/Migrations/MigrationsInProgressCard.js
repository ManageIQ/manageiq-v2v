import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Card,
  EmptyState,
  Grid,
  Icon,
  OverlayTrigger,
  Tooltip,
  UtilizationBar,
  Spinner
} from 'patternfly-react';
import { IsoElpasedTime } from '../../../../../../components/dates/IsoElapsedTime';

const MigrationsInProgressCard = ({ plan, handleClick }) => {
  const [mostRecentRequest] = plan.miq_requests.slice(-1);

  // if most recent request is still pending, show loading card
  if (mostRecentRequest.status === 'pending') {
    return (
      <Grid.Col sm={12} md={6} lg={4}>
        <Card matchHeight>
          <Card.Heading>
            <h3 className="card-pf-title">{plan.name}</h3>
          </Card.Heading>
          <Card.Body>
            <EmptyState>
              <Spinner loading size="lg" style={{ marginBottom: '15px' }} />
              <EmptyState.Info>
                Initiating migration. This might take a few minutes.
              </EmptyState.Info>
            </EmptyState>
          </Card.Body>
        </Card>
      </Grid.Col>
    );
  }

  // UX business rule 1: reflect failed immediately if any single task has failed
  // in the most recent request
  let failed = false;
  mostRecentRequest.miq_request_tasks.forEach(task => {
    if (task.status === 'Error') {
      failed = true;
    }
  });

  // UX business rule 2: aggregrate the tasks across requests reflecting current status of all tasks,
  // (gather the last status for the vm, gather the last storage for use in UX bussiness rule 3)
  const tasks = {};
  plan.miq_requests.forEach(request => {
    request.miq_request_tasks.forEach(task => {
      tasks[task.source_id] = tasks[task.source_id] || {};
      tasks[task.source_id].completed =
        task.status === 'Ok' && task.state === 'finished';
      tasks[task.source_id].virtv2v_disks = task.options.virtv2v_disks;
    });
  });

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
      const percentComplete =
        taskDisks.reduce((a, b) => a + b.percent, 0) / (100 * taskDisks.length);
      const taskDiskSpaceCompleted = percentComplete * totalTaskDiskSpace;

      totalDiskSpace += totalTaskDiskSpace;
      totalMigratedDiskSpace += taskDiskSpaceCompleted;
    }
  });

  const totalDiskSpaceGb = numeral(totalDiskSpace).format('0.00b');
  const totalMigratedDiskSpaceGb = numeral(totalMigratedDiskSpace).format(
    '0.00b'
  );

  // UX business rule 4: reflect most request recent elapsed time
  const elapsedTime = IsoElpasedTime(
    new Date(mostRecentRequest.created_on),
    new Date(mostRecentRequest.options.delivered_on)
  );

  // Tooltips
  const vmBarLabel = (
    <span>
      <strong className="label-strong">
        {sprintf(__('%s of %s VMs'), completedVMs, totalVMs)}
      </strong>{' '}
      {__('migrated')}
    </span>
  );

  const diskSpaceBarLabel = (
    <span>
      <strong className="label-strong">
        {sprintf(__('%s of %s'), totalMigratedDiskSpaceGb, totalDiskSpaceGb)}
      </strong>{' '}
      {__('migrated')}
    </span>
  );

  const availableTooltip = (id, max, now) => {
    if (max > 0) {
      return (
        <Tooltip id={id}>
          {sprintf(__('%s%% Remaining'), Math.round((max - now) / max * 100))}
        </Tooltip>
      );
    }
    return <Tooltip id={id}>{__('No Data')}</Tooltip>;
  };
  const usedTooltip = (id, max, now) => {
    if (max > 0) {
      return (
        <Tooltip id={id}>
          {sprintf(__('%s%% Complete'), Math.round(now / max * 100))}
        </Tooltip>
      );
    }
    return <Tooltip id={id}>{__('No Data')}</Tooltip>;
  };

  const usedVmTooltip = () =>
    usedTooltip(`used-vm-${plan.id}`, totalVMs, completedVMs);
  const availableVmTooltip = () =>
    availableTooltip(`available-vm-${plan.id}`, totalVMs, completedVMs);

  const usedDiskSpaceTooltip = () =>
    usedTooltip(
      `total-disk-${plan.id}`,
      totalDiskSpace,
      totalMigratedDiskSpace
    );
  const availableDiskSpaceTooltip = () =>
    availableTooltip(
      `migrated-disk-${plan.id}`,
      totalDiskSpace,
      totalMigratedDiskSpace
    );

  return (
    <Grid.Col sm={12} md={6} lg={4}>
      <Card
        onClick={() => {
          handleClick(`/migration/plan/${plan.id}`);
        }}
        matchHeight
        className="in-progress"
      >
        <Card.Heading>
          <OverlayTrigger
            overlay={
              <Tooltip id={`description_${plan.id}`}>{plan.name}</Tooltip>
            }
            placement="top"
            trigger={['hover']}
            delay={500}
            rootClose={false}
          >
            <h3 className="card-pf-title">
              {failed && (
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
              )}
              {plan.name}
            </h3>
          </OverlayTrigger>
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
  handleClick: PropTypes.func
};

export default MigrationsInProgressCard;
