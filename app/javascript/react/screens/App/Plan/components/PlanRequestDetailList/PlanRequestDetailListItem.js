import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Spinner, Tooltip, UtilizationBar, DropdownButton, MenuItem } from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import numeral from 'numeral';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import { migrationStatusMessage } from '../../PlanConstants';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import { reduceCopiesFromTask } from '../../../common/warmMigrationHelpers';

const PlanRequestDetailListItem = ({
  task,
  isWarmMigration,
  conversionHosts,
  downloadLogInProgressTaskIds,
  ansiblePlaybookTemplate,
  markedForCancellation, // TODO better prop names for these two?
  selectedTasksForCancel, // ^
  handleCheckboxChange,
  fetchDetailsForTask,
  downloadLogForTask
}) => {
  let currentDescription = task.options.progress
    ? migrationStatusMessage(task.options.progress.current_description)
    : '';
  if (task.options.prePlaybookRunning || task.options.postPlaybookRunning) {
    currentDescription = `${currentDescription} (${ansiblePlaybookTemplate.name})`;
  }
  let mainStatusMessage = currentDescription;
  let taskCancelled = false;
  if (markedForCancellation.find(t => t.id === task.id)) {
    mainStatusMessage = `${currentDescription}: ${__('Cancel request sent')}`;
    taskCancelled = true;
  } else if (task.cancelation_status === 'cancel_requested') {
    mainStatusMessage = `${currentDescription}: ${__('Cancel requested')}`;
    taskCancelled = true;
  } else if (task.cancelation_status === 'canceling') {
    mainStatusMessage = `${currentDescription}: ${__('Cancelling')}`;
    taskCancelled = true;
  } else if (task.cancelation_status === 'canceled') {
    mainStatusMessage = `${currentDescription}: ${__('Cancelled')}`;
    taskCancelled = true;
  }
  const statusDetailMessage = (() => {
    const { progress } = task.options;
    const currentState = progress.current_state && progress.states && progress.states[progress.current_state];
    const message = migrationStatusMessage(currentState.message || currentState.description);
    if (message === mainStatusMessage) return '';
    return message;
  })();

  let leftContent;
  if (task.message === 'Pending') {
    leftContent = (
      // TODO what's the deal with these width: inherit rules? maybe we can strip that out
      <ListView.Icon type="pf" name="pending" size="md" style={{ width: 'inherit', backgroundColor: 'transparent' }} />
    );
  } else if (taskCancelled && task.completed) {
    mainStatusMessage = `${currentDescription}: ${__('Migration cancelled')}`;
    leftContent = (
      <ListView.Icon type="fa" name="ban" size="md" style={{ width: 'inherit', backgroundColor: 'transparent' }} />
    );
  } else if (task.completed && !task.completedSuccessfully) {
    leftContent = (
      <ListView.Icon
        type="pf"
        name="error-circle-o"
        size="md"
        style={{ width: 'inherit', backgroundColor: 'transparent' }}
      />
    );
  } else if (task.completed) {
    leftContent = (
      <ListView.Icon type="pf" name="ok" size="md" style={{ width: 'inherit', backgroundColor: 'transparent' }} />
    );
  } else {
    leftContent = <Spinner loading />;
  }

  const conversionHostName =
    task.options.conversion_host_name || (conversionHosts[task.id] && conversionHosts[task.id].name);

  const taskIsSelectedForCancel = !!selectedTasksForCancel.find(t => t.id === task.id);

  let preCopies;
  let grandTotalCopied;
  let grandTotalCopiedGb;
  let latestPreCopy;
  let preCopyProgressBar;
  if (isWarmMigration) {
    preCopies = reduceCopiesFromTask(task);
    grandTotalCopied = preCopies.reduce((sum, copy) => sum + copy.totalCopied, 0);
    grandTotalCopiedGb = numeral(grandTotalCopied).format('0.00 ib');

    latestPreCopy = preCopies.length > 0 && preCopies[0];
    if (latestPreCopy) {
      const { totalCopied, totalToCopy } = latestPreCopy;
      const totalCopiedGb = numeral(totalCopied).format('0.00 ib');
      const totalToCopyGb = numeral(totalToCopy).format('0.00 ib');
      preCopyProgressBar = (
        <UtilizationBar
          now={totalCopied}
          min={0}
          max={totalToCopy}
          description={sprintf(__('%s of %s Copied'), totalCopiedGb, totalToCopyGb)}
          label=" "
          usedTooltipFunction={(max, now) => (
            <Tooltip id={Date.now()}>
              {Math.floor((now / max) * 100)} % {__('Copied')}
            </Tooltip>
          )}
          availableTooltipFunction={(max, now) => (
            <Tooltip id={Date.now()}>
              {Math.floor(((max - now) / max) * 100)} % {__('Remaining')}
            </Tooltip>
          )}
          descriptionPlacementTop
        />
      );
    }
  }

  return (
    <ListViewTable.Row
      key={task.id}
      checkboxInput={
        <input
          type="checkbox"
          disabled={taskCancelled || task.completed}
          checked={taskIsSelectedForCancel}
          onChange={() => handleCheckboxChange(task)}
        />
      }
      leftContent={leftContent}
      heading={task.vmName}
      additionalInfo={[
        <ListViewTable.InfoItem key={`${task.id}-message`} className="task-status-messages">
          <div>
            <div style={{ display: 'inline-block', textAlign: 'left' }}>
              <span>{mainStatusMessage}</span>
              <div style={{ maxWidth: 225 }}>
                <EllipsisWithTooltip>{statusDetailMessage}</EllipsisWithTooltip>
              </div>
            </div>
          </div>
          <div>
            <ListView.Icon type="fa" size="lg" name="clock-o" className="elapsed-clock-icon" />
            {__('Elapsed: ')}
            <TickingIsoElapsedTime
              startTime={task.startDateTime}
              endTime={task.completed ? task.lastUpdateDateTime : null}
            />
          </div>
        </ListViewTable.InfoItem>,
        isWarmMigration ? (
          <ListViewTable.InfoItem key={`${task.id}-num-precopies`}>
            {preCopies.length} {preCopies.length === 1 ? __('Pre-copy') : __('Pre-copies')}
          </ListViewTable.InfoItem>
        ) : null,
        isWarmMigration ? (
          latestPreCopy && !latestPreCopy.latestEndTime ? (
            <ListViewTable.InfoItem key={`${task.id}-precopy-progress`}>{preCopyProgressBar}</ListViewTable.InfoItem>
          ) : (
            <ListViewTable.InfoItem key={`${task.id}-precopy-total`}>
              {preCopies.length === 1
                ? sprintf(__('%s copied during 1 pre-copy'), grandTotalCopiedGb)
                : sprintf(__('%s copied during %s pre-copies'), grandTotalCopiedGb, preCopies.length)}
            </ListViewTable.InfoItem>
          )
        ) : (
          <ListViewTable.InfoItem key={`${task.id}-times`}>
            <UtilizationBar
              now={task.percentComplete}
              min={0}
              max={100}
              description={sprintf(__('%s of %s Migrated'), task.diskSpaceCompletedGb, task.totalDiskSpaceGb)}
              label=" "
              usedTooltipFunction={(max, now) => (
                <Tooltip id={Date.now()}>
                  {now} % {__('Migrated')}
                </Tooltip>
              )}
              availableTooltipFunction={(max, now) => (
                <Tooltip id={Date.now()}>
                  {max - now} % {__('Remaining')}
                </Tooltip>
              )}
              descriptionPlacementTop
            />
          </ListViewTable.InfoItem>
        )
      ]}
      actions={
        <DropdownButton
          id={`${task.id}-${task.descriptionPrefix}_download_log_dropdown`}
          title={__('Download Log')}
          pullRight
          onSelect={eventKey => downloadLogForTask(eventKey, task)}
          disabled={
            !task.log_available ||
            (downloadLogInProgressTaskIds &&
              downloadLogInProgressTaskIds.find(element => element === task.id) &&
              !task.options.prePlaybookComplete &&
              !task.options.postPlaybookComplete)
          }
        >
          {task.options.prePlaybookComplete && (
            <MenuItem
              eventKey="preMigration"
              disabled={downloadLogInProgressTaskIds && downloadLogInProgressTaskIds.indexOf(task.id) > -1}
            >
              {__('Premigration log')}
            </MenuItem>
          )}
          <MenuItem
            eventKey="migration"
            disabled={downloadLogInProgressTaskIds && downloadLogInProgressTaskIds.indexOf(task.id) > -1}
          >
            {__('Migration log')}
          </MenuItem>
          <MenuItem
            eventKey="wrapper"
            disabled={downloadLogInProgressTaskIds && downloadLogInProgressTaskIds.indexOf(task.id) > -1}
          >
            {__('Virt-v2v-wrapper log')}
          </MenuItem>
          {task.options.postPlaybookComplete && (
            <MenuItem
              eventKey="postMigration"
              disabled={downloadLogInProgressTaskIds && downloadLogInProgressTaskIds.indexOf(task.id) > -1}
            >
              {__('Postmigration log')}
            </MenuItem>
          )}
        </DropdownButton>
      }
      stacked
      onExpand={() => fetchDetailsForTask(task)}
    >
      <div className="expanded-task-info">
        <div>
          <strong>{__('Start Time')}: </strong>
          {formatDateTime(task.startDateTime)}
        </div>
        <div>
          <strong>{__('Conversion Host')}: </strong>
          {conversionHostName}
        </div>
        {task.log_available && (
          <div>
            <strong>{__('Log:')} </strong>
            {task.options.virtv2v_wrapper.v2v_log}
          </div>
        )}
      </div>
      {isWarmMigration && (
        <table className="warm-migration-precopies">
          <tbody>
            {preCopies.map(({ earliestStartTime, latestEndTime, totalCopied, finishedWithErrors }, index) => {
              let statusIcon = <Spinner loading />;
              if (latestEndTime) {
                if (finishedWithErrors) {
                  statusIcon = <ListView.Icon type="pf" name="warning-triangle-o" size="md" />;
                } else {
                  statusIcon = <ListView.Icon type="pf" name="ok" size="md" />;
                }
              }
              return (
                <tr key={earliestStartTime}>
                  <td className="precopy-status-icon">{statusIcon}</td>
                  <td>
                    {__('Pre-copy')} {preCopies.length - index}
                  </td>
                  <td>
                    {__('Start')}: {formatDateTime(earliestStartTime * 1000)}
                  </td>
                  <td>
                    {latestEndTime && (
                      <React.Fragment>
                        {__('End')}: {formatDateTime(latestEndTime * 1000)}
                      </React.Fragment>
                    )}
                  </td>
                  <td>
                    {numeral(totalCopied).format('0.00 ib')} {__('copied')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </ListViewTable.Row>
  );
};

const taskShape = PropTypes.shape({
  id: PropTypes.string,
  completed: PropTypes.bool,
  completedSuccessfully: PropTypes.bool,
  diskSpaceCompletedGb: PropTypes.string,
  totalDiskSpaceGb: PropTypes.string,
  vmName: PropTypes.string,
  startDateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  lastUpdateDateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  percentComplete: PropTypes.number,
  descriptionPrefix: PropTypes.string,
  log_available: PropTypes.bool,
  options: PropTypes.shape({
    prePlaybookComplete: PropTypes.bool,
    postPlaybookComplete: PropTypes.bool
  })
});

PlanRequestDetailListItem.propTypes = {
  task: taskShape.isRequired,
  isWarmMigration: PropTypes.bool,
  conversionHosts: PropTypes.object, // Map of task ids to conversion host objects
  downloadLogInProgressTaskIds: PropTypes.arrayOf(PropTypes.string),
  ansiblePlaybookTemplate: PropTypes.shape({ name: PropTypes.string }),
  markedForCancellation: PropTypes.arrayOf(taskShape).isRequired,
  selectedTasksForCancel: PropTypes.arrayOf(taskShape).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  fetchDetailsForTask: PropTypes.func.isRequired,
  downloadLogForTask: PropTypes.func.isRequired
};

PlanRequestDetailListItem.defaultProps = {
  isWarmMigration: false,
  downloadLogInProgressTaskIds: [],
  ansiblePlaybookTemplate: { name: '' }
};

export default PlanRequestDetailListItem;
