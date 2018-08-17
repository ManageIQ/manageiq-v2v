import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';
import findIndex from 'lodash.findindex';
import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import { compose } from 'recompose';
import { paginate, Grid, PaginationRow, Table, PAGINATION_VIEW, Icon, Button, FormControl } from 'patternfly-react';

// Temporary import while https://github.com/patternfly/patternfly-react/issues/535 is open:
import TableInlineEditRow from './TableInlineEditRow/TableInlineEditRow';

class PlanWizardInstancePropertiesStepTable extends React.Component {
  state = {
    // Sort the first column in an ascending way by default.
    sortingColumns: {
      name: {
        direction: Table.TABLE_SORT_DIRECTION.ASC,
        position: 0
      }
    },

    editing: false,
    backup: {},

    // pagination default states
    pagination: {
      page: 1,
      perPage: 5,
      perPageOptions: [5, 10, 15]
    },

    // page input value
    pageChangeValue: 1
  };

  // enables our custom header formatters extensions to reactabular
  customHeaderFormatters = Table.customHeaderFormattersDefinition;

  // TODO:  These methods need to be wired up to redux-form once we know what
  //        the POST body should look like for creating an OSP transformation
  //        plan.  We will use local state to store the row that is currently
  //        being edited to roll back to in case of cancel.
  inlineEditController = () => {
    const { rows } = this.props;
    return {
      isEditing: ({ rowData }) => rowData.id === this.state.backup.id,
      onActivate: ({ rowData }) => {
        const index = findIndex(rows, { id: rowData.id });
        const backup = rows[index];

        this.setState({ backup, editing: true });
      },
      onConfirm: ({ rowData }) => {
        this.setState({ backup: {}, editing: false });
      },
      onCancel: ({ rowData }) => {
        this.setState({ backup: {}, editing: false });
      },
      onChange: (value, { rowData, property }) => {}
    };
  };

  inlineEditFormatter = Table.inlineEditFormatterFactory({
    isEditing: additionalData => this.inlineEditController().isEditing(additionalData),
    renderValue: (value, additionalData) => (
      <td className="editable">
        <span className="static">{value.name}</span>
      </td>
    ),
    renderEdit: (value, additionalData) => {
      const { tenantsWithAttributesById, destinationTenantIdsBySourceClusterId } = this.props;
      const { optionsAttribute } = additionalData.column.cell.inlineEditSelect;
      const clusterId = additionalData.rowData.ems_cluster_id;
      const tenantId = destinationTenantIdsBySourceClusterId[clusterId];
      const tenant = tenantId && tenantsWithAttributesById[tenantId];
      const options = tenant ? tenant[optionsAttribute] : [];
      return (
        <td className="editable editing">
          <FormControl
            componentClass="select"
            defaultValue={value.name}
            onBlur={e => this.inlineEditController().onChange(e.target.value, additionalData)}
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

  inlineEditButtonsFormatter = Table.inlineEditFormatterFactory({
    isEditing: additionalData => this.state.editing,
    renderValue: (value, additionalData) => (
      <td style={{ padding: '2px' }}>
        <Button bsStyle="default" onClick={() => this.inlineEditController().onActivate(additionalData)}>
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
        property: 'target_cluster_name',
        header: {
          label: __('Target Cluster'),
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
        property: 'allocated_size',
        header: {
          label: __('Allocated Size'),
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
        property: 'osp_security_group',
        header: {
          label: __('OpenStack Security Group'),
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
          formatters: [this.inlineEditFormatter],
          inlineEditSelect: {
            // Custom property for inlineEditFormatter
            optionsAttribute: 'security_groups'
          }
        }
      },
      {
        property: 'osp_flavor',
        header: {
          label: __('OpenStack Flavor'),
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
          formatters: [this.inlineEditFormatter],
          inlineEditSelect: {
            // Custom property for inlineEditFormatter
            optionsAttribute: 'flavors'
          }
        }
      },
      {
        property: 'actions',
        header: {
          label: '',
          props: {
            index: 6
          },
          formatters: [Table.actionHeaderCellFormatter]
        },
        cell: {
          props: {
            index: 6
          },
          formatters: [this.inlineEditButtonsFormatter]
        }
      }
    ];
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

  currentRows = () => {
    const { sortingColumns, pagination } = this.state;
    const { rows } = this.props;

    return compose(
      paginate(pagination),
      sort.sorter({
        columns: this.getColumns(),
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
      })
    )(rows);
  };

  totalPages = () => {
    const { rows } = this.props;
    const { perPage } = this.state.pagination;
    return Math.ceil(rows.length / perPage);
  };

  render() {
    const { pagination, sortingColumns, pageChangeValue } = this.state;

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
          columns={this.getColumns()}
          components={{
            header: {
              cell: cellProps =>
                this.customHeaderFormatters({
                  cellProps,
                  columns: this.getColumns(),
                  sortingColumns,
                  rows: sortedPaginatedRows.rows
                })
            },
            body: {
              // TODO we should use Table.InlineEditRow when patternfly-react#535 is fixed
              row: TableInlineEditRow
            }
          }}
        >
          <Table.Header headerRows={resolve.headerRows({ columns: this.getColumns() })} />
          <Table.Body
            rows={sortedPaginatedRows.rows || []}
            rowKey="id"
            onRow={(rowData, { rowIndex }) => ({
              role: 'row',
              isEditing: () => this.inlineEditController().isEditing({ rowData }),
              onCancel: () => this.inlineEditController().onCancel({ rowData, rowIndex }),
              onConfirm: () => this.inlineEditController().onConfirm({ rowData, rowIndex }),
              last: rowIndex === sortedPaginatedRows.length - 1,
              tableRendersInModal: true
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
  tenantsWithAttributesById: PropTypes.object,
  destinationTenantIdsBySourceClusterId: PropTypes.object
};
PlanWizardInstancePropertiesStepTable.defaultProps = {
  rows: [],
  tenantsWithAttributesById: {},
  destinationTenantIdsBySourceClusterId: {}
};
export default PlanWizardInstancePropertiesStepTable;
