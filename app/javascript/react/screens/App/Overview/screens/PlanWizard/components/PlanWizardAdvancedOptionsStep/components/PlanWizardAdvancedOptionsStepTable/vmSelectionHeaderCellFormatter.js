import React from 'react';
import PropTypes from 'prop-types';
import { noop, Table } from 'patternfly-react';

/**
 * Extends PatternFly React selection header cell formatter
 * b/c if the CSV input has conflicting/invalid rows, we should disable select all
 */
const vmSelectionHeaderCellFormatter = ({ cellProps, column, rows, onSelectAllRows }) => {
  const id = cellProps.id || 'selectAll';
  const {
    property: scheduleType,
    header: { label }
  } = column;
  const unselectedRows = rows.filter(r => !r[scheduleType]).length > 0;
  const { playbook, ...otherCellProps } = cellProps;
  return (
    <Table.SelectionHeading className="with-label" aria-label={column.header.label} {...otherCellProps}>
      <div className="table-view-pf-select-content">
        <div>{label}</div>
        <Table.Checkbox
          id={id}
          label={label}
          checked={!unselectedRows}
          onChange={event => onSelectAllRows(event, scheduleType)}
          disabled={!playbook[scheduleType]}
        />
      </div>
    </Table.SelectionHeading>
  );
};
vmSelectionHeaderCellFormatter.propTypes = {
  /** column header cell props */
  cellProps: PropTypes.object,
  /** column definition */
  column: PropTypes.object,
  /** current table rows */
  rows: PropTypes.array,
  /** on select all rows callback */
  onSelectAllRows: PropTypes.func
};
vmSelectionHeaderCellFormatter.defaultProps = {
  cellProps: {},
  column: {},
  rows: [],
  onSelectAllRows: noop
};
export default vmSelectionHeaderCellFormatter;
