import React from 'react';
import PropTypes from 'prop-types';
import { DropdownKebab, Grid, ListView, MenuItem, Toolbar, Button } from 'patternfly-react';
import ListViewToolbar from '../../../../common/ListViewToolbar/ListViewToolbar';
import ConversionHostRemoveButton from './ConversionHostRemoveButton';
import DeleteConversionHostConfirmationModal from './DeleteConversionHostConfirmationModal';
import StopPropagationOnClick from '../../../../common/StopPropagationOnClick';

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

  // TODO implement these cases:
  // * status !== Error? render spinner, "Configuring"... state and message in popover, [remove] (disabled)
  // * status === Error? render red X, "Configuration Failed", state and message in popover, [retry] [remove]
  const renderEnablementTaskItem = task => (
    <ListView.Item
      key={`conversion-host-task-${task.id}`}
      heading={task.name}
      additionalInfo={[<ListView.InfoItem key={`task-${task.id}-status`}>TODO: task status</ListView.InfoItem>]}
      stacked
      actions={
        <div>
          <Button>{__('Remove') /* TODO */}</Button>
          <StopPropagationOnClick>
            <DropdownKebab id={`conversion-list-kebab-${task.name}`} pullRight>
              <MenuItem>{__('Download Log') /* TODO */}</MenuItem>
            </DropdownKebab>
          </StopPropagationOnClick>
        </div>
      }
    />
  );

  // TODO look for disable tasks in meta.tasksByOperation.disable
  // TODO look for last completed enable task in meta.tasksByOperation.enable
  // * has no active disable task? render checkmark, "Configured"
  //     popover with details of last enable task (or "No configuration task information available")
  //     disable Download Log if no enable task is present
  // * has an active disable task? render spinner, "Disabling...", state and message in popover, [remove] (disabled)
  // * has a failed disable task? render red X, "Disable Failed", state and message in popover, [retry] <--- how does this work?
  const renderConversionHostItem = conversionHost => (
    <ListView.Item
      key={`conversion-host-${conversionHost.id}`}
      heading={conversionHost.name}
      additionalInfo={[
        <ListView.InfoItem key={`conversion-host-${conversionHost.id}-status`}>TODO: host status</ListView.InfoItem>
      ]}
      stacked
      actions={
        <div>
          <ConversionHostRemoveButton
            host={conversionHost}
            setHostToDeleteAction={setHostToDeleteAction}
            showConversionHostDeleteModalAction={showConversionHostDeleteModalAction}
          />
          <StopPropagationOnClick>
            <DropdownKebab id={`conversion-list-kebab-${conversionHost.name}`} pullRight>
              <MenuItem>{__('Download Log') /* TODO */}</MenuItem>
            </DropdownKebab>
          </StopPropagationOnClick>
        </div>
      }
    />
  );

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
