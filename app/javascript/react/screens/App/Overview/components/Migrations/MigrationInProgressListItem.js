import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button, Icon, UtilizationBar } from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';

import ListViewTable from '../../../common/ListViewTable/ListViewTable';
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

  const isWarmMigration = !!plan.options.config_info.warm_migration;
  const isBeforeCutover = isWarmMigration && !!plan.fake; // TODO replace with real logic

  // Plan request state: initiating
  if (isInitiating) {
    return (
      <InProgressRow
        plan={plan}
        additionalInfo={[
          <ListViewTable.InfoItem key="initiating">
            <Spinner size="sm" inline loading />
            {__('Initiating migration. This might take a few minutes.')}
          </ListViewTable.InfoItem>
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

    const onCancelClick = () => {
      cancelPlanRequestAction(TRANSFORMATION_PLAN_REQUESTS_URL, mostRecentRequest.id).then(() =>
        fetchTransformationPlansAction({ url: fetchTransformationPlansUrl, archived: false })
      );
    };

    return (
      <InProgressRow
        plan={plan}
        additionalInfo={[
          <ListViewTable.InfoItem key="waiting-for-host">
            <Spinner size="sm" inline loading />
            <EllipsisWithTooltip style={{ maxWidth: 300 }}>
              {__('Waiting for an available conversion host. You can continue waiting or go to the Migration Settings page to increase the number of migrations per host.') /* prettier-ignore */}
            </EllipsisWithTooltip>
          </ListViewTable.InfoItem>
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
          <ListViewTable.InfoItem key="denied">
            <Icon type="pf" name="error-circle-o" />
            <EllipsisWithTooltip style={{ maxWidth: 300 }}>
              {__('Unable to migrate VMs because no conversion host was configured at the time of the attempted migration.') /* prettier-ignore */}{' '}
              {__('See the product documentation for information on configuring conversion hosts.')}
            </EllipsisWithTooltip>
          </ListViewTable.InfoItem>
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
  const numFailedVms = countFailedVms(mostRecentRequest); // TODO consider warm migration case, what changes for detecting failure?

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
          <ListViewTable.InfoItem key="running-playbook">
            <Spinner size="sm" inline loading />
            {sprintf(__('Running playbook service %s. This might take a few minutes.'), playbookName)}
          </ListViewTable.InfoItem>
        ]}
      />
    );
  }

  if (isWarmMigration && isBeforeCutover) {
    // TODO replace these stubs with real logic
    let precopyStatus = <div>TODO: status here</div>;
    let cutoverSchedule = <div>TODO: schedule here</div>; // TODO null if no scheduled time

    if (plan.fake === 'initial-with-schedule' || plan.fake === 'initial-unscheduled') {
      precopyStatus = (
        <div className="info-with-inline-icon">
          <Spinner size="sm" inline loading />
          <div>{__('Initial pre-copy in progress')}</div>
        </div>
      );
    } else if (plan.fake === 'last-failed') {
      precopyStatus = (
        <div className="info-with-inline-icon">
          <Icon type="pf" name="warning-triangle-o" />
          <div>{__('Last pre-copy failed for one or more VMs')}</div>
        </div>
      );
    } else if (plan.fake === 'last-succeeded') {
      precopyStatus = (
        <div className="info-with-inline-icon">
          <Icon type="pf" name="ok" />
          <div>{__('Last pre-copy succeeded')}</div>
        </div>
      );
    }

    if (plan.fake === 'initial-with-schedule' || plan.fake === 'last-succeeded') {
      cutoverSchedule = (
        <div>
          {__('Scheduled for cutover:')}
          <br />
          {__('November 28th 2019, 2:00 am')}
          <Icon className="edit-schedule" type="pf" name="edit" />
        </div>
      );
    } else {
      cutoverSchedule = null;
    }

    return (
      <InProgressRow
        {...baseRowProps}
        additionalInfo={[
          <ListViewTable.InfoItem key="migration-progress">
            {cutoverSchedule ? (
              <div className="precopy-status-with-schedule">
                {precopyStatus}
                {cutoverSchedule}
              </div>
            ) : (
              precopyStatus
            )}
          </ListViewTable.InfoItem>
        ]} // TODO handle real schedule action here
        actions={!cutoverSchedule ? <Button onClick={() => alert('TODO')}>{__('Schedule Cutover')}</Button> : <div />}
      />
    );
  }

  return (
    <InProgressRow
      {...baseRowProps}
      additionalInfo={[
        <ListViewTable.InfoItem key="migration-progress">
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
            <div className="info-with-inline-icon">
              <Icon type="fa" name="clock-o" />
              <TickingIsoElapsedTime startTime={mostRecentRequest.created_on} />
            </div>
          </div>
        </ListViewTable.InfoItem>
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
