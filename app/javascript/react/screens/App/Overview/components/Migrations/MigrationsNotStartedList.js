import React from 'react';
import PropTypes from 'prop-types';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import { noop, Button, ListView, Grid, Icon, Spinner } from 'patternfly-react';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';

const MigrationsNotStartedList = ({ migrateClick, notStartedPlans, loading, redirectTo }) => (
  <Grid.Col xs={12}>
    <Spinner loading={!!loading}>
      {notStartedPlans.length > 0 ? (
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
                    {__('Migrate')}
                  </Button>
                </div>
              }
              leftContent={<div />}
              heading={plan.name}
              description={
                <EllipsisWithTooltip id={plan.description}>
                  <React.Fragment>{plan.description}</React.Fragment>
                </EllipsisWithTooltip>
              }
              additionalInfo={[
                <ListView.InfoItem key={plan.id}>
                  <Icon type="pf" name="virtual-machine" />
                  <strong>{plan.options.config_info.actions.length}</strong> {__('VMs')}
                </ListView.InfoItem>
              ]}
              key={plan.id}
            />
          ))}
        </ListView>
      ) : (
        <OverviewEmptyState
          title={__('No Migration Plans Not Started')}
          iconType="pf"
          iconName="info"
          description={
            <span>
              {__('There are no existing migration plans in a Not Started state.')}
              <br /> {__('Make a selection in the dropdown to view plans in other states.')}
            </span>
          }
        />
      )}
    </Spinner>
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
