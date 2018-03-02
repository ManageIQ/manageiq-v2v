import React from 'react';
import PropTypes from 'prop-types';

import { Grid, OverlayTrigger, Tooltip } from 'patternfly-react';

const MigrationFailedVMsList = ({ migration }) => {
  const failedMigrations = migration.miq_request_tasks.filter(
    task => task.status === 'Error'
  );

  const getVMNameFromDescription = description => {
    const start = description.indexOf('[');
    const end = description.indexOf(']');

    if (start >= 0 && start < end) {
      return description.slice(start + 1, end);
    }

    return description;
  };

  return (
    <React.Fragment>
      <Grid fluid>
        <Grid.Row>
          <Grid.Col xs={4} md={3}>
            <strong>{__('VM Name')}</strong>
          </Grid.Col>
          <Grid.Col xs={8} md={9}>
            <strong>{__('Error Message')}</strong>
          </Grid.Col>
        </Grid.Row>
      </Grid>
      <Grid fluid className="failures-list">
        {failedMigrations.map(failure => (
          <Grid.Row key={failure.id}>
            <OverlayTrigger
              overlay={
                <Tooltip id={`failed-vm-name-${failure.id}`}>
                  {getVMNameFromDescription(failure.description)}
                </Tooltip>
              }
              placement="top"
              trigger={['hover']}
              delay={500}
              rootClose={false}
            >
              <Grid.Col className="failed-vm-column-text" xs={4} md={3}>
                {getVMNameFromDescription(failure.description)}
              </Grid.Col>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id={`failed-vm-name-${failure.id}`}>
                  {failure.message}
                </Tooltip>
              }
              placement="top"
              trigger={['hover']}
              delay={500}
              rootClose={false}
            >
              <Grid.Col className="failed-vm-column-text" xs={8} md={9}>
                {failure.message}
              </Grid.Col>
            </OverlayTrigger>
          </Grid.Row>
        ))}
      </Grid>
    </React.Fragment>
  );
};

MigrationFailedVMsList.propTypes = {
  migration: PropTypes.object
};
MigrationFailedVMsList.defaultProps = {
  migration: {}
};

export default MigrationFailedVMsList;
