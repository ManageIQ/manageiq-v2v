import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Spinner } from 'patternfly-react';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import MigrationInProgressListItem from './MigrationInProgressListItem';

const MigrationsInProgressList = ({
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
  <React.Fragment>
    <Grid.Col xs={12} id="progress-bar-items">
      <Spinner loading={!!loading}>
        {activeTransformationPlans.length > 0 && allRequestsWithTasks.length > 0 ? (
          activeTransformationPlans.map(plan => (
            <MigrationInProgressListItem
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
    </Grid.Col>
    {/* TODO: scheduling modal here? maybe lift that out of CompletedList? */}
  </React.Fragment>
);

MigrationsInProgressList.propTypes = {
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

MigrationsInProgressList.defaultProps = {
  activeTransformationPlans: [],
  serviceTemplatePlaybooks: [],
  loading: false
};

export default MigrationsInProgressList;
