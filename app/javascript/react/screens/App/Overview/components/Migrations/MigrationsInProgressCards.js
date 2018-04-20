import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGrid, EmptyState, Spinner } from 'patternfly-react';
import MigrationInProgressCard from './MigrationsInProgressCard';

const MigrationsInProgressCards = ({
  activeTransformationPlans,
  loading,
  redirectTo
}) => (
  <Card.HeightMatching selector={['.card-pf-match-height']}>
    <CardGrid.Col xs={12}>
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
            <EmptyState.Title>{__('No Active Migrations')}</EmptyState.Title>
            <EmptyState.Info>
              {__('There are currently no active migrations.')}
            </EmptyState.Info>
          </EmptyState>
        )}
      </Spinner>
    </CardGrid.Col>
  </Card.HeightMatching>
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
