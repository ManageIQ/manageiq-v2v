import React from 'react';
import PropTypes from 'prop-types';
import { Grid, ListView, Toolbar } from 'patternfly-react';
import ListViewToolbar from '../../../../common/ListViewToolbar/ListViewToolbar';

const ConversionHostsList = ({ conversionHosts }) => (
  <ListViewToolbar
    filterTypes={ConversionHostsList.filterTypes}
    sortFields={ConversionHostsList.sortFields}
    listItems={conversionHosts}
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
            {filteredSortedPaginatedListItems.items.map((host, n) => (
              <ListView.Item key={host.id} heading={host.name} stacked />
            ))}
          </ListView>
          {renderPaginationRow(filteredSortedPaginatedListItems)}
        </div>
      </React.Fragment>
    )}
  </ListViewToolbar>
);

ConversionHostsList.propTypes = {
  conversionHosts: PropTypes.arrayOf(PropTypes.object)
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
