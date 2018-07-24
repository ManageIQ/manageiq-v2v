import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';
import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import { paginate, Grid, PaginationRow, Table, Toolbar, FormControl, Filter, PAGINATION_VIEW } from 'patternfly-react';

import rowFilter from '../../../common/rowFilter';
import searchFilter from '../../../common/searchFilter';
import CustomToolbarFind from '../../../common/CustomToolbarFind';
import vmSelectionHeaderCellFormatter from './vmSelectionHeaderCellFormatter';
import vmSelectionCellFormatter from './vmSelectionCellFormatter';
import { FILTER_TYPES } from '../../PlanWizardAdvancedOptionsStepConstants';

class PlanWizardAdvancedOptionsStepTable extends React.Component {
  static deselectRow(row, scheduleType) {
    return { ...row, [scheduleType]: false };
  }
  static selectRow(row, scheduleType) {
    return { ...row, [scheduleType]: true };
  }

  constructor(props) {
    super(props);

    // enables our custom header formatters extensions to reactabular
    this.customHeaderFormatters = Table.customHeaderFormattersDefinition;

    this.state = {
      // Toolbar Filter state
      filterTypes: FILTER_TYPES,
      currentFilterType: FILTER_TYPES[0],
      currentValue: '',
      activeFilters: [],
      searchFilterValue: '',

      // Sort the first column in an ascending way by default.
      sortingColumns: {
        name: {
          direction: Table.TABLE_SORT_DIRECTION.ASC,
          position: 0
        }
      },

      // pagination default states
      pagination: {
        page: 1,
        perPage: 5,
        perPageOptions: [5, 10, 15]
      },

      // page input value
      pageChangeValue: 1
    };
  }
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

  onSelectAllRows = (event, scheduleType) => {
    const { input, rows, setVmsAction } = this.props;
    const { checked } = event.target;

    const filteredRows = this.filteredSearchedRows();
    const currentRows = this.currentRows(filteredRows).rows;

    if (checked) {
      const updatedSelections = [...new Set([...currentRows.map(row => row.id), ...this.props[scheduleType]])];

      const updatedRows = rows.map(
        row =>
          updatedSelections.indexOf(row.id) > -1 ? PlanWizardAdvancedOptionsStepTable.selectRow(row, scheduleType) : row
      );

      setVmsAction(updatedRows);
      input.onChange({ ...input.value, [scheduleType]: updatedSelections });
    } else {
      const updatedSelections = this.props[scheduleType].filter(id => !currentRows.some(row => row.id === id));

      const updatedRows = rows.map(
        row =>
          updatedSelections.indexOf(row.id) > -1
            ? row
            : PlanWizardAdvancedOptionsStepTable.deselectRow(row, scheduleType)
      );

      setVmsAction(updatedRows);
      input.onChange({ ...input.value, [scheduleType]: updatedSelections });
    }
  };

  onSelectRow = (event, row, scheduleType) => {
    const { input, rows, setVmsAction } = this.props;

    const updatedRows = rows.map(r => {
      if (r.id === row.id) {
        return event.target.checked
          ? PlanWizardAdvancedOptionsStepTable.selectRow(r, scheduleType)
          : PlanWizardAdvancedOptionsStepTable.deselectRow(r, scheduleType);
      }
      return r;
    });

    const updatedSelections = event.target.checked
      ? [...this.props[scheduleType], row.id]
      : this.props[scheduleType].filter(selectedRowId => selectedRowId !== row.id);

    setVmsAction(updatedRows);
    input.onChange({ ...input.value, [scheduleType]: updatedSelections });
  };

  onSubmit = () => {
    this.setPage(this.state.pageChangeValue);
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
  onFindAction = value => {
    // clear filters and set search text (search and filter are independent for now)
    this.setState({ activeFilters: [], searchFilterValue: value });
  };
  onFindExit = () => {
    this.setState({ searchFilterValue: '' });
  };
  setPage = value => {
    const page = Number(value);
    if (!Number.isNaN(value) && value !== '' && page > 0 && page <= this.totalPages()) {
      const newPaginationState = Object.assign({}, this.state.pagination);
      newPaginationState.page = page;
      this.setState({ pagination: newPaginationState, pageChangeValue: page });
    }
  };

  getColumns = () => {
    const getSortingColumns = () => this.state.sortingColumns || {};

    const sortableTransform = sort.sort({
      getSortingColumns,
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumn({
            sortingColumns: this.state.sortingColumns,
            sortingOrder: Table.defaultSortingOrder,
            selectedColumn
          })
        });
      },
      // Use property or index dependening on the sortingColumns structure specified
      strategy: sort.strategies.byProperty
    });

    const sortingFormatter = sort.header({
      sortableTransform,
      getSortingColumns,
      strategy: sort.strategies.byProperty
    });

    return [
      {
        property: 'preMigration',
        header: {
          label: __('Pre-Migration Service'),
          props: {
            index: 0,
            rowSpan: 1,
            colSpan: 1,
            id: 'pre_migration_select_all',
            playbook: { preMigration: this.props.preMigrationPlaybook }
          },
          customFormatters: [vmSelectionHeaderCellFormatter]
        },
        cell: {
          props: {
            index: 0
          },
          formatters: [
            (value, { rowData, rowIndex }) =>
              vmSelectionCellFormatter(
                { rowData, rowIndex },
                this.onSelectRow,
                `pre_migration_select_${rowIndex}`,
                sprintf(__('Pre Migration Select %s'), rowIndex),
                { preMigration: this.props.preMigrationPlaybook }
              )
          ]
        }
      },
      {
        property: 'postMigration',
        header: {
          label: __('Post-Migration Service'),
          props: {
            index: 1,
            rowSpan: 1,
            colSpan: 1,
            id: 'post_migration_select_all',
            playbook: { postMigration: this.props.postMigrationPlaybook }
          },
          customFormatters: [vmSelectionHeaderCellFormatter]
        },
        cell: {
          props: {
            index: 1
          },
          formatters: [
            (value, { rowData, rowIndex }) =>
              vmSelectionCellFormatter(
                { rowData, rowIndex },
                this.onSelectRow,
                `post_migration_select_${rowIndex}`,
                sprintf(__('Post Migration Select %s'), rowIndex),
                { postMigration: this.props.postMigrationPlaybook }
              )
          ]
        }
      },
      {
        property: 'name',
        header: {
          label: __('VM Name'),
          props: {
            index: 2,
            rowSpan: 1,
            colSpan: 1
          },
          transforms: [sortableTransform],
          formatters: [sortingFormatter],
          customFormatters: [Table.sortableHeaderCellFormatter]
        },
        cell: {
          props: {
            index: 2
          },
          formatters: [Table.tableCellFormatter]
        }
      },
      {
        property: 'cluster',
        header: {
          label: __('Source Cluster'),
          props: {
            index: 3,
            rowSpan: 1,
            colSpan: 1
          },
          transforms: [sortableTransform],
          formatters: [sortingFormatter],
          customFormatters: [Table.sortableHeaderCellFormatter]
        },
        cell: {
          props: {
            index: 3
          },
          formatters: [Table.tableCellFormatter]
        }
      }
    ];
  };

  filteredSearchedRows = () => {
    const { activeFilters, searchFilterValue } = this.state;
    const { rows } = this.props;
    if (activeFilters && activeFilters.length) {
      return rowFilter(activeFilters, rows);
    } else if (searchFilterValue) {
      return searchFilter(searchFilterValue, rows);
    }
    return rows;
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

  filterAdded = (field, value) => {
    const filterText = `${field.title}: ${value}`;
    const activeFilters = [...this.state.activeFilters, { label: filterText, field, value }];

    this.setState({ activeFilters });
  };

  selectFilterType = filterType => {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });
    }
  };

  totalPages = () => {
    const { rows } = this.props;
    const { perPage } = this.state.pagination;
    return Math.ceil(rows.length / perPage);
  };

  currentRows = filteredRows => {
    const { sortingColumns, pagination } = this.state;

    return compose(
      paginate(pagination),
      sort.sorter({
        columns: this.getColumns(),
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
      })
    )(filteredRows);
  };

  render() {
    const {
      pagination,
      sortingColumns,
      pageChangeValue,
      activeFilters,
      filterTypes,
      currentFilterType,
      currentValue
    } = this.state;

    const {
      rows,
      meta: { pristine, error },
      preMigration,
      postMigration
    } = this.props;

    const filteredRows = this.filteredSearchedRows();
    const sortedPaginatedRows = this.currentRows(filteredRows);

    const tableFooter = (
      <tfoot className="table-view-pf-footer">
        <tr>
          <td className="table-view-pf-footer-count">
            {sprintf(__('%s of %s selected'), preMigration.length, rows.length)}
          </td>
          <td className="table-view-pf-footer-count">
            {sprintf(__('%s of %s selected'), postMigration.length, rows.length)}
          </td>
          <td className="table-view-pf-footer-empty" />
          <td className="table-view-pf-footer-empty" />
        </tr>
      </tfoot>
    );

    return (
      <Grid fluid>
        <h4>{__('Select VMs on which to run the playbook services')}</h4>
        <Toolbar className="playbook-services-toolbar">
          <Filter>
            <Filter.TypeSelector
              filterTypes={filterTypes}
              currentFilterType={currentFilterType}
              onFilterTypeSelected={this.selectFilterType}
            />
            <FormControl
              type={currentFilterType.filterType}
              value={currentValue}
              placeholder={currentFilterType.placeholder}
              onChange={e => this.updateCurrentValue(e)}
              onKeyPress={e => this.onValueKeyPress(e)}
            />
          </Filter>
          <Toolbar.RightContent>
            <CustomToolbarFind
              placeholder={__('Find By Keyword...')}
              onChange={this.onFindAction}
              onEnter={this.onFindAction}
              onExit={this.onFindExit}
            />
          </Toolbar.RightContent>
          {activeFilters &&
            activeFilters.length > 0 && (
              <Toolbar.Results>
                <h5>
                  {filteredRows.length} {filteredRows.length === 1 ? __('Result') : __('Results')}
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
            )}
        </Toolbar>
        <Table.PfProvider
          striped
          bordered
          hover
          dataTable
          columns={this.getColumns()}
          components={{
            header: {
              cell: cellProps =>
                this.customHeaderFormatters({
                  cellProps,
                  columns: this.getColumns(),
                  sortingColumns,
                  rows: sortedPaginatedRows.rows,
                  onSelectAllRows: this.onSelectAllRows
                })
            }
          }}
        >
          <Table.Header headerRows={resolve.headerRows({ columns: this.getColumns() })} />
          <Table.Body rows={sortedPaginatedRows.rows || []} rowKey="id" />
          {tableFooter}
        </Table.PfProvider>
        <PaginationRow
          viewType={PAGINATION_VIEW.TABLE}
          pagination={pagination}
          pageInputValue={pageChangeValue}
          amountOfPages={sortedPaginatedRows.amountOfPages}
          itemCount={sortedPaginatedRows.itemCount}
          itemsStart={sortedPaginatedRows.itemsStart}
          itemsEnd={sortedPaginatedRows.itemsEnd}
          onPerPageSelect={this.onPerPageSelect}
          onFirstPage={this.onFirstPage}
          onPreviousPage={this.onPreviousPage}
          onPageInput={this.onPageInput}
          onNextPage={this.onNextPage}
          onLastPage={this.onLastPage}
          onSubmit={this.onSubmit}
        />
        <br />
        {pristine && error}
      </Grid>
    );
  }
}

PlanWizardAdvancedOptionsStepTable.propTypes = {
  rows: PropTypes.array,
  input: PropTypes.shape({
    value: PropTypes.shape({
      preMigration: PropTypes.arrayOf(PropTypes.string),
      postMigration: PropTypes.arrayOf(PropTypes.string)
    }),
    onChange: PropTypes.func
  }),
  meta: PropTypes.shape({
    pristine: PropTypes.bool,
    error: PropTypes.string
  }),
  preMigrationPlaybook: PropTypes.string,
  postMigrationPlaybook: PropTypes.string,
  setVmsAction: PropTypes.func,
  preMigration: PropTypes.array,
  postMigration: PropTypes.array
};

PlanWizardAdvancedOptionsStepTable.defaultProps = {
  rows: [],
  preMigration: [],
  postMigration: []
};

export default PlanWizardAdvancedOptionsStepTable;
