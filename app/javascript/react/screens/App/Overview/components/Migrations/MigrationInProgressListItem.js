import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Spinner, ListView, Button, Icon, UtilizationBar } from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';

import InProgressWithDetailCard from './InProgressWithDetailCard';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import getPlaybookName from './helpers/getPlaybookName';
import { MIGRATIONS_FILTERS, TRANSFORMATION_PLAN_REQUESTS_URL } from '../../OverviewConstants';
import CardEmptyState from './CardEmptyState';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import MappingNameInfoItem from './MappingNameInfoItem';
import NumVmsInfoItem from './NumVmsInfoItem';
import {
  countFailedVms,
  isWaitingForConversionHost,
  getRequestsOfPlan,
  getIndexedTasksOfPlan,
  aggregateTasks,
  calculateTotalDiskSpace,
  shouldDisableCancelButton
} from './helpers/inProgressHelpers';
import MigrationFailedOverlay from './MigrationFailedOverlay';
import ProgressBarTooltip from './ProgressBarTooltip';

// TODO move this to another file. deal with required props?
const InProgressRow = ({ plan, numFailedVms = 0, numTotalVms, additionalInfo, actions = <div /> }) => (
  <ListViewTable.Row
    stacked
    className="plans-in-progress-list__list-item"
    leftContent={<Spinner size="lg" loading />}
    heading={
      <React.Fragment>
        {numFailedVms > 0 && (
          <MigrationFailedOverlay plan={plan} numFailedVms={numFailedVms} numTotalVms={numTotalVms} />
        )}
        {plan.name}
      </React.Fragment>
    }
    description={<EllipsisWithTooltip>{plan.description}</EllipsisWithTooltip>}
    additionalInfo={[
      <MappingNameInfoItem key="mappingName" plan={plan} />,
      <NumVmsInfoItem key="numVms" plan={plan} />,
      ...additionalInfo
    ]}
    actions={actions}
  />
);
InProgressRow.propTypes = {
  plan: PropTypes.shape({ name: PropTypes.node, description: PropTypes.node }).isRequired,
  numFailedVms: PropTypes.number,
  numTotalVms: PropTypes.number,
  additionalInfo: PropTypes.arrayOf(PropTypes.node).isRequired,
  actions: PropTypes.node
};

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

  // TODO remove this temporary escape hatch
  return <InProgressRow plan={plan} additionalInfo={[]} />;

  // TODO handle base case: actually showing progress!
  return (
    <InProgressWithDetailCard plan={plan} failedOverlay={failedOverlay} handleClick={redirectTo}>
      <div id={`datastore-progress-bar-${plan.id}`}>
        <UtilizationBar
          now={totalMigratedDiskSpace}
          max={totalDiskSpace}
          description={__('Datastores')}
          label={
            <span>
              <strong id="size-migrated" className="label-strong">
                {sprintf(
                  __('%s of %s'),
                  numeral(totalMigratedDiskSpace).format('0.00b'),
                  numeral(totalDiskSpace).format('0.00b')
                )}
              </strong>{' '}
              {__('migrated')}
            </span>
          }
          descriptionPlacementTop
          availableTooltipFunction={() => (
            <ProgressBarTooltip id={`migrated-disk-${plan.id}`} max={totalDiskSpace} now={totalMigratedDiskSpace} />
          )}
          usedTooltipFunction={() => (
            <ProgressBarTooltip id={`total-disk-${plan.id}`} max={totalDiskSpace} now={totalMigratedDiskSpace} />
          )}
        />
      </div>
      <div id={`vm-progress-bar-${plan.id}`}>
        <UtilizationBar
          now={numCompletedVms}
          max={numTotalVms}
          description={__('VMs')}
          label={
            <span>
              <strong id="vms-migrated" className="label-strong">
                {sprintf(__('%s of %s VMs'), numCompletedVms, numTotalVms)}
              </strong>{' '}
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
      </div>
      <div className="active-migration-elapsed-time">
        <Icon type="fa" name="clock-o" />
        <TickingIsoElapsedTime startTime={mostRecentRequest.created_on} />
      </div>
    </InProgressWithDetailCard>
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
