import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Spinner } from 'patternfly-react';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import MigrationInProgressCard from './MigrationsInProgressCard';

const MigrationsInProgressCards = ({
  activeTransformationPlans,
  serviceTemplatePlaybooks,
  allRequestsWithTasks,
  reloadCard,
  loading,
  redirectTo,
  fetchTransformationPlansAction,
  fetchTransformationPlansUrl,
  isFetchingTransformationPlans,
  isFetchingAllRequestsWithTasks,
  acknowledgeDeniedPlanRequestAction,
  isEditingPlanRequest,
  setMigrationsFilterAction,
  cancelPlanRequestAction,
  isCancellingPlanRequest,
  requestsProcessingCancellation
}) => (
  <div className="row-cards-pf">
    <Grid.Row>
      <Grid.Col
        xs={12}
        style={activeTransformationPlans.length > 0 && allRequestsWithTasks.length > 0 ? { marginTop: '20px' } : {}}
      >
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
                  fetchTransformationPlansAction={fetchTransformationPlansAction}
                  fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                  isFetchingTransformationPlans={isFetchingTransformationPlans}
                  isFetchingAllRequestsWithTasks={isFetchingAllRequestsWithTasks}
                  acknowledgeDeniedPlanRequestAction={acknowledgeDeniedPlanRequestAction}
                  isEditingPlanRequest={isEditingPlanRequest}
                  setMigrationsFilterAction={setMigrationsFilterAction}
                  cancelPlanRequestAction={cancelPlanRequestAction}
                  isCancellingPlanRequest={isCancellingPlanRequest}
                  requestsProcessingCancellation={requestsProcessingCancellation}
                />
              ))
            ) : (
              <ShowWizardEmptyState
                title={__('No Migration Plans In Progress')}
                iconType="pf"
                iconName="info"
                description={<span>{__('There are no existing migration plans in an In Progress state.')}</span>}
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
  redirectTo: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  isFetchingTransformationPlans: PropTypes.bool,
  isFetchingAllRequestsWithTasks: PropTypes.bool,
  acknowledgeDeniedPlanRequestAction: PropTypes.func,
  isEditingPlanRequest: PropTypes.bool,
  setMigrationsFilterAction: PropTypes.func,
  cancelPlanRequestAction: PropTypes.func,
  isCancellingPlanRequest: PropTypes.bool,
  requestsProcessingCancellation: PropTypes.array
};

MigrationsInProgressCards.defaultProps = {
  activeTransformationPlans: [],
  serviceTemplatePlaybooks: [],
  loading: false
};

export default MigrationsInProgressCards;
