import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  ListView,
  OverlayTrigger,
  Tooltip,
  UtilizationBar,
  DropdownButton,
  MenuItem
} from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import StopPropagationOnClick from '../../../common/StopPropagationOnClick';

const PlanRequestDetailListItem = ({
  task,
  taskCancelled,
  leftContent,
  mainStatusMessage,
  statusDetailMessage,
  popoverContent,
  label,
  downloadLogInProgressTaskIds,
  selectedTasksForCancel,
  handleCheckboxChange,
  fetchDetailsForTask,
  downloadLogForTask
}) => {
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
  taskCancelled: PropTypes.bool,
  leftContent: PropTypes.node,
  mainStatusMessage: PropTypes.string, // TODO or is it a node?
  statusDetailMessage: PropTypes.string, // TODO or is it a node?
  popoverContent: PropTypes.node,
  label: PropTypes.string, // TODO or is it a node?
  downloadLogInProgressTaskIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTasksForCancel: PropTypes.arrayOf(taskShape).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  fetchDetailsForTask: PropTypes.func.isRequired,
  downloadLogForTask: PropTypes.func.isRequired
};

PlanRequestDetailListItem.defaultProps = {
  taskCancelled: false,
  leftContent: null,
  mainStatusMessage: '',
  statusDetailMessage: '',
  popoverContent: null,
  label: ''
};

export default PlanRequestDetailListItem;
