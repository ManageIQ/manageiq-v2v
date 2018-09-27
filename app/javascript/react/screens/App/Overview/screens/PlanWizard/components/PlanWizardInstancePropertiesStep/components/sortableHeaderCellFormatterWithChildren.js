// This is a copy of Table.sortableHeaderCellFormatter from patternfly-react.
// The only enhancement is that it supports a header.children prop which will render after the label.

import React from 'react';
import PropTypes from 'prop-types';
import { TableHeading, noop } from 'patternfly-react';

const sortableHeaderCellFormatterWithChildren = ({ cellProps, column, sortingColumns, onSort }) => {
  const sortDirection = sortingColumns[column.property] && sortingColumns[column.property].direction;
  return (
    <TableHeading
      onClick={e => {
        onSort(e, column, sortDirection);
      }}
      sort
      sortDirection={sortDirection}
      aria-label={column.header.label}
      {...cellProps}
    >
      {column.header.label}
      {column.header.children || null}
    </TableHeading>
  );
};
sortableHeaderCellFormatterWithChildren.propTypes = {
  /** column header cell props */
  cellProps: PropTypes.object,
  /** column definition */
  column: PropTypes.object,
  /** sorting object definition */
  sortingColumns: PropTypes.object,
  /** onSort callback */
  onSort: PropTypes.func
};
sortableHeaderCellFormatterWithChildren.defaultProps = {
  cellProps: {},
  column: {},
  sortingColumns: {},
  onSort: noop
};

export default sortableHeaderCellFormatterWithChildren;
