import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid,
  Icon,
  OverlayTrigger,
  Tooltip,
  UtilizationBar
} from 'patternfly-react';
import { IsoElpasedTime } from '../../../../../../../components/dates/IsoElapsedTime';

const MigrationInProgressCard = ({ migration }) => {
  const availableTooltip = (max, now) => {
    if (max > 0) {
      return (
        <Tooltip id={`available-tip-${migration.id}`}>
          {sprintf(__('%s%% Remaining'), Math.round((max - now) / max * 100))}
        </Tooltip>
      );
    }
    return (
      <Tooltip id={`available-tip-${migration.id}`}>{__('No Data')}</Tooltip>
    );
  };
  const usedTooltip = (max, now) => {
    if (max > 0) {
      return (
        <Tooltip id={`available-tip-${migration.id}`}>
          {sprintf(__('%s%% Complete'), Math.round(now / max * 100))}
        </Tooltip>
      );
    }
    return (
      <Tooltip id={`available-tip-${migration.id}`}>{__('No Data')}</Tooltip>
    );
  };

  const totalVMs = migration.miq_request_tasks.length;
  const completedVMs = migration.miq_request_tasks.filter(
    task => task.state === 'finished'
  ).length;

  const startTime = new Date(migration.options.delivered_on);
  const endTime = Date.now();

  const elapsedTime = IsoElpasedTime(startTime, endTime);

  const vmBarLabel = (
    <Link to={`/migration/plan/${migration.id}`}>
      <span>
        <strong className="label-strong">
          {sprintf(__('%s of %s VMs'), completedVMs, totalVMs)}
        </strong>{' '}
        {__('Migrated')}
      </span>
    </Link>
  );
  const usedVmTooltip = () => usedTooltip(totalVMs, completedVMs);
  const availableVmTooltip = () => availableTooltip(totalVMs, completedVMs);

  return (
    <Grid.Col sm={12} md={6} lg={4}>
      <div className="card-pf">
        <div className="card-pf-heading">
          <OverlayTrigger
            overlay={
              <Tooltip id={`description_${migration.id}`}>
                {migration.description}
              </Tooltip>
            }
            placement="top"
            trigger={['hover']}
            delay={500}
            rootClose={false}
          >
            <h3 className="card-pf-title">{migration.description}</h3>
          </OverlayTrigger>
        </div>
        <div className="card-pf-body">
          <UtilizationBar
            now={completedVMs || 1}
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
        </div>
      </div>
    </Grid.Col>
  );
};

MigrationInProgressCard.propTypes = {
  migration: PropTypes.object
};
MigrationInProgressCard.defaultProps = {
  migration: {}
};

export default MigrationInProgressCard;
