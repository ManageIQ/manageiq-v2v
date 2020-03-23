import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, ListView, Button, Icon, UtilizationBar } from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';

import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import getPlaybookName from './helpers/getPlaybookName';
import { MIGRATIONS_FILTERS, TRANSFORMATION_PLAN_REQUESTS_URL } from '../../OverviewConstants';
import {
  countFailedVms,
  isWaitingForConversionHost,
  getRequestsOfPlan,
  getIndexedTasksOfPlan,
  aggregateTasks,
  calculateTotalDiskSpace,
  shouldDisableCancelButton
} from './helpers/inProgressHelpers';
import InProgressRow from './InProgressRow';
import ProgressBarTooltip from './ProgressBarTooltip';

const MigrationInProgressListItem = ({
  plan,
  serviceTemplatePlaybooks,
  allRequestsWithTasks,
  reloadCard, // TODO where does this come from, can we rename it?
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
}) => {
  const { requestsOfAssociatedPlan, mostRecentRequest } = getRequestsOfPlan({ plan, allRequestsWithTasks });
  const waitingForConversionHost = isWaitingForConversionHost(mostRecentRequest);

  const isInitiating = reloadCard || !mostRecentRequest || mostRecentRequest.request_state === 'pending';

  // Plan request state: initiating
  if (isInitiating) {
    return (
      <InProgressRow
        plan={plan}
        additionalInfo={[
          <ListView.InfoItem key="initiating">
            <Spinner size="sm" inline loading />
            {__('Initiating migration. This might take a few minutes.')}
          </ListView.InfoItem>
        ]}
      />
    );
  }

  // Plan request state: waiting for conversion host
  if (waitingForConversionHost) {
    const cancelButtonDisabled = shouldDisableCancelButton({
      requestsProcessingCancellation,
      mostRecentRequest,
      isFetchingTransformationPlans,
      isFetchingAllRequestsWithTasks,
      isCancellingPlanRequest
    });

    const onCancelClick = event => {
      event.stopPropagation();
      cancelPlanRequestAction(TRANSFORMATION_PLAN_REQUESTS_URL, mostRecentRequest.id).then(() =>
        fetchTransformationPlansAction({ url: fetchTransformationPlansUrl, archived: false })
      );
    };

    return (
      <InProgressRow
        plan={plan}
        additionalInfo={[
          <ListView.InfoItem key="waiting-for-host">
            <Spinner size="sm" inline loading />
            <EllipsisWithTooltip style={{ maxWidth: 300 }}>
              {__('Waiting for an available conversion host. You can continue waiting or go to the Migration Settings page to increase the number of migrations per host.') /* prettier-ignore */}
            </EllipsisWithTooltip>
          </ListView.InfoItem>
        ]}
        actions={
          <Button disabled={cancelButtonDisabled} onClick={onCancelClick}>
            {__('Cancel Migration')}
          </Button>
        }
      />
    );
  }

  // Plan request state: denied / no conversion host configured
  if (mostRecentRequest.approval_state === 'denied') {
    const onCancelClick = () =>
      acknowledgeDeniedPlanRequestAction({
        plansUrl: fetchTransformationPlansUrl,
        planRequest: mostRecentRequest
      }).then(() => setMigrationsFilterAction(MIGRATIONS_FILTERS.completed));

    return (
      <InProgressRow
        plan={plan}
        additionalInfo={[
          <ListView.InfoItem key="denied">
            <Icon type="pf" name="error-circle-o" />
            <EllipsisWithTooltip style={{ maxWidth: 300 }}>
              {__('Unable to migrate VMs because no conversion host was configured at the time of the attempted migration.') /* prettier-ignore */}{' '}
              {__('See the product documentation for information on configuring conversion hosts.')}
            </EllipsisWithTooltip>
          </ListView.InfoItem>
        ]}
        actions={
          <Button disabled={isEditingPlanRequest} onClick={onCancelClick}>
            {__('Cancel Migration')}
          </Button>
        }
      />
    );
  }

  // UX business rule: reflect failed immediately if any single task has failed
  // in the most recent request
  const numFailedVms = countFailedVms(mostRecentRequest);

  // UX business rule: aggregrate the tasks across requests reflecting current status of all tasks,
  // (gather the last status for the vm, gather the last storage for use in UX bussiness rule 3)
  const tasksBySourceId = getIndexedTasksOfPlan({ plan, requestsOfAssociatedPlan, mostRecentRequest });
  const {
    numTotalVms,
    numCompletedVms,
    taskRunningPreMigrationPlaybook,
    taskRunningPostMigrationPlaybook
  } = aggregateTasks(tasksBySourceId);

  // UX business rule: reflect the total disk space migrated, aggregated across requests
  const { totalDiskSpace, totalMigratedDiskSpace } = calculateTotalDiskSpace(tasksBySourceId);

  const redirectToPlan = event => {
    event.stopPropagation();
    redirectTo(`/plan/${plan.id}`);
  };
  const baseRowProps = { plan, numFailedVms, numTotalVms, onClick: redirectToPlan };

  // UX business rule: if there are any pre migration playbooks running,
  // or if all disks have been migrated and we have a post migration playbook running, show this instead
  if (
    taskRunningPreMigrationPlaybook ||
    (totalMigratedDiskSpace >= totalDiskSpace && taskRunningPostMigrationPlaybook)
  ) {
    const { pre_service_id, post_service_id } = plan.options.config_info;
    const playbookId = taskRunningPreMigrationPlaybook ? pre_service_id : post_service_id;
    const playbookName = getPlaybookName(serviceTemplatePlaybooks, playbookId);
    return (
      <InProgressRow
        {...baseRowProps}
        additionalInfo={[
          <ListView.InfoItem key="running-playbook">
            <Spinner size="sm" inline loading />
            {sprintf(__('Running playbook service %s. This might take a few minutes.'), playbookName)}
          </ListView.InfoItem>
        ]}
      />
    );
  }

  return (
    <InProgressRow
      {...baseRowProps}
      additionalInfo={[
        <ListView.InfoItem key="migration-progress">
          <div id={`vm-progress-bar-${plan.id}`} className="vm-progress-bar">
            <UtilizationBar
              now={numCompletedVms}
              max={numTotalVms}
              description={__('Migrating data')}
              label={
                <span>
                  <span id="vms-migrated">{sprintf(__('%s of %s VMs'), numCompletedVms, numTotalVms)}</span>{' '}
                  {__('migrated')}
                </span>
              }
              descriptionPlacementTop
              availableTooltipFunction={() => (
                <ProgressBarTooltip id={`available-vm-${plan.id}`} max={numTotalVms} now={numCompletedVms} />
              )}
              usedTooltipFunction={() => (
                <ProgressBarTooltip id={`used-vm-${plan.id}`} max={numTotalVms} now={numCompletedVms} />
              )}
            />
            <div className="active-migration-elapsed-time">
              <Icon type="fa" name="clock-o" />
              <TickingIsoElapsedTime startTime={mostRecentRequest.created_on} />
            </div>
          </div>
        </ListView.InfoItem>
      ]}
    />
  );
};

MigrationInProgressListItem.propTypes = {
  plan: PropTypes.object.isRequired,
  serviceTemplatePlaybooks: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
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

export default MigrationInProgressListItem;
