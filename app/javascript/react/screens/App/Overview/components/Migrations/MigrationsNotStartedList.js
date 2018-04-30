import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid, Icon } from 'patternfly-react';

const MigrationsNotStartedList = ({
  migrateClick,
  notStartedPlans,
  loading,
  redirectTo
}) => (
  <Grid.Col xs={12}>
    <ListView className="plans-not-started-list" style={{ marginTop: 0 }}>
      {notStartedPlans.map(plan => (
        <ListView.Item
          className="plans-not-started-list__list-item"
          onClick={() => {
            redirectTo(`/migration/plan/${plan.id}`);
          }}
          actions={
            <div>
              <Button
                onClick={e => {
                  e.stopPropagation();
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
  loading: PropTypes.string,
  redirectTo: PropTypes.func
};
MigrationsNotStartedList.defaultProps = {
  migrateClick: noop,
  notStartedPlans: [],
  loading: ''
};

export default MigrationsNotStartedList;
