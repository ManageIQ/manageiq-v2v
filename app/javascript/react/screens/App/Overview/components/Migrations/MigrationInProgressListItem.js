import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Spinner, ListView, Icon, OverlayTrigger, Popover, Tooltip, UtilizationBar } from 'patternfly-react';

import InProgressCard from './InProgressCard';
import InProgressWithDetailCard from './InProgressWithDetailCard';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import getPlaybookName from './helpers/getPlaybookName';
import {
  MIGRATIONS_FILTERS,
  TRANSFORMATION_PLAN_REQUESTS_URL,
  WAITING_FOR_CONVERSION_HOST_MESSAGE
} from '../../OverviewConstants';
import CardEmptyState from './CardEmptyState';
import CardFooter from './CardFooter';
import { urlBuilder } from './helpers';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import MappingNameInfoItem from './MappingNameInfoItem';
import NumVmsInfoItem from './NumVmsInfoItem';
import {
  countFailedVms,
  isWaitingForConversionHost,
  getRequestsOfPlan,
  getIndexedTasksOfPlan,
  aggregateTasks,
  calculateTotalDiskSpace
} from './helpers/inProgressHelpers';

// TODO move this to another file
const InProgressRow = ({ plan, additionalInfo, actions = <div /> }) => (
  <ListViewTable.Row
    stacked
    className="plans-in-progress-list__list-item"
    leftContent={<Spinner size="lg" loading />}
    heading={plan.name}
    description={plan.description}
    additionalInfo={[
      <MappingNameInfoItem key="mappingName" plan={plan} />,
      <NumVmsInfoItem key="numVms" plan={plan} />,
      ...additionalInfo
    ]}
    actions={actions}
  />
);
InProgressRow.propTypes = {
  plan: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }),
  additionalInfo: PropTypes.arrayOf(PropTypes.node),
  actions: PropTypes.node
};

const MigrationInProgressListItem = ({
  plan,
  serviceTemplatePlaybooks,
  allRequestsWithTasks,
  reloadCard, // TODO where does this come from, can we rename it?
  handleClick,
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
  const { requestsOfAssociatedPlan, mostRecentRequest } = getRequestsOfPlan(plan, allRequestsWithTasks);
  const waitingForConversionHost = isWaitingForConversionHost(mostRecentRequest);

  const isInitiating = reloadCard || !mostRecentRequest || mostRecentRequest.request_state === 'pending';

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

  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // //////////////////////////////// TODO move the below into a helper file?

  // UX business rule: reflect failed immediately if any single task has failed
  // in the most recent request
  const { failed, numFailedVms } = countFailedVms(mostRecentRequest);

  // TODO RETURN ROW if failed!

  // UX business rule: aggregrate the tasks across requests reflecting current status of all tasks,
  // (gather the last status for the vm, gather the last storage for use in UX bussiness rule 3)

  const tasksBySourceId = getIndexedTasksOfPlan(plan, requestsOfAssociatedPlan, mostRecentRequest);
  const {
    numTotalVms,
    numCompletedVms,
    taskRunningPreMigrationPlaybook,
    taskRunningPostMigrationPlaybook
  } = aggregateTasks(tasksBySourceId);

  let failedOverlay = null;
  if (failed) {
    failedOverlay = (
      <OverlayTrigger
        overlay={
          <Popover id={`description_${plan.id}`} title={sprintf('%s', plan.name)}>
            <Icon
              type="pf"
              name="error-circle-o"
              size="sm"
              style={{
                width: 'inherit',
                backgroundColor: 'transparent',
                paddingRight: 5
              }}
            />
            {sprintf(__('%s of %s VM migrations failed.'), numFailedVms, numTotalVms)}
          </Popover>
        }
        placement="top"
        trigger={['hover']}
        delay={500}
        rootClose={false}
      >
        <Icon
          type="pf"
          name="error-circle-o"
          size="md"
          style={{
            width: 'inherit',
            backgroundColor: 'transparent',
            paddingRight: 10
          }}
        />
      </OverlayTrigger>
    );
  }

  // TODO --- below logic is not needed if playbooks are running -- how to handle this?

  // UX business rule: reflect the total disk space migrated, aggregated across requests
  const { totalDiskSpace, totalMigratedDiskSpace } = calculateTotalDiskSpace(tasksBySourceId);
  const totalDiskSpaceGb = numeral(totalDiskSpace).format('0.00b');
  const totalMigratedDiskSpaceGb = numeral(totalMigratedDiskSpace).format('0.00b');

  const elapsedTime = <TickingIsoElapsedTime startTime={mostRecentRequest.created_on} />;

  // Tooltips
  const vmBarLabel = (
    <span>
      <strong id="vms-migrated" className="label-strong">
        {sprintf(__('%s of %s VMs'), numCompletedVms, numTotalVms)}
      </strong>{' '}
      {__('migrated')}
    </span>
  );

  const diskSpaceBarLabel = (
    <span>
      <strong id="size-migrated" className="label-strong">
        {sprintf(__('%s of %s'), totalMigratedDiskSpaceGb, totalDiskSpaceGb)}
      </strong>{' '}
      {__('migrated')}
    </span>
  );

  const availableTooltip = (id, max, now) => {
    if (max > 0) {
      return <Tooltip id={id}>{sprintf(__('%s%% Remaining'), Math.round(((max - now) / max) * 100))}</Tooltip>;
    }
    return <Tooltip id={id}>{__('No Data')}</Tooltip>;
  };
  const usedTooltip = (id, max, now) => {
    if (max > 0) {
      return <Tooltip id={id}>{sprintf(__('%s%% Complete'), Math.round((now / max) * 100))}</Tooltip>;
    }
    return <Tooltip id={id}>{__('No Data')}</Tooltip>;
  };

  const usedVmTooltip = () => usedTooltip(`used-vm-${plan.id}`, numTotalVms, numCompletedVms);
  const availableVmTooltip = () => availableTooltip(`available-vm-${plan.id}`, numTotalVms, numCompletedVms);

  const usedDiskSpaceTooltip = () => usedTooltip(`total-disk-${plan.id}`, totalDiskSpace, totalMigratedDiskSpace);
  const availableDiskSpaceTooltip = () =>
    availableTooltip(`migrated-disk-${plan.id}`, totalDiskSpace, totalMigratedDiskSpace);

  // //////////////////////////////// TODO move the above into a helper file?
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////
  // ////////////////////////////////

  return <InProgressRow plan={plan} additionalInfo={[]} />;

  // TODO handle this case after initiating
  if (waitingForConversionHost) {
    const cancelPlanRequest = () => {
      cancelPlanRequestAction(TRANSFORMATION_PLAN_REQUESTS_URL, mostRecentRequest.id).then(() =>
        fetchTransformationPlansAction({ url: fetchTransformationPlansUrl, archived: false })
      );
    };

    const isProcessingCancellation = requestsProcessingCancellation.includes(
      urlBuilder(TRANSFORMATION_PLAN_REQUESTS_URL, mostRecentRequest.id)
    );

    return (
      <InProgressCard
        title={<h3 className="card-pf-title">{plan.name}</h3>}
        footer={
          <CardFooter
            disabled={
              isProcessingCancellation &&
              (isFetchingTransformationPlans ||
                isFetchingAllRequestsWithTasks ||
                isCancellingPlanRequest ||
                !!mostRecentRequest.cancelation_status)
            }
            buttonText={__('Cancel Migration')}
            onButtonClick={cancelPlanRequest}
          />
        }
      >
        <CardEmptyState
          showSpinner
          emptyStateInfo={WAITING_FOR_CONVERSION_HOST_MESSAGE}
          emptyStateInfoStyles={{ marginTop: 10 }}
        />
      </InProgressCard>
    );
  }

  // TODO handle this case after waiting-for-host
  if (mostRecentRequest.approval_state === 'denied') {
    const onButtonClick = () =>
      acknowledgeDeniedPlanRequestAction({
        plansUrl: fetchTransformationPlansUrl,
        planRequest: mostRecentRequest
      }).then(() => setMigrationsFilterAction(MIGRATIONS_FILTERS.completed));

    return (
      <InProgressCard
        title={<h3 className="card-pf-title">{plan.name}</h3>}
        footer={
          <CardFooter
            disabled={isEditingPlanRequest}
            buttonText={__('Cancel Migration')}
            onButtonClick={onButtonClick}
          />
        }
      >
        <CardEmptyState
          iconType="pf"
          iconName="error-circle-o"
          emptyStateInfo={
            <React.Fragment>
              {__('Unable to migrate VMs because no conversion host was configured at the time of the attempted migration.') /* prettier-ignore */}{' '}
              {__('See the product documentation for information on configuring conversion hosts.')}
            </React.Fragment>
          }
          emptyStateInfoStyles={{ marginTop: 10 }}
        />
      </InProgressCard>
    );
  }

  // TODO handle this case after denied
  // UX business rule: if there are any pre migration playbooks running, show this content instead
  if (taskRunningPreMigrationPlaybook) {
    const playbookName = getPlaybookName(serviceTemplatePlaybooks, plan.options.config_info.pre_service_id);
    return (
      <InProgressWithDetailCard plan={plan} failedOverlay={failedOverlay} handleClick={handleClick}>
        <CardEmptyState
          emptyStateInfo={sprintf(__('Running playbook service %s. This might take a few minutes.'), playbookName)}
          showSpinner
          spinnerStyles={{ marginBottom: '15px' }}
        />
      </InProgressWithDetailCard>
    );
  }

  // TODO handle this case after pre-playbooks
  // UX business rule: if all disks have been migrated and we have a post migration playbook running, show this instead
  if (totalMigratedDiskSpaceGb >= totalDiskSpaceGb && taskRunningPostMigrationPlaybook) {
    const playbookName = getPlaybookName(serviceTemplatePlaybooks, plan.options.config_info.post_service_id);
    return (
      <InProgressWithDetailCard plan={plan} failedOverlay={failedOverlay} handleClick={handleClick}>
        <CardEmptyState
          emptyStateInfo={sprintf(__('Running playbook service %s. This might take a few minutes.'), playbookName)}
          showSpinner
          spinnerStyles={{ marginBottom: '15px' }}
        />
      </InProgressWithDetailCard>
    );
  }

  // TODO handle base case: actually showing progress!
  return (
    <InProgressWithDetailCard plan={plan} failedOverlay={failedOverlay} handleClick={handleClick}>
      <div id={`datastore-progress-bar-${plan.id}`}>
        <UtilizationBar
          now={totalMigratedDiskSpace}
          max={totalDiskSpace}
          description={__('Datastores')}
          label={diskSpaceBarLabel}
          descriptionPlacementTop
          availableTooltipFunction={availableDiskSpaceTooltip}
          usedTooltipFunction={usedDiskSpaceTooltip}
        />
      </div>
      <div id={`vm-progress-bar-${plan.id}`}>
        <UtilizationBar
          now={numCompletedVms}
          max={numTotalVms}
          description={__('VMs')}
          label={vmBarLabel}
          descriptionPlacementTop
          availableTooltipFunction={availableVmTooltip}
          usedTooltipFunction={usedVmTooltip}
        />
      </div>
      <div className="active-migration-elapsed-time">
        <Icon type="fa" name="clock-o" />
        {elapsedTime}
      </div>
    </InProgressWithDetailCard>
  );
};

MigrationInProgressListItem.propTypes = {
  plan: PropTypes.object.isRequired,
  serviceTemplatePlaybooks: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
  handleClick: PropTypes.func,
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
