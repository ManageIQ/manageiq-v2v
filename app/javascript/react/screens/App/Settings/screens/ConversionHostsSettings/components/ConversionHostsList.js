import React from 'react';
import PropTypes from 'prop-types';
import { Grid, ListView, Toolbar } from 'patternfly-react';
import ListViewToolbar from '../../../../common/ListViewToolbar/ListViewToolbar';
import ConversionHostsListItem from './ConversionHostsListItem';
import DeleteConversionHostConfirmationModal from './DeleteConversionHostConfirmationModal';
import RetryConversionHostConfirmationModal from './RetryConversionHostConfirmationModal';

const ConversionHostsList = ({
  combinedListItems,
  conversionHostToDelete,
  deleteConversionHostAction,
  deleteConversionHostActionUrl,
  hideConversionHostDeleteModalAction,
  setHostToDeleteAction,
  conversionHostDeleteModalVisible,
  showConversionHostDeleteModalAction,
  isDeletingConversionHost,
  conversionHostRetryModalMounted,
  conversionHostRetryModalVisible,
  conversionHostTaskToRetry,
  isPostingConversionHosts,
  setConversionHostTaskToRetryAction,
  showConversionHostRetryModalAction,
  hideConversionHostRetryModalAction,
  postConversionHostsAction,
  postConversionHostsUrl
}) => (
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
              {filteredSortedPaginatedListItems.items.map(listItem => {
                const { isTask } = listItem.meta;
                const itemKey = `conversion-host-${isTask ? 'task-' : ''}${listItem.id}`;
                return (
                  <ConversionHostsListItem
                    key={itemKey}
                    listItem={listItem}
                    isTask={isTask}
                    setHostToDeleteAction={setHostToDeleteAction}
                    showConversionHostDeleteModalAction={showConversionHostDeleteModalAction}
                    setConversionHostTaskToRetryAction={setConversionHostTaskToRetryAction}
                    showConversionHostRetryModalAction={showConversionHostRetryModalAction}
                    isPostingConversionHosts={isPostingConversionHosts}
                  />
                );
              })}
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
    {conversionHostRetryModalMounted && (
      <RetryConversionHostConfirmationModal
        show={conversionHostRetryModalVisible}
        conversionHostTaskToRetry={conversionHostTaskToRetry}
        isPostingConversionHosts={isPostingConversionHosts}
        hideConversionHostRetryModalAction={hideConversionHostRetryModalAction}
        postConversionHostsAction={postConversionHostsAction}
        postConversionHostsUrl={postConversionHostsUrl}
      />
    )}
  </React.Fragment>
);

ConversionHostsList.propTypes = {
  combinedListItems: PropTypes.arrayOf(PropTypes.object),
  conversionHostToDelete: PropTypes.object,
  deleteConversionHostAction: PropTypes.func,
  deleteConversionHostActionUrl: PropTypes.string,
  hideConversionHostDeleteModalAction: PropTypes.func,
  setHostToDeleteAction: PropTypes.func,
  conversionHostDeleteModalVisible: PropTypes.bool,
  showConversionHostDeleteModalAction: PropTypes.func,
  isDeletingConversionHost: PropTypes.bool,
  conversionHostRetryModalMounted: PropTypes.bool,
  conversionHostRetryModalVisible: PropTypes.bool,
  conversionHostTaskToRetry: PropTypes.object,
  isPostingConversionHosts: PropTypes.bool,
  setConversionHostTaskToRetryAction: PropTypes.func,
  showConversionHostRetryModalAction: PropTypes.func,
  hideConversionHostRetryModalAction: PropTypes.func,
  postConversionHostsAction: PropTypes.func,
  postConversionHostsUrl: PropTypes.string
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
