import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid } from 'patternfly-react';

const MigrationsNotStartedList = ({ migrateClick }) => (
  <Grid.Col xs={12}>
    <ListView style={{ marginTop: 0 }}>
      <ListView.Item
        actions={
          <div>
            <Button onClick={migrateClick}>Migrate</Button>
          </div>
        }
        leftContent={<div />}
        heading="Migration Plan 1"
        description="This item is not started"
      />
      <ListView.Item
        actions={
          <div>
            <Button onClick={migrateClick}>Migrate</Button>
          </div>
        }
        leftContent={<div />}
        heading="Migration Plan 2"
        description="This item is not started"
      />
    </ListView>
  </Grid.Col>
);

MigrationsNotStartedList.propTypes = {
  migrateClick: PropTypes.func
};
MigrationsNotStartedList.defaultProps = {
  migrateClick: noop
};

export default MigrationsNotStartedList;
