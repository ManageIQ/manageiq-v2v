import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import {
  DropdownKebab,
  Grid,
  ListView,
  MenuItem,
  Toolbar,
  Button,
  Spinner,
  OverlayTrigger,
  Popover,
  Icon
} from 'patternfly-react';
import ListViewToolbar from '../../../../common/ListViewToolbar/ListViewToolbar';
import ConversionHostRemoveButton from './ConversionHostRemoveButton';
import DeleteConversionHostConfirmationModal from './DeleteConversionHostConfirmationModal';
import StopPropagationOnClick from '../../../../common/StopPropagationOnClick';
import { FINISHED, ERROR } from '../ConversionHostsSettingsConstants';

const ConversionHostsList = ({
  combinedListItems,
  conversionHostToDelete,
  deleteConversionHostAction,
  deleteConversionHostActionUrl,
  hideConversionHostDeleteModalAction,
  setHostToDeleteAction,
  conversionHostDeleteModalVisible,
  showConversionHostDeleteModalAction,
  isDeletingConversionHost
}) => {
  const renderListItem = item =>
    item.meta && item.meta.isTask ? renderEnablementTaskItem(item) : renderConversionHostItem(item);

  const renderTaskInfoPopover = task => (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement="top"
      overlay={
        <Popover id="task-info-popover" style={{ width: 400 }}>
          {task ? (
            <React.Fragment>
              <strong>{__('State:')}</strong> {task.state}
              <br />
              <strong>{__('Message:')}</strong> {task.message}
            </React.Fragment>
          ) : (
            __('No configuration task information available')
          )}
        </Popover>
      }
    >
      <Button bsStyle="link">
        <Icon type="pf" name="info" />
      </Button>
    </OverlayTrigger>
  );

  //const infoItemProps = { style: { minWidth: 300 } };

  const renderEnablementTaskItem = task => {
    let statusInfo = null;
    if (task.status === ERROR) {
      statusInfo = (
        <React.Fragment>
          <ListView.Icon type="pf" name="error-circle-o" />
          {__('Configuration Failed')}
          {renderTaskInfoPopover(task)}
        </React.Fragment>
      );
    } else {
      statusInfo = (
        <React.Fragment>
          <Spinner loading size="sm" inline /> {__('Configuring...')}
          {renderTaskInfoPopover(task)}
        </React.Fragment>
      );
    }
    return (
      <ListView.Item
        key={`conversion-host-task-${task.id}`}
        heading={task.name}
        additionalInfo={[<ListView.InfoItem key={`task-${task.id}-status`}>{statusInfo}</ListView.InfoItem>]}
        stacked
        actions={
          <div>
            {task.status === ERROR && <Button>{__('Retry') /* TODO */}</Button>}
            <Button disabled={task.state !== FINISHED}>{__('Remove') /* TODO */}</Button>
            <StopPropagationOnClick>
              <DropdownKebab id={`conversion-list-kebab-${task.name}`} pullRight>
                <MenuItem disabled={task.state !== FINISHED}>{__('Download Log') /* TODO */}</MenuItem>
              </DropdownKebab>
            </StopPropagationOnClick>
          </div>
        }
      />
    );
  };

  // TODO look for disable tasks in meta.tasksByOperation.disable
  // TODO look for last completed enable task in meta.tasksByOperation.enable
  // * has no active disable task? render checkmark, "Configured"
  //     popover with details of last enable task (or "No configuration task information available")
  //     disable Download Log if no enable task is present
  // * has an active disable task? render spinner, "Disabling...", state and message in popover, [remove] (disabled)
  // * has a failed disable task? render red X, "Disable Failed", state and message in popover, [retry] <--- how does this work?
  const renderConversionHostItem = conversionHost => {
    const { enable, disable } = conversionHost.meta.tasksByOperation;
    const mostRecentFirst = (a, b) => (a.updated_on > b.updated_on ? -1 : a.updated_on < b.updated_on ? 1 : 0);
    const lastEnableTask = enable && Immutable.asMutable(enable).sort(mostRecentFirst)[0];
    const lastDisableTask = disable && Immutable.asMutable(disable).sort(mostRecentFirst)[0];
    let statusInfo = null;
    if (lastDisableTask && lastDisableTask.status === ERROR) {
      statusInfo = (
        <React.Fragment>
          <ListView.Icon type="pf" name="error-circle-o" />
          {__('Disable Failed')}
          {renderTaskInfoPopover(lastDisableTask)}
        </React.Fragment>
      );
    } else if (lastDisableTask && lastDisableTask.state !== FINISHED) {
      statusInfo = (
        <React.Fragment>
          <Spinner loading size="sm" inline /> {__('Disabling...')}
          {renderTaskInfoPopover(lastDisableTask)}
        </React.Fragment>
      );
    } else {
      statusInfo = (
        <React.Fragment>
          <ListView.Icon type="pf" name="ok" />
          {__('Configured')}
          {renderTaskInfoPopover(lastEnableTask)}
        </React.Fragment>
      );
    }
    return (
      <ListView.Item
        key={`conversion-host-${conversionHost.id}`}
        heading={conversionHost.name}
        additionalInfo={[
          <ListView.InfoItem key={`conversion-host-${conversionHost.id}-status`}>{statusInfo}</ListView.InfoItem>
        ]}
        stacked
        actions={
          <div>
            <ConversionHostRemoveButton
              host={conversionHost}
              setHostToDeleteAction={setHostToDeleteAction}
              showConversionHostDeleteModalAction={showConversionHostDeleteModalAction}
              disabled={lastDisableTask && lastDisableTask.state !== FINISHED}
            />
            <StopPropagationOnClick>
              {lastEnableTask && (
                <DropdownKebab id={`conversion-list-kebab-${conversionHost.name}`} pullRight>
                  <MenuItem>{__('Download Log') /* TODO */}</MenuItem>
                </DropdownKebab>
              )}
            </StopPropagationOnClick>
          </div>
        }
      />
    );
  };

  return (
    <React.Fragment>
      <ListViewToolbar
        filterTypes={ConversionHostsList.filterTypes}
        sortFields={ConversionHostsList.sortFields}
        listItems={combinedListItems}
      >
        {({
          filteredSortedPaginatedListItems,
          renderFilterControls,
          renderSortControls,
          renderActiveFilters,
          renderPaginationRow
        }) => (
          <React.Fragment>
            <Grid.Row>
              <Toolbar>
                {renderFilterControls()}
                {renderSortControls()}
                {renderActiveFilters(filteredSortedPaginatedListItems)}
              </Toolbar>
            </Grid.Row>
            <div style={{ overflow: 'auto', paddingBottom: 300, height: '100%' }}>
              <ListView className="conversion-hosts-list" id="conversion_hosts">
                {filteredSortedPaginatedListItems.items.map(renderListItem)}
              </ListView>
              {renderPaginationRow(filteredSortedPaginatedListItems)}
            </div>
          </React.Fragment>
        )}
      </ListViewToolbar>

      <DeleteConversionHostConfirmationModal
        conversionHostToDelete={conversionHostToDelete}
        deleteConversionHostAction={deleteConversionHostAction}
        deleteConversionHostActionUrl={deleteConversionHostActionUrl}
        hideConversionHostDeleteModalAction={hideConversionHostDeleteModalAction}
        conversionHostDeleteModalVisible={conversionHostDeleteModalVisible}
        isDeletingConversionHost={isDeletingConversionHost}
      />
    </React.Fragment>
  );
};

ConversionHostsList.propTypes = {
  combinedListItems: PropTypes.arrayOf(PropTypes.object),
  conversionHostToDelete: PropTypes.object,
  deleteConversionHostAction: PropTypes.func,
  deleteConversionHostActionUrl: PropTypes.string,
  hideConversionHostDeleteModalAction: PropTypes.func,
  setHostToDeleteAction: PropTypes.func,
  conversionHostDeleteModalVisible: PropTypes.bool,
  showConversionHostDeleteModalAction: PropTypes.func,
  isDeletingConversionHost: PropTypes.bool
};

ConversionHostsList.sortFields = [
  {
    id: 'name',
    title: __('Name'),
    isNumeric: false
  }
];

ConversionHostsList.filterTypes = [
  {
    id: 'name',
    title: __('Name'),
    placeholder: __('Filter by Name'),
    filterType: 'text'
  }
];

export default ConversionHostsList;
