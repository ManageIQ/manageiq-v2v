import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button, Icon, UtilizationBar, DropdownKebab, MenuItem } from 'patternfly-react';
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
import ScheduleMigrationButton from './ScheduleMigrationButton';
import CutoverTimeInfoItem from './CutoverTimeInfoItem';
import StopPropagationOnClick from '../../../common/StopPropagationOnClick';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';

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
  requestsProcessingCancellation,
  loading,
  toggleScheduleMigrationModal,
  showConfirmModalAction,
  hideConfirmModalAction,
  scheduleCutover
}) => {
  const { requestsOfAssociatedPlan, mostRecentRequest } = getRequestsOfPlan({ plan, allRequestsWithTasks });
  const waitingForConversionHost = isWaitingForConversionHost(mostRecentRequest);

  const isInitiating = reloadCard || !mostRecentRequest || mostRecentRequest.request_state === 'pending';

  const showScheduleMigrationButton =
    plan.options.config_info.warm_migration && !plan.options.config_info.warm_migration_cutover_datetime;
  const showWarmMigrationKebab =
    plan.options.config_info.warm_migration && plan.options.config_info.warm_migration_cutover_datetime;

  // Plan request state: initiating
  if (isInitiating) {
    return (
      <InProgressRow
        plan={plan}
        additionalInfo={[
          <ListViewTable.InfoItem key="initiating">
            <Spinner size="sm" inline loading />
            {__('Initiating migration. This might take a few minutes.')}
          </ListViewTable.InfoItem>,
          <CutoverTimeInfoItem plan={plan} />
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
          </ListViewTable.InfoItem>,
          <CutoverTimeInfoItem plan={plan} />
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
          </ListViewTable.InfoItem>,
          <CutoverTimeInfoItem plan={plan} />
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

  const confirmationWarningText = (
    <React.Fragment>
      <p>
        {sprintf(
          __('Are you sure you want to unschedule cutover for plan %s targeted to run on %s ?'),
          plan.name,
          formatDateTime(plan.options.config_info.warm_migration_cutover_datetime)
        )}
      </p>
    </React.Fragment>
  );

  const confirmModalProps = {
    title: __('Unschedule Cutover for Migration Plan'),
    body: confirmationWarningText,
    icon: <Icon className="confirm-warning-icon" type="pf" name="warning-triangle-o" />,
    confirmButtonLabel: __('Unschedule')
  };

  const onConfirm = () => {
    scheduleCutover({
      plan,
      cutoverTime: null
    }).then(() => {
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
    });
    hideConfirmModalAction();
  };

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
          </ListViewTable.InfoItem>,
          <CutoverTimeInfoItem plan={plan} />
        ]}
        actions={
          <div>
            {showScheduleMigrationButton && (
              <ScheduleMigrationButton
                loading={loading}
                toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                plan={plan}
                isMissingMapping={!plan.infraMappingName}
              />
            )}
            {showWarmMigrationKebab && (
              <StopPropagationOnClick>
                <DropdownKebab id={`${plan.id}-kebab`} pullRight>
                  <MenuItem
                    id={`edit_cutover_${plan.id}`}
                    onClick={e => {
                      e.stopPropagation();
                      toggleScheduleMigrationModal({ plan });
                    }}
                  >
                    {__('Edit Cutover')}
                  </MenuItem>
                  <MenuItem
                    id={`delete_cutover_${plan.id}`}
                    onClick={e => {
                      e.stopPropagation();
                      showConfirmModalAction({
                        ...confirmModalProps,
                        onConfirm
                      });
                    }}
                  >
                    {__('Delete Scheduled Cutover')}
                  </MenuItem>
                </DropdownKebab>
              </StopPropagationOnClick>
            )}
          </div>
        }
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
            <div className="active-migration-elapsed-time">
              <Icon type="fa" name="clock-o" />
              <TickingIsoElapsedTime startTime={mostRecentRequest.created_on} />
            </div>
          </div>
        </ListViewTable.InfoItem>,
        <CutoverTimeInfoItem plan={plan} />
      ]}
      actions={
        <div>
          {showScheduleMigrationButton && (
            <ScheduleMigrationButton
              loading={loading}
              toggleScheduleMigrationModal={toggleScheduleMigrationModal}
              plan={plan}
              isMissingMapping={!plan.infraMappingName}
            />
          )}
          {showWarmMigrationKebab && (
            <StopPropagationOnClick>
              <DropdownKebab id={`${plan.id}-kebab`} pullRight>
                <MenuItem
                  id={`edit_cutover_${plan.id}`}
                  onClick={e => {
                    e.stopPropagation();
                    toggleScheduleMigrationModal({ plan });
                  }}
                >
                  {__('Edit Cutover')}
                </MenuItem>
                <MenuItem
                  id={`delete_cutover_${plan.id}`}
                  onClick={e => {
                    e.stopPropagation();
                    showConfirmModalAction({
                      ...confirmModalProps,
                      onConfirm
                    });
                  }}
                >
                  {__('Delete Scheduled Cutover')}
                </MenuItem>
              </DropdownKebab>
            </StopPropagationOnClick>
          )}
        </div>
      }
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
  requestsProcessingCancellation: PropTypes.array,
  loading: PropTypes.bool,
  toggleScheduleMigrationModal: PropTypes.func,
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  scheduleCutover: PropTypes.func
};

export default MigrationInProgressListItem;
