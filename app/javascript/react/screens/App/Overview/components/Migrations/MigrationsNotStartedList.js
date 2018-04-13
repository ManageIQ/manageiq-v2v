import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid, Spinner, Icon } from 'patternfly-react';

const MigrationsNotStartedList = ({ migrateClick, notStartedPlans }) => (
  <Grid.Col xs={12}>
    <ListView style={{ marginTop: 0 }}>
      {notStartedPlans.map(plan => (
        <ListView.Item
          actions={
            <div>
              <Button onClick={migrateClick}>Migrate</Button>
            </div>
          }
          leftContent={<div />}
          heading={plan.name}
          description={plan.description}
          additionalInfo={[
            <ListView.InfoItem key={plan.id}>
              <Icon type="pf" name="virtual-machine" />
              <strong>{plan.options.config_info.vm_ids.length}</strong>{' '}
              {__('VMs')}
            </ListView.InfoItem>
          ]}
          key={plan.id}
        />
      ))}
    </ListView>
  </Grid.Col>
);

MigrationsNotStartedList.propTypes = {
  migrateClick: PropTypes.func,
  notStartedPlans: PropTypes.array
};
MigrationsNotStartedList.defaultProps = {
  migrateClick: noop
};

export default MigrationsNotStartedList;
