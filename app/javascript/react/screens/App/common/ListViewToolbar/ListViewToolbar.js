import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Filter, Sort, Toolbar, PaginationRow, PAGINATION_VIEW } from 'patternfly-react';

import listFilter from './listFilter';
import sortFilter from './sortFilter';
import paginate from './paginate';

class ListViewToolbar extends Component {
  state = {
    filterTypes: this.props.filterTypes,
    currentFilterType: this.props.filterTypes[this.props.defaultFilterTypeIndex],
    currentValue: '',
    activeFilters: [],
    sortFields: this.props.sortFields,
    currentSortType: this.props.sortFields[this.props.defaultSortTypeIndex],
    isSortNumeric: this.props.sortFields[this.props.defaultSortTypeIndex].isNumeric,
    isSortAscending: true,
    pagination: {
      page: 1,
      perPage: 10,
      perPageOptions: [5, 10, 15]
    },
    pageChangeValue: 1
  };

  componentDidMount() {
    const { initialFilter, filterTypes } = this.props;
    if (initialFilter) {
      const { filterTypeId, filterValue } = initialFilter;
      const fieldObj = filterTypes.find(ft => ft.id === filterTypeId);
      if (fieldObj) this.filterAdded(fieldObj, filterValue);
    }
  }

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
    this.setState({ activeFilters: [], currentValue: '' });
  };

  removeFilter = filter => {
    const { activeFilters } = this.state;
    const index = activeFilters.indexOf(filter);
    if (index > -1) {
      const updated = [...activeFilters.slice(0, index), ...activeFilters.slice(index + 1)];
      this.setState({ activeFilters: updated });
    }
  };

  selectFilterType = filterType => {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });
    }
  };

  updateCurrentValue = event => {
    this.setState({ currentValue: event.target.value });
  };

  filterListItems = () => {
    const { activeFilters } = this.state;
    const { listItems } = this.props;
    return listFilter(activeFilters, listItems);
  };

  filterSortPaginateListItems = (filteredItems = this.filterListItems()) => {
    const { currentSortType, isSortNumeric, isSortAscending, pagination } = this.state;
    return paginate(
      sortFilter(currentSortType, isSortNumeric, isSortAscending, filteredItems),
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
    const { listItems } = this.props;
    const allFilteredTasks = listFilter(activeFilters, listItems);

    return Math.ceil(allFilteredTasks.length / pagination.perPage);
  };

  renderInput = () => {
    const { currentFilterType, currentValue } = this.state;
    if (!currentFilterType) {
      return null;
    }
    if (currentFilterType.filterType === 'select') {
      return (
        <Filter.ValueSelector
          filterValues={currentFilterType.filterValues}
          placeholder={currentFilterType.placeholder}
          currentValue={currentValue}
          onFilterValueSelected={this.filterValueSelected}
        />
      );
    }
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

  renderFilterControls = () => {
    const { filterTypes, currentFilterType } = this.state;
    return (
      <Filter style={{ paddingLeft: 0 }}>
        <Filter.TypeSelector
          filterTypes={filterTypes}
          currentFilterType={currentFilterType}
          onFilterTypeSelected={this.selectFilterType}
        />
        {this.renderInput()}
      </Filter>
    );
  };

  renderSortControls = () => {
    const { sortFields, currentSortType, isSortNumeric, isSortAscending } = this.state;
    return (
      <Sort>
        <Sort.TypeSelector
          sortTypes={sortFields}
          currentSortType={currentSortType}
          onSortTypeSelected={this.updateCurrentSortType}
        />
        <Sort.DirectionSelector
          isNumeric={isSortNumeric}
          isAscending={isSortAscending}
          onClick={this.toggleCurrentSortDirection}
        />
      </Sort>
    );
  };

  renderActiveFilters = filteredSortedPaginatedListItems => {
    const { activeFilters } = this.state;
    return (
      activeFilters &&
      activeFilters.length > 0 && (
        <Toolbar.Results>
          <h5>
            {filteredSortedPaginatedListItems.itemCount}{' '}
            {filteredSortedPaginatedListItems.itemCount === 1 ? __('Result') : __('Results')}
          </h5>
          <Filter.ActiveLabel>{__('Active Filters')}:</Filter.ActiveLabel>
          <Filter.List>
            {activeFilters.map((item, index) => (
              <Filter.Item key={index} onRemove={this.removeFilter} filterData={item}>
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
      )
    );
  };

  renderPaginationRow = filteredSortedPaginatedListItems => {
    const { pagination, pageChangeValue } = this.state;
    return (
      <PaginationRow
        viewType={PAGINATION_VIEW.LIST}
        pagination={pagination}
        pageInputValue={pageChangeValue}
        amountOfPages={filteredSortedPaginatedListItems.amountOfPages}
        itemCount={filteredSortedPaginatedListItems.itemCount}
        itemsStart={filteredSortedPaginatedListItems.itemsStart}
        itemsEnd={filteredSortedPaginatedListItems.itemsEnd}
        onPerPageSelect={this.onPerPageSelect}
        onFirstPage={this.onFirstPage}
        onPreviousPage={this.onPreviousPage}
        onPageInput={this.onPageInput}
        onNextPage={this.onNextPage}
        onLastPage={this.onLastPage}
        onSubmit={this.onSubmit}
      />
    );
  };

  render() {
    return this.props.children(
      {
        onFirstPage: this.onFirstPage,
        onLastPage: this.onLastPage,
        onNextPage: this.onNextPage,
        onPageInput: this.onPageInput,
        onPerPageSelect: this.onPerPageSelect,
        onPreviousPage: this.onPreviousPage,
        onSubmit: this.onSubmit,
        clearFilters: this.clearFilters,
        removeFilter: this.removeFilter,
        selectFilterType: this.selectFilterType,
        filteredSortedPaginatedListItems: this.filterSortPaginateListItems(),
        toggleCurrentSortDirection: this.toggleCurrentSortDirection,
        updateCurrentSortType: this.updateCurrentSortType,
        renderInput: this.renderInput,
        renderFilterControls: this.renderFilterControls,
        renderSortControls: this.renderSortControls,
        renderActiveFilters: this.renderActiveFilters,
        renderPaginationRow: this.renderPaginationRow
      },
      this.state
    );
  }
}

ListViewToolbar.propTypes = {
  filterTypes: PropTypes.array,
  listItems: PropTypes.array,
  children: PropTypes.func,
  sortFields: PropTypes.array,
  defaultSortTypeIndex: PropTypes.number,
  defaultFilterTypeIndex: PropTypes.number,
  initialFilter: PropTypes.shape({
    filterTypeId: PropTypes.string,
    filterValue: PropTypes.string
  })
};

ListViewToolbar.defaultProps = {
  defaultSortTypeIndex: 0,
  defaultFilterTypeIndex: 0
};

export default ListViewToolbar;
