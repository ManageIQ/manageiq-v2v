import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';
import cloneDeep from 'lodash.clonedeep';
import findIndex from 'lodash.findindex';
import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import { paginate, Grid, PaginationRow, Table, PAGINATION_VIEW, Icon, Button, FormControl } from 'patternfly-react';
import { OSP_DEFAULT_SECURITY_GROUP, OSP_DEFAULT_FLAVOR } from '../PlanWizardInstancePropertiesStepConstants';

// Temporary import while https://github.com/patternfly/patternfly-react/issues/535 is open:
import TableInlineEditRow from './TableInlineEditRow/TableInlineEditRow';

class PlanWizardInstancePropertiesStepTable extends React.Component {
  constructor(props) {
    super(props);

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

    const inlineEditController = {
      isEditing: ({ rowData }) => rowData.backup !== undefined,
      onActivate: ({ rowData }) => {
        const rows = cloneDeep(this.state.rows);
        const index = findIndex(rows, { id: rowData.id });

        rows[index].backup = cloneDeep(rows[index]);

        this.setState({ rows, editing: true });
      },
      onConfirm: ({ rowData }) => {
        const rows = cloneDeep(this.state.rows);
        const index = findIndex(rows, { id: rowData.id });

        delete rows[index].backup;

        this.setState({ rows, editing: false });
      },
      onCancel: ({ rowData }) => {
        const rows = cloneDeep(this.state.rows);
        const index = findIndex(rows, { id: rowData.id });

        rows[index] = cloneDeep(rows[index].backup);
        delete rows[index].backup;

        this.setState({ rows, editing: false });
      },
      onChange: (value, { rowData, property }) => {
        const rows = cloneDeep(this.state.rows);
        const index = findIndex(rows, { id: rowData.id });

        rows[index][property] = value;

        this.setState({ rows });
      }
    };
    this.inlineEditController = inlineEditController;

    const inlineEditFormatter = Table.inlineEditFormatterFactory({
      isEditing: additionalData => inlineEditController.isEditing(additionalData),
      renderValue: (value, additionalData) => (
        <td className="editable">
          <span className="static">{value}</span>
        </td>
      ),
      renderEdit: (value, additionalData) => {
        const { options, defaultValue } = additionalData.column.cell.inlineEditSelect;
        return (
          <td className="editable editing">
            <FormControl
              componentClass="select"
              defaultValue={value || defaultValue}
              onBlur={e => inlineEditController.onChange(e.target.value, additionalData)}
            >
              {options.map(opt => (
                <option value={opt.name} key={opt.id}>
                  {opt.name}
                </option>
              ))}
            </FormControl>
          </td>
        );
      }
    });

    const inlineEditButtonsFormatter = Table.inlineEditFormatterFactory({
      isEditing: additionalData => this.state.editing,
      renderValue: (value, additionalData) => (
        <td style={{ padding: '2px' }}>
          <Button bsStyle="default" onClick={() => inlineEditController.onActivate(additionalData)}>
            <Icon type="pf" name="edit" />
          </Button>
        </td>
      ),
      renderEdit: (value, additionalData) => (
        <td style={{ padding: '2px' }}>
          <Button bsStyle="default" disabled>
            <Icon type="pf" name="edit" />
          </Button>
        </td>
      )
    });

    this.state = {
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
          property: 'name',
          header: {
            label: __('VM Name'),
            props: {
              index: 0,
              rowSpan: 1,
              colSpan: 1
            },
            transforms: [sortableTransform],
            formatters: [sortingFormatter],
            customFormatters: [Table.sortableHeaderCellFormatter]
          },
          cell: {
            props: {
              index: 0
            },
            formatters: [Table.tableCellFormatter]
          }
        },
        {
          property: 'cluster',
          header: {
            label: __('Source Cluster'),
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
          property: 'allocated_size',
          header: {
            label: __('Allocated Size'),
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
          property: 'osp_security_group',
          header: {
            label: __('OpenStack Security Group'),
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
            formatters: [inlineEditFormatter],
            inlineEditSelect: {
              // Custom property for inlineEditFormatter
              options: props.securityGroups,
              defaultValue: OSP_DEFAULT_SECURITY_GROUP
            }
          }
        },
        {
          property: 'osp_flavor',
          header: {
            label: __('OpenStack Flavor'),
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
            formatters: [inlineEditFormatter],
            inlineEditSelect: {
              // Custom property for inlineEditFormatter
              options: props.flavors,
              defaultValue: OSP_DEFAULT_FLAVOR
            }
          }
        },
        {
          property: 'actions',
          header: {
            label: '',
            props: {
              index: 5
            },
            formatters: [Table.actionHeaderCellFormatter]
          },
          cell: {
            props: {
              index: 5
            },
            formatters: [inlineEditButtonsFormatter]
          }
        }
      ],

      // rows state
      rows: this.props.rows.map(row => ({
        ...row,
        osp_security_group: OSP_DEFAULT_SECURITY_GROUP,
        osp_flavor: OSP_DEFAULT_FLAVOR
      })),

      editing: false,

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

  currentRows = () => {
    const { sortingColumns, columns, pagination, rows } = this.state;

    return compose(
      paginate(pagination),
      sort.sorter({
        columns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
      })
    )(rows);
  };

  totalPages = () => {
    const { rows } = this.state;
    const { perPage } = this.state.pagination;
    return Math.ceil(rows.length / perPage);
  };

  render() {
    const { columns, pagination, sortingColumns, pageChangeValue } = this.state;

    const sortedPaginatedRows = this.currentRows();

    return (
      <Grid fluid>
        <h2>{__('VMs Selected for Migration')}</h2>
        <br />
        <Table.PfProvider
          striped
          bordered
          hover
          dataTable
          inlineEdit
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
            },
            body: {
              // TODO we should use Table.InlineEditRow when patternfly-react#535 is fixed
              row: TableInlineEditRow
            }
          }}
        >
          <Table.Header headerRows={resolve.headerRows({ columns })} />
          <Table.Body
            rows={sortedPaginatedRows.rows || []}
            rowKey="id"
            onRow={(rowData, { rowIndex }) => ({
              role: 'row',
              isEditing: () => this.inlineEditController.isEditing({ rowData }),
              onCancel: () => this.inlineEditController.onCancel({ rowData, rowIndex }),
              onConfirm: () => this.inlineEditController.onConfirm({ rowData, rowIndex }),
              last: rowIndex === sortedPaginatedRows.length - 1
            })}
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
PlanWizardInstancePropertiesStepTable.propTypes = {
  rows: PropTypes.array,
  securityGroups: PropTypes.arrayOf(PropTypes.object),
  flavors: PropTypes.arrayOf(PropTypes.object)
};
PlanWizardInstancePropertiesStepTable.defaultProps = {
  rows: [],
  securityGroups: [],
  flavors: []
};
export default PlanWizardInstancePropertiesStepTable;
