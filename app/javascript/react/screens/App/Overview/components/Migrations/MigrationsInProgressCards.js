import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Spinner } from 'patternfly-react';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import MigrationInProgressCard from './MigrationsInProgressCard';

const MigrationsInProgressCards = ({
  activeTransformationPlans,
  allRequestsWithTasks,
  loading,
  redirectTo
}) => (
  <div className="row-cards-pf">
    <Grid.Row>
      <Grid.Col xs={12}>
        <Card.HeightMatching selector={['.card-pf-match-height']}>
          <Spinner loading={loading}>
            {activeTransformationPlans.length > 0 &&
            allRequestsWithTasks.length > 0 ? (
              activeTransformationPlans.map(plan => (
                <MigrationInProgressCard
                  plan={plan}
                  allRequestsWithTasks={allRequestsWithTasks}
                  key={plan.id}
                  handleClick={redirectTo}
                />
              ))
            ) : (
              <OverviewEmptyState
                title={__('No Migration Plans In Progress')}
                iconType="pf"
                iconName="info"
                description={
                  <div>
                    {__(
                      'There are no existing migration plans in an In Progress state.'
                    )}
                    <br />{' '}
                    {__(
                      'Make a selection in the dropdown to view plans in other states.'
                    )}
                  </div>
                }
              />
            )}
          </Spinner>
        </Card.HeightMatching>
      </Grid.Col>
    </Grid.Row>
  </div>
);

MigrationsInProgressCards.propTypes = {
  activeTransformationPlans: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  loading: PropTypes.bool,
  redirectTo: PropTypes.func
};

MigrationsInProgressCards.defaultProps = {
  activeTransformationPlans: [],
  loading: false
};

export default MigrationsInProgressCards;
