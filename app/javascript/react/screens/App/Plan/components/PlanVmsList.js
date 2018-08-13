import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  FormControl,
  ListView,
  PaginationRow,
  Toolbar,
  Filter,
  Sort,
  Tooltip,
  UtilizationBar,
  PAGINATION_VIEW
} from 'patternfly-react';
import listFilter from './listFilter';
import sortFilter from './sortFilter';
import paginate from './paginate';

class PlanVmsList extends React.Component {
  state = {
    // filter states
    currentFilterType: PlanVmsList.filterTypes[0],
    currentValue: '',
    activeFilters: [],

    // sort states
    currentSortType: PlanVmsList.sortFields[0],
    isSortNumeric: PlanVmsList.sortFields[0].isNumeric,
    isSortAscending: true,

    // pagination default states
    pagination: {
      page: 1,
      perPage: 5,
      perPageOptions: [5, 10, 15]
    },

    // page input value
    pageChangeValue: 1
  };

  onValueKeyPress = keyEvent => {
    const { currentValue, currentFilterType } = this.state;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      this.setState({ currentValue: '' });
      this.filterAdded(currentFilterType, currentValue);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  };

  onFirstPage = () => {
    this.setPage(1);
  };

  onLastPage = () => {
    const { page } = this.state.pagination;
    const totalPages = this.totalPages();
    if (page < totalPages) {
      this.setPage(totalPages);
    }
  };

  onNextPage = () => {
    const { page } = this.state.pagination;
    if (page < this.totalPages()) {
      this.setPage(this.state.pagination.page + 1);
    }
  };

  onPageInput = e => {
    this.setState({ pageChangeValue: e.target.value });
  };

  onPerPageSelect = (eventKey, e) => {
    const newPaginationState = Object.assign({}, this.state.pagination);
    newPaginationState.perPage = eventKey;
    newPaginationState.page = 1;
    this.setState({ pagination: newPaginationState });
  };

  onPreviousPage = () => {
    if (this.state.pagination.page > 1) {
      this.setPage(this.state.pagination.page - 1);
    }
  };

  onSubmit = () => {
    this.setPage(this.state.pageChangeValue);
  };

  setPage = value => {
    const page = Number(value);
    if (!Number.isNaN(value) && value !== '' && page > 0 && page <= this.totalPages()) {
      const newPaginationState = Object.assign({}, this.state.pagination);
      newPaginationState.page = page;
      this.setState({ pagination: newPaginationState, pageChangeValue: page });
    }
  };

  filterValueSelected = filterValue => {
    const { currentFilterType, currentValue } = this.state;

    if (filterValue !== currentValue) {
      this.setState({ currentValue: filterValue });
      if (filterValue) {
        this.filterAdded(currentFilterType, filterValue);
      }
    }
  };

  clearFilters = () => {
    this.setState({ activeFilters: [] });
  };

  removeFilter = filter => {
    const { activeFilters } = this.state;
    const index = activeFilters.indexOf(filter);
    if (index > -1) {
      const updated = [...activeFilters.slice(0, index), ...activeFilters.slice(index + 1)];
      this.setState({ activeFilters: updated });
    }
  };

  updateCurrentValue = event => {
    this.setState({ currentValue: event.target.value });
  };

  filterSortPaginatePlanVms = () => {
    const { activeFilters, currentSortType, isSortNumeric, isSortAscending, pagination } = this.state;
    const { planVms } = this.props;

    return paginate(
      sortFilter(currentSortType, isSortNumeric, isSortAscending, listFilter(activeFilters, planVms)),
      pagination.page,
      pagination.perPage
    );
  };

  toggleCurrentSortDirection = () => {
    this.setState(prevState => ({
      isSortAscending: !prevState.isSortAscending
    }));
  };

  updateCurrentSortType = sortType => {
    const { currentSortType } = this.state;
    if (currentSortType !== sortType) {
      this.setState({
        currentSortType: sortType,
        isSortNumeric: sortType.isNumeric,
        isSortAscending: true
      });
    }
  };

  filterAdded = (field, value) => {
    let filterText = field.title || field;

    filterText += ': ';
    filterText += value.title || value;

    this.setState(prevState => ({
      activeFilters: [...prevState.activeFilters, { label: filterText, field, value: value.title || value }],
      pagination: {
        ...prevState.pagination,
        page: 1
      },
      pageChangeValue: 1
    }));
  };

  totalPages = () => {
    const { activeFilters, pagination } = this.state;
    const { planVms } = this.props;
    const allFilteredTasks = listFilter(activeFilters, planVms);

    return Math.ceil(allFilteredTasks.length / pagination.perPage);
  };

  renderInput = () => {
    const { currentFilterType, currentValue } = this.state;
    return (
      <FormControl
        type={currentFilterType.filterType}
        value={currentValue}
        placeholder={currentFilterType.placeholder}
        onChange={e => this.updateCurrentValue(e)}
        onKeyPress={e => this.onValueKeyPress(e)}
      />
    );
  };

  render() {
    const {
      activeFilters,
      currentFilterType,
      currentSortType,
      isSortNumeric,
      isSortAscending,
      pagination,
      pageChangeValue
    } = this.state;

    const paginatedSortedFiltersVms = this.filterSortPaginatePlanVms();

    return (
      <React.Fragment>
        <Grid.Row>
          <Toolbar>
            <Filter>
              <Filter.TypeSelector filterTypes={PlanVmsList.filterTypes} currentFilterType={currentFilterType} />
              {this.renderInput()}
            </Filter>
            <Sort>
              <Sort.TypeSelector
                sortTypes={PlanVmsList.sortFields}
                currentSortType={currentSortType}
                onSortTypeSelected={this.updateCurrentSortType}
              />
              <Sort.DirectionSelector
                isNumeric={isSortNumeric}
                isAscending={isSortAscending}
                onClick={this.toggleCurrentSortDirection}
              />
            </Sort>
            {activeFilters &&
              activeFilters.length > 0 && (
                <Toolbar.Results>
                  <h5>
                    {paginatedSortedFiltersVms.itemCount}{' '}
                    {paginatedSortedFiltersVms.itemCount === 1 ? __('Result') : __('Results')}
                  </h5>
                  <Filter.ActiveLabel>{__('Active Filters')}:</Filter.ActiveLabel>
                  <Filter.List>
                    {activeFilters.map((item, index) => (
                      <Filter.Item key={index} onRemove={this.removeFilter} filterData={item}>
                        {__('label=')}
                        {item.label}
                      </Filter.Item>
                    ))}
                  </Filter.List>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      this.clearFilters();
                    }}
                  >
                    {__('Clear All Filters')}
                  </a>
                </Toolbar.Results>
              )}
          </Toolbar>
        </Grid.Row>
        <div style={{ overflow: 'auto', paddingBottom: 300, height: '100%' }}>
          <ListView className="plan-request-details-list">
            {paginatedSortedFiltersVms.tasks.map((task, n) => (
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
          <PaginationRow
            viewType={PAGINATION_VIEW.LIST}
            pagination={pagination}
            pageInputValue={pageChangeValue}
            amountOfPages={paginatedSortedFiltersVms.amountOfPages}
            itemCount={paginatedSortedFiltersVms.itemCount}
            itemsStart={paginatedSortedFiltersVms.itemsStart}
            itemsEnd={paginatedSortedFiltersVms.itemsEnd}
            onPerPageSelect={this.onPerPageSelect}
            onFirstPage={this.onFirstPage}
            onPreviousPage={this.onPreviousPage}
            onPageInput={this.onPageInput}
            onNextPage={this.onNextPage}
            onLastPage={this.onLastPage}
            onSubmit={this.onSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}

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
