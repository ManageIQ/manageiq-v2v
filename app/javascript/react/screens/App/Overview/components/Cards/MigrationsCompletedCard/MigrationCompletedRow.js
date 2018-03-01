import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Icon,
  ListView,
  OverlayTrigger,
  Tooltip
} from 'patternfly-react';

const MigrationCompletedRow = ({ migration }) => {
  const successfulMigrations = migration.miq_request_tasks.filter(
    task => task.state === 'finished'
  ).length;
  const failedMigrations = migration.miq_request_tasks.filter(
    task => task.state !== 'finished'
  ).length;

  const startTime = new Date(migration.options.delivered_on);
  const endTime = Date.now();
  let hours = moment(endTime).diff(startTime, 'hours');
  const minutes = moment(endTime).diff(startTime, 'minutes') % 60;
  const days = Math.floor(hours / 24);
  hours %= 24;

  let elapsedTime;
  if (days >= 2) {
    elapsedTime = sprintf(__('%s days %s:%s'), days, hours, minutes);
  } else if (days === 1) {
    elapsedTime = sprintf(__('1 day %s:%s'), hours, minutes);
  } else {
    elapsedTime = sprintf(__('%s:%s'), hours, minutes);
  }

  return (
    <div className="list-group-item">
      <Grid.Row className="completed-migration-item">
        <Grid.Col xs={8} md={3} className="completed-migration-name">
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
            <strong>{migration.description}</strong>
          </OverlayTrigger>
        </Grid.Col>
        <Grid.Col xs={4} md={3} mdPush={6}>
          <ListView.InfoItem>
            <Icon type="fa" name="clock-o" />
            <span>{elapsedTime}</span>
          </ListView.InfoItem>
        </Grid.Col>
        <Grid.Col xs={8} md={3} mdPull={3}>
          <ListView.InfoItem>
            <Icon
              type="pf"
              name="ok"
              className={successfulMigrations === 0 ? 'invisible' : ''}
            />
            <strong>{successfulMigrations}</strong>
            {__('Successful')}
          </ListView.InfoItem>
        </Grid.Col>
        <Grid.Col xs={4} md={3} mdPull={3}>
          <ListView.InfoItem>
            <Icon
              type="pf"
              name="error-circle-o"
              className={failedMigrations === 0 ? 'invisible' : ''}
            />
            <strong>{failedMigrations}</strong>
            {__('Failed')}
          </ListView.InfoItem>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};

MigrationCompletedRow.propTypes = {
  migration: PropTypes.object
};
MigrationCompletedRow.defaultProps = {
  migration: {}
};

export default MigrationCompletedRow;
