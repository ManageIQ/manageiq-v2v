import React from 'react';
import { ListView } from 'patternfly-react';
import ListViewTableRow from './ListViewTableRow';

const ListViewTable = ({ children, className, ...props }) => (
  <ListView className={`${className} list-view-table-pf`} {...props}>
    <table>
      <tbody>{children}</tbody>
    </table>
  </ListView>
);

ListViewTable.propTypes = {
  ...ListView.propTypes
};

ListViewTable.Row = ListViewTableRow;

export default ListViewTable;
