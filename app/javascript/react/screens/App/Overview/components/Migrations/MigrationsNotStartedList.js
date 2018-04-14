import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid, Icon } from 'patternfly-react';

const MigrationsNotStartedList = ({
  migrateClick,
  notStartedPlans,
  loading
}) => (
  <Grid.Col xs={12}>
    <ListView style={{ marginTop: 0 }}>
      {notStartedPlans.map(plan => (
        <ListView.Item
          actions={
            <div>
              <Button
                onClick={() => {
                  migrateClick(plan.href);
                }}
                disabled={loading === plan.href}
              >
                Migrate
              </Button>
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
  notStartedPlans: PropTypes.array,
  loading: PropTypes.string
};
MigrationsNotStartedList.defaultProps = {
  migrateClick: noop,
  notStartedPlans: [],
  loading: ''
};

export default MigrationsNotStartedList;
