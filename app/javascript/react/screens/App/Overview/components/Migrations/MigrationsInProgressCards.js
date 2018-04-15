import React from 'react';
import PropTypes from 'prop-types';
import { CardGrid, EmptyState, Spinner } from 'patternfly-react';
import MigrationInProgressCard from './MigrationsInProgressCard';

const MigrationsInProgressCards = ({ activeTransformationPlans, loading }) => (
  <CardGrid
    matchHeight
    style={{
      marginLeft: 10,
      marginRight: 10
    }}
    className="cards-pf"
  >
    <CardGrid.Row>
      <Spinner loading={loading}>
        {activeTransformationPlans.length > 0 &&
          activeTransformationPlans.map(plan => (
            <MigrationInProgressCard plan={plan} key={plan.id} />
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
    </CardGrid.Row>
  </CardGrid>
);

MigrationsInProgressCards.propTypes = {
  activeTransformationPlans: PropTypes.array,
  loading: PropTypes.bool
};

MigrationsInProgressCards.defaultProps = {
  activeTransformationPlans: [],
  loading: false
};

export default MigrationsInProgressCards;
