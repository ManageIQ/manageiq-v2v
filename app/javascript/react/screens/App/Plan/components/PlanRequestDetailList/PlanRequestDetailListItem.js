import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  ListView,
  Popover,
  Spinner,
  OverlayTrigger,
  Tooltip,
  UtilizationBar,
  DropdownButton,
  MenuItem
} from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import { migrationStatusMessage } from '../../PlanConstants';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import StopPropagationOnClick from '../../../common/StopPropagationOnClick';

const PlanRequestDetailListItem = ({
  task,
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
  const statusDetailMessage =
    task.options.progress &&
    task.options.progress.current_state &&
    task.options.progress.states &&
    migrationStatusMessage(task.options.progress.states[task.options.progress.current_state].message);

  let leftContent;
  if (task.message === 'Pending') {
    leftContent = (
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
  const label = sprintf(__('%s of %s Migrated'), task.diskSpaceCompletedGb, task.totalDiskSpaceGb);

  const conversionHostName =
    task.options.conversion_host_name || (conversionHosts[task.id] && conversionHosts[task.id].name);

  const popoverContent = (
    <Popover id={`popover${task.id}`} title={mainStatusMessage} className="task-info-popover">
      <div>
        <div>
          <b>{__('Start Time')}: </b>
          {formatDateTime(task.startDateTime)}
        </div>
        <div>
          <b>{__('Conversion Host')}: </b>
          {conversionHostName}
        </div>
        {task.log_available && (
          <div>
            <strong>{__('Log:')}</strong>
            <br />
            {task.options.virtv2v_wrapper.v2v_log}
          </div>
        )}
      </div>
    </Popover>
  );

  const taskIsSelectedForCancel = !!selectedTasksForCancel.find(t => t.id === task.id);

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
        <ListViewTable.InfoItem
          key={`${task.id}-message`}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginRight: 80,
            minWidth: 200
          }}
        >
          <div>
            <div style={{ display: 'inline-block', textAlign: 'left' }}>
              <span>{mainStatusMessage}</span>
              <div style={{ maxWidth: 250 }}>
                <EllipsisWithTooltip>{statusDetailMessage}</EllipsisWithTooltip>
              </div>
            </div>
            &nbsp;
            <StopPropagationOnClick>
              <OverlayTrigger
                rootClose
                trigger="click"
                onEnter={() => fetchDetailsForTask(task)} // TODO also call this on row expand? how to dedupe?
                placement="left"
                overlay={popoverContent}
              >
                <Button bsStyle="link">
                  <Icon type="pf" name="info" />
                </Button>
              </OverlayTrigger>
            </StopPropagationOnClick>
          </div>
          <div>
            <ListView.Icon type="fa" size="lg" name="clock-o" />
            <TickingIsoElapsedTime
              startTime={task.startDateTime}
              endTime={task.completed ? task.lastUpdateDateTime : null}
            />
          </div>
        </ListViewTable.InfoItem>,
        <ListViewTable.InfoItem key={`${task.id}-times`} style={{ minWidth: 150, paddingRight: 20 }}>
          <UtilizationBar
            now={task.percentComplete}
            min={0}
            max={100}
            description={label}
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
    />
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
  downloadLogInProgressTaskIds: [],
  ansiblePlaybookTemplate: { name: '' }
};

export default PlanRequestDetailListItem;
