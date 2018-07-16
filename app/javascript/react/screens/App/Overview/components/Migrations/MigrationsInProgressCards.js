import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Spinner } from 'patternfly-react';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import MigrationInProgressCard from './MigrationsInProgressCard';

const MigrationsInProgressCards = ({
  activeTransformationPlans,
  serviceTemplatePlaybooks,
  allRequestsWithTasks,
  reloadCard,
  loading,
  redirectTo
}) => (
  <div className="row-cards-pf">
    <Grid.Row>
      <Grid.Col xs={12}>
        <Card.HeightMatching selector={['.card-pf-match-height']}>
          <Spinner loading={loading}>
            {activeTransformationPlans.length > 0 && allRequestsWithTasks.length > 0 ? (
              activeTransformationPlans.map(plan => (
                <MigrationInProgressCard
                  plan={plan}
                  serviceTemplatePlaybooks={serviceTemplatePlaybooks}
                  allRequestsWithTasks={allRequestsWithTasks}
                  reloadCard={reloadCard}
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
                  <span>
                    {__('There are no existing migration plans in an In Progress state.')}
                    <br /> {__('Make a selection in the dropdown to view plans in other states.')}
                  </span>
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
  serviceTemplatePlaybooks: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
  loading: PropTypes.bool,
  redirectTo: PropTypes.func
};

MigrationsInProgressCards.defaultProps = {
  activeTransformationPlans: [],
  serviceTemplatePlaybooks: [],
  loading: false
};

export default MigrationsInProgressCards;
