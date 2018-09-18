import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';
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

    // pagination default states
    pagination: {
      page: 1,
      perPage: 5,
      perPageOptions: [5, 10, 15]
    },

    // page input value
    pageChangeValue: 1
  };

  componentWillUnmount() {
    const { input, rows } = this.props;
    const minimalInstancePropertiesRows = [];

    rows.forEach(row => {
      const { id, osp_security_group, osp_flavor } = row;
      minimalInstancePropertiesRows.push({
        vm_id: id,
        osp_security_group_id: osp_security_group.id,
        osp_flavor_id: osp_flavor.id
      });
    });

    input.onChange({ rows: minimalInstancePropertiesRows, updatedInstancePropertiesRowOnStandby: {} });
  }

  // enables our custom header formatters extensions to reactabular
  customHeaderFormatters = Table.customHeaderFormattersDefinition;
  inlineEditController = () => {
    const { rows, instancePropertiesRowsAction, input } = this.props;
    return {
      isEditing: ({ rowData }) => rowData.id === input.value.updatedInstancePropertiesRowOnStandby.id,
      onActivate: ({ rowData }) => {
        this.setState({ editing: true });
        input.onChange({ updatedInstancePropertiesRowOnStandby: rowData });
      },
      onConfirm: ({ rowData }) => {
        this.setState({ editing: false });

        const updatedRows = rows.map(
          row => (row.id === rowData.id ? input.value.updatedInstancePropertiesRowOnStandby : row)
        );
        instancePropertiesRowsAction(updatedRows);
        input.onChange({ updatedInstancePropertiesRowOnStandby: {} });
      },
      onCancel: ({ rowData }) => {
        this.setState({ editing: false });
        input.onChange({ updatedInstancePropertiesRowOnStandby: {} });
      },
      onChange: (e, { rowData, property }) => {
        const updatedInstanceProp = {
          ...rowData[property],
          name: e.target.options[e.target.selectedIndex].text,
          id: e.target.value
        };

        const updatedRowdata = {
          ...input.value.updatedInstancePropertiesRowOnStandby,
          [property]: updatedInstanceProp
        };

        input.onChange({ updatedInstancePropertiesRowOnStandby: updatedRowdata });
      }
    };
  };

  inlineEditFormatter = Table.inlineEditFormatterFactory({
    isEditing: additionalData => this.inlineEditController().isEditing(additionalData),
    renderValue: (value, additionalData) => (
      <td className="editable">
        <span className="static">
          {additionalData.property === 'osp_security_group'
            ? additionalData.rowData.osp_security_group.name
            : additionalData.rowData.osp_flavor.name}
        </span>
      </td>
    ),
    renderEdit: (value, additionalData) => {
      const { tenantsWithAttributesById, destinationTenantIdsBySourceClusterId, input } = this.props;
      const { optionsAttribute } = additionalData.column.cell.inlineEditSelect;
      const clusterId = additionalData.rowData.ems_cluster_id;
      const tenantId = destinationTenantIdsBySourceClusterId[clusterId];
      const tenant = tenantId && tenantsWithAttributesById[tenantId];
      const allFitForVM = () => {
        const { bestFitFlavors } = this.props;
        const flavorsSlugPrefix = 'flavors/';
        const allFitIds = bestFitFlavors
          .find(flavor => flavor.source_href_slug === `vms/${additionalData.rowData.id}`)
          .all_fit.map(flavorSlug => flavorSlug.slice(flavorsSlugPrefix.length));
        return tenant.flavors.filter(flavor => allFitIds.indexOf(flavor.id) > -1);
      };
      const options = tenant ? (optionsAttribute === 'flavors' ? allFitForVM() : tenant[optionsAttribute]) : [];
      return (
        <td className="editable editing">
          <FormControl
            componentClass="select"
            defaultValue={
              additionalData.property === 'osp_security_group'
                ? input.value.updatedInstancePropertiesRowOnStandby.osp_security_group.id
                : input.value.updatedInstancePropertiesRowOnStandby.osp_flavor.id
            }
            onChange={e => this.inlineEditController().onChange(e, additionalData)}
          >
            {options.map(opt => (
              <option value={opt.id} name={opt.name} key={opt.id}>
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
          label: __('Target Provider'),
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
  destinationTenantIdsBySourceClusterId: PropTypes.object,
  instancePropertiesRowsAction: PropTypes.func,
  input: PropTypes.object,
  bestFitFlavors: PropTypes.array
};
PlanWizardInstancePropertiesStepTable.defaultProps = {
  rows: [],
  tenantsWithAttributesById: {},
  destinationTenantIdsBySourceClusterId: {}
};
export default PlanWizardInstancePropertiesStepTable;
