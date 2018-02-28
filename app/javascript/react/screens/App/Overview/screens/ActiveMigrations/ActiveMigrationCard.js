import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Icon,
  OverlayTrigger,
  Tooltip,
  UtilizationBar
} from 'patternfly-react';

const ActiveMigrationCard = ({ migration }) => {
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

  const totalVMs = _.get(migration, 'miq_request_tasks', []).length;
  const completedVMs = _.filter(_.get(migration, 'miq_request_tasks', []), {
    state: 'finished'
  }).length;

  const startTime = new Date(_.get(migration, 'options.delivered_on'));
  const endTime = Date.now();
  const elapsedHours = moment(endTime).diff(startTime, 'hours');
  const elapsedMinutes = moment(endTime).diff(startTime, 'minutes') % 60;

  let elapsedTime;
  if (elapsedHours >= 48) {
    elapsedTime = sprintf(
      __('%s days %s:%s elapsed'),
      Math.floor(elapsedHours / 24),
      elapsedHours % 24,
      elapsedMinutes
    );
  } else if (elapsedHours >= 24) {
    elapsedTime = sprintf(
      __('1 day %s:%s elapsed'),
      elapsedHours % 24,
      elapsedMinutes
    );
  } else {
    elapsedTime = sprintf(__('%s:%s elapsed'), elapsedHours, elapsedMinutes);
  }

  const vmBarLabel = (
    <span>
      <strong className="label-strong">
        {sprintf(__('%s of %s VMs'), completedVMs, totalVMs)}
      </strong>{' '}
      {__('Migrated')}
    </span>
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
            <h3>{migration.description}</h3>
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

ActiveMigrationCard.propTypes = {
  migration: PropTypes.object
};
ActiveMigrationCard.defaultProps = {
  migration: {}
};

export default ActiveMigrationCard;
