import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGrid, Grid, EmptyState, Spinner } from 'patternfly-react';
import MigrationInProgressCard from './MigrationsInProgressCard';

const MigrationsInProgressCards = ({
  activeTransformationPlans,
  loading,
  redirectTo
}) => (
  <div className="row-cards-pf">
    <Grid.Row>
      <Grid.Col xs={12}>
        <Card.HeightMatching selector={['.card-pf-match-height']}>
          <Spinner loading={loading}>
            {activeTransformationPlans.length > 0 &&
              activeTransformationPlans.map(plan => (
                <MigrationInProgressCard
                  plan={plan}
                  key={plan.id}
                  handleClick={redirectTo}
                />
              ))}
            {activeTransformationPlans.length === 0 && (
              <EmptyState>
                <EmptyState.Icon />
                <EmptyState.Title>
                  {__('No Active Migrations')}
                </EmptyState.Title>
                <EmptyState.Info>
                  {__('There are currently no active migrations.')}
                </EmptyState.Info>
              </EmptyState>
            )}
          </Spinner>
        </Card.HeightMatching>
      </Grid.Col>
    </Grid.Row>
  </div>
);

MigrationsInProgressCards.propTypes = {
  activeTransformationPlans: PropTypes.array,
  loading: PropTypes.bool,
  redirectTo: PropTypes.func
};

MigrationsInProgressCards.defaultProps = {
  activeTransformationPlans: [],
  loading: false
};

export default MigrationsInProgressCards;
