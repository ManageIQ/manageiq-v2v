import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Spinner } from 'patternfly-react';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import MigrationInProgressListItem from './MigrationInProgressListItem';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';

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
  <Grid.Col xs={12} id="progress-bar-items">
    <Spinner loading={!!loading}>
      {activeTransformationPlans.length > 0 && allRequestsWithTasks.length > 0 ? (
        <ListViewTable className="plans-in-progress-list" style={{ marginTop: 10 }}>
          {activeTransformationPlans.map(plan => (
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
          ))}
        </ListViewTable>
      ) : (
        <ShowWizardEmptyState
          title={__('No Migration Plans In Progress')}
          iconType="pf"
          iconName="info"
          description={<span>{__('There are no existing migration plans in an In Progress state.')}</span>}
        />
      )}
    </Spinner>
    {/* TODO: scheduling modal here? maybe lift that out of CompletedList? */}
  </Grid.Col>
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
