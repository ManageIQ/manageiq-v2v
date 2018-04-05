import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid } from 'patternfly-react';

const MigrationsCompletedList = ({ retryClick }) => (
  <Grid.Col xs={12}>
    <ListView style={{ marginTop: 0 }}>
      <ListView.Item
        actions={<div />}
        leftContent={
          <ListView.Icon
            type="pf"
            name="ok"
            size="md"
            className="list-view-pf-icon-success"
          />
        }
        heading="Migration Plan 1"
        description="This item finished successfully."
      >
        More content.
      </ListView.Item>
      <ListView.Item
        actions={
          <div>
            <Button onClick={retryClick}>Retry</Button>
          </div>
        }
        leftContent={
          <ListView.Icon
            type="pf"
            name="error-circle-o"
            size="md"
            className="list-view-pf-icon-danger"
          />
        }
        heading="Migration Plan 2"
        description="This item failed."
      >
        More content.
      </ListView.Item>
    </ListView>
  </Grid.Col>
);

MigrationsCompletedList.propTypes = {
  retryClick: PropTypes.func
};
MigrationsCompletedList.defaultProps = {
  retryClick: noop
};

export default MigrationsCompletedList;
