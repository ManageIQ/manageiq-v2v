import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Icon,
  ListView,
  OverlayTrigger,
  Popover,
  Tooltip
} from 'patternfly-react';
import MigrationFailedVMsList from './MigrationFailedVMsList';

const MigrationCompletedRow = ({ migration }) => {
  const successfulMigrationsCount = migration.miq_request_tasks.filter(
    task => task.status === 'Ok'
  ).length;
  const failedMigrationsCount = migration.miq_request_tasks.filter(
    task => task.status === 'Error'
  ).length;

  const startTime = new Date(migration.created_on);
  const endTime = new Date(migration.options.delivered_on);
  let hours = moment(endTime).diff(startTime, 'hours');
  const minutes = moment(endTime).diff(startTime, 'minutes') % 60;
  const seconds = moment(endTime).diff(startTime, 'seconds') % 60;
  const days = Math.floor(hours / 24);
  hours %= 24;

  let elapsedTime;
  if (days >= 2) {
    elapsedTime = sprintf(__('%s days %02s:%02s:%02s'), days, hours, minutes, seconds);
  } else if (days === 1) {
    elapsedTime = sprintf(__('1 day %02s:%02s:%02s'), hours, minutes, seconds);
  } else {
    elapsedTime = sprintf(__('%02s:%02s:%02s'), hours, minutes, seconds);
  }

  const closePopover = () => {
    document.body.click();
  };

  const removeButton = (
    <Button
      bsStyle="link"
      onClick={e => {
        e.preventDefault();
        closePopover();
      }}
      className="pf-remove-button"
    >
      <Icon type="pf" name="close" aria-hidden="true" />
      <span className="sr-only">{__('Close')}</span>
    </Button>
  );

  const failuresPopover = (
    <Popover
      id={`failure-popover-${migration.id}`}
      className="failed-migrations-popover"
      title={
        <div className="failure-popover-title">
          {`${__('Failed Migrations')} - ${migration.description}`}
          <span className="failure-popover-close">{removeButton}</span>
        </div>
      }
    >
      <MigrationFailedVMsList migration={migration} />
    </Popover>
  );

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
              className={successfulMigrationsCount === 0 ? 'invisible' : ''}
            />
            <strong>{successfulMigrationsCount}</strong>
            {__('Successful')}
          </ListView.InfoItem>
        </Grid.Col>
        <Grid.Col xs={4} md={3} mdPull={3}>
          {failedMigrationsCount > 0 ? (
            <ListView.InfoItem>
              <OverlayTrigger
                overlay={failuresPopover}
                placement="top"
                trigger={['click']}
                rootClose
              >
                <span className="btn-link">
                  <Icon
                    type="pf"
                    name="error-circle-o"
                    className="trigger-icon"
                  />
                  <strong>{failedMigrationsCount}</strong>
                  <span className="trigger-text">{__('Failed')}</span>
                </span>
              </OverlayTrigger>
            </ListView.InfoItem>
          ) : (
            <ListView.InfoItem>
              <Icon type="pf" name="error-circle-o" className="invisible" />
              <strong>{failedMigrationsCount}</strong>
              {__('Failed')}
            </ListView.InfoItem>
          )}
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
