import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Filter } from 'patternfly-react';

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

  render() {
    return this.props.children(this.state, {
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
      renderInput: this.renderInput
    });
  }
}

ListViewToolbar.propTypes = {
  filterTypes: PropTypes.array,
  listItems: PropTypes.array,
  children: PropTypes.func,
  sortFields: PropTypes.array,
  defaultSortTypeIndex: PropTypes.number,
  defaultFilterTypeIndex: PropTypes.number
};

ListViewToolbar.defaultProps = {
  defaultSortTypeIndex: 1,
  defaultFilterTypeIndex: 0
};

export default ListViewToolbar;
