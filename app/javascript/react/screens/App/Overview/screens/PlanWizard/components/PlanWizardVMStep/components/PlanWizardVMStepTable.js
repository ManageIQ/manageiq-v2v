import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';
import classNames from 'classnames';
import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import {
  bindMethods,
  paginate,
  Grid,
  MenuItem,
  PaginationRow,
  Table,
  Toolbar,
  FormControl,
  Filter,
  PAGINATION_VIEW
} from 'patternfly-react';

import vmSelectionHeaderCellFormatter from './vmSelectionHeaderCellFormatter';
import vmSelectionCellFormatter from './vmSelectionCellFormatter';

class PlanWizardVMStepTable extends React.Component {
  static deselectRow(row) {
    return Object.assign({}, row, { selected: false });
  }
  static selectRow(row) {
    return Object.assign({}, row, { selected: true });
  }
  constructor(props) {
    super(props);

    const { rows } = this.props;

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

    // enables our custom header formatters extensions to reactabular
    this.customHeaderFormatters = Table.customHeaderFormattersDefinition;

    bindMethods(this, [
      'removeFilter',
      'clearFilters',
      'selectFilterType',
      'updateCurrentValue',
      'customHeaderFormatters',
      'onPageInput',
      'onSubmit',
      'onPerPageSelect',
      'onFirstPage',
      'onPreviousPage',
      'onNextPage',
      'onLastPage',
      'onRow',
      'onSelectAllRows',
      'onSelectRow',
      'setPage',
      'totalPages'
    ]);

    const filterTypes = [
      {
        id: 'name',
        title: 'Name',
        placeholder: 'Filter by Name',
        filterType: 'text'
      }
    ];

    this.state = {
      // Toolbar Filter state
      filterTypes,
      currentFilterType: filterTypes[0],
      currentValue: '',
      activeFilters: [],

      // Sort the first column in an ascending way by default.
      sortingColumns: {
        name: {
          direction: Table.TABLE_SORT_DIRECTION.ASC,
          position: 0
        }
      },

      // column definitions
      columns: [
        {
          property: 'select',
          header: {
            label: __('Select'),
            props: {
              index: 0,
              rowSpan: 1,
              colSpan: 1,
              id: 'select'
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
                  `select${rowIndex}`,
                  `select ${rowIndex}`
                )
            ]
          }
        },
        {
          property: 'name',
          header: {
            label: 'VM Name',
            props: {
              index: 1,
              rowSpan: 1,
              colSpan: 1
            },
            transforms: [sortableTransform],
            formatters: [sortingFormatter],
            customFormatters: [Table.sortableHeaderCellFormatter]
          },
          cell: {
            props: {
              index: 1
            },
            formatters: [Table.tableCellFormatter]
          }
        },
        {
          property: 'cluster',
          header: {
            label: 'Source Cluster',
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
          property: 'path',
          header: {
            label: 'Path',
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
        },
        {
          property: 'allocated_size',
          header: {
            label: 'Allocated Size',
            props: {
              index: 4,
              rowSpan: 1,
              colSpan: 1
            },
            transforms: [sortableTransform],
            formatters: [sortingFormatter],
            customFormatters: [Table.sortableHeaderCellFormatter]
          },
          cell: {
            props: {
              index: 4
            },
            formatters: [Table.tableCellFormatter]
          }
        },
        {
          property: 'reason',
          header: {
            label: 'Status',
            props: {
              index: 5,
              rowSpan: 1,
              colSpan: 1
            },
            transforms: [sortableTransform],
            formatters: [sortingFormatter],
            customFormatters: [Table.sortableHeaderCellFormatter]
          },
          cell: {
            props: {
              index: 5
            },
            formatters: [Table.tableCellFormatter]
          }
        }
      ],

      // rows and row selection state
      rows,
      selectedRows: [],

      // pagination default states
      pagination: {
        page: 1,
        perPage: 6,
        perPageOptions: [6, 10, 15]
      },

      // page input value
      pageChangeValue: 1
    };
  }
  onFirstPage() {
    this.setPage(1);
  }
  onLastPage() {
    const { page } = this.state.pagination;
    const totalPages = this.totalPages();
    if (page < totalPages) {
      this.setPage(totalPages);
    }
  }
  onNextPage() {
    const { page } = this.state.pagination;
    if (page < this.totalPages()) {
      this.setPage(this.state.pagination.page + 1);
    }
  }
  onPageInput(e) {
    this.setState({ pageChangeValue: e.target.value });
  }
  onPerPageSelect(eventKey, e) {
    const newPaginationState = Object.assign({}, this.state.pagination);
    newPaginationState.perPage = eventKey;
    newPaginationState.page = 1;
    this.setState({ pagination: newPaginationState });
  }
  onPreviousPage() {
    if (this.state.pagination.page > 1) {
      this.setPage(this.state.pagination.page - 1);
    }
  }
  onRow(row, { rowIndex }) {
    const { selectedRows } = this.state;
    const selected = selectedRows.indexOf(row.id) > -1;
    return {
      className: classNames({
        selected,
        warning: row.conflict,
        danger: row.invalid
      }),
      role: 'row'
    };
  }
  onSelectAllRows(event) {
    const { rows, selectedRows } = this.state;
    const { checked } = event.target;
    const currentRows = this.currentRows().rows;

    if (checked) {
      const selectableRows = currentRows.filter(r => !r.invalid && !r.conflict);
      const updatedSelections = [
        ...new Set([...selectableRows.map(r => r.id), ...selectedRows])
      ];
      const updatedRows = rows.map(
        r =>
          updatedSelections.indexOf(r.id) > -1
            ? PlanWizardVMStepTable.selectRow(r)
            : r
      );
      this.setState({
        // important: you must update rows to force a re-render and trigger onRow hook
        rows: updatedRows,
        selectedRows: updatedSelections
      });
    } else {
      const ids = currentRows.map(r => r.id);
      const updatedSelections = selectedRows.filter(
        r => !(ids.indexOf(r) > -1)
      );
      const updatedRows = rows.map(
        r =>
          updatedSelections.indexOf(r.id) > -1
            ? r
            : PlanWizardVMStepTable.deselectRow(r)
      );
      this.setState({
        rows: updatedRows,
        selectedRows: updatedSelections
      });
    }
  }
  onSelectRow(event, row) {
    const { rows, selectedRows } = this.state;
    const selectedRowIndex = rows.findIndex(r => r.id === row.id);
    if (selectedRowIndex > -1) {
      let updatedSelectedRows;
      let updatedRow;
      if (row.selected) {
        updatedSelectedRows = selectedRows.filter(r => !(r === row.id));
        updatedRow = PlanWizardVMStepTable.deselectRow(row);
      } else {
        selectedRows.push(row.id);
        updatedSelectedRows = selectedRows;
        updatedRow = PlanWizardVMStepTable.selectRow(row);
      }
      rows[selectedRowIndex] = updatedRow;
      this.setState({
        rows,
        selectedRows: updatedSelectedRows
      });
    }
  }
  onSubmit() {
    this.setPage(this.state.pageChangeValue);
  }
  setPage(value) {
    const page = Number(value);
    if (
      !Number.isNaN(value) &&
      value !== '' &&
      page > 0 &&
      page <= this.totalPages()
    ) {
      const newPaginationState = Object.assign({}, this.state.pagination);
      newPaginationState.page = page;
      this.setState({ pagination: newPaginationState, pageChangeValue: page });
    }
  }
  currentRows() {
    const { rows, sortingColumns, columns, pagination } = this.state;
    return compose(
      paginate(pagination),
      sort.sorter({
        columns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
      })
    )(rows);
  }
  totalPages() {
    const { rows } = this.state;
    const { perPage } = this.state.pagination;
    return Math.ceil(rows.length / perPage);
  }

  selectFilterType(filterType) {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });
    }
  }

  filterAdded = (field, value) => {
    let filterText = '';
    if (field.title) {
      filterText = field.title;
    } else {
      filterText = field;
    }
    filterText += ': ';

    if (value.filterCategory) {
      filterText += `${value.filterCategory.title ||
        value.filterCategory}-${value.filterValue.title || value.filterValue}`;
    } else if (value.title) {
      filterText += value.title;
    } else {
      filterText += value;
    }

    const activeFilters = [...this.state.activeFilters, { label: filterText }];
    this.setState({ activeFilters });
  };

  onValueKeyPress(keyEvent) {
    const { currentValue, currentFilterType } = this.state;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      this.setState({ currentValue: '' });
      this.filterAdded(currentFilterType, currentValue);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  }
  updateCurrentValue(event) {
    this.setState({ currentValue: event.target.value });
  }

  removeFilter(filter) {
    const { activeFilters } = this.state;

    const index = activeFilters.indexOf(filter);
    if (index > -1) {
      const updated = [
        ...activeFilters.slice(0, index),
        ...activeFilters.slice(index + 1)
      ];
      this.setState({ activeFilters: updated });
    }
  }
  clearFilters() {
    this.setState({ activeFilters: [] });
  }

  render() {
    const {
      columns,
      pagination,
      sortingColumns,
      pageChangeValue,
      filterTypes,
      currentFilterType,
      currentValue
    } = this.state;
    const sortedPaginatedRows = this.currentRows();

    return (
      <Grid fluid>
        <Toolbar>
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
            <Toolbar.Find
              placeholder="Find By Keyword..."
              currentIndex={1}
              totalCount={3}
              onChange={this.onFindAction}
              onEnter={this.onFindAction}
              onFindNext={this.onFindAction}
              onFindPrevious={this.onFindAction}
            />
          </Toolbar.RightContent>
        </Toolbar>
        <br />
        <Table.PfProvider
          striped
          bordered
          hover
          dataTable
          columns={columns}
          components={{
            header: {
              cell: cellProps =>
                this.customHeaderFormatters({
                  cellProps,
                  columns,
                  sortingColumns,
                  rows: sortedPaginatedRows.rows,
                  onSelectAllRows: this.onSelectAllRows
                })
            }
          }}
        >
          <Table.Header headerRows={resolve.headerRows({ columns })} />
          <Table.Body
            rows={sortedPaginatedRows.rows}
            rowKey="id"
            onRow={this.onRow}
          />
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
      </Grid>
    );
  }
}
PlanWizardVMStepTable.propTypes = {
  rows: PropTypes.array.isRequired
};
export default PlanWizardVMStepTable;
