import React from 'react';
import PropTypes from 'prop-types';
import { Grid, ListView, Toolbar, Tooltip, UtilizationBar } from 'patternfly-react';
import ListViewToolbar from '../../common/ListViewToolbar/ListViewToolbar';

const PlanVmsList = props => (
  <ListViewToolbar filterTypes={PlanVmsList.filterTypes} sortFields={PlanVmsList.sortFields} listItems={props.planVms}>
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
        <div className="main-body-content">
          <ListView className="plan-request-details-list">
            {filteredSortedPaginatedListItems.items.map((task, n) => (
              <ListView.Item
                key={task.id}
                heading={task.name}
                additionalInfo={[
                  <ListView.InfoItem key={`${task.id}-times`} style={{ minWidth: 150, paddingRight: 20 }}>
                    <ListView.Icon type="fa" size="lg" name="clock-o" />
                    {'00:00:00'}
                  </ListView.InfoItem>,
                  <ListView.InfoItem key={`${task.id}-message`} style={{ minWidth: 150, paddingRight: 20 }}>
                    {__('Not started')}
                  </ListView.InfoItem>
                ]}
                actions={
                  <UtilizationBar
                    now={0}
                    min={0}
                    max={100}
                    description={__('0 GBs Migrated')}
                    label=" "
                    usedTooltipFunction={(max, now) => (
                      <Tooltip id={Date.now()}>
                        {now} % {__('Migrated')}
                      </Tooltip>
                    )}
                    availableTooltipFunction={(max, now) => (
                      <Tooltip id={Date.now()}>
                        {Math.round(max - now)} % {__('Remaining')}
                      </Tooltip>
                    )}
                    descriptionPlacementTop
                  />
                }
                stacked
              />
            ))}
          </ListView>
          {renderPaginationRow(filteredSortedPaginatedListItems)}
        </div>
      </React.Fragment>
    )}
  </ListViewToolbar>
);

PlanVmsList.propTypes = {
  planVms: PropTypes.array
};

PlanVmsList.sortFields = [{ id: 'name', title: __('Name'), isNumeric: false }];

PlanVmsList.filterTypes = [
  {
    id: 'name',
    title: __('Name'),
    placeholder: __('Filter by Name'),
    filterType: 'text'
  }
];

export default PlanVmsList;
