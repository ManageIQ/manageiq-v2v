import React from 'react';
import PropTypes from 'prop-types';
import { noop, Table } from 'patternfly-react';

const vmSelectionCellFormatter = ({ rowData, rowIndex }, onSelectRow, id, label, playbook) => {
  const checkboxId = id || `select${rowIndex}`;
  const checkboxLabel = label || sprintf(__('Select row %s'), rowIndex.toString());
  const scheduleType = label.match('Pre') ? 'preMigration' : 'postMigration';

  return (
    <Table.SelectionCell>
      <div className="table-view-pf-select-content">
        <Table.Checkbox
          id={checkboxId}
          label={checkboxLabel}
          checked={rowData[scheduleType]}
          onChange={e => {
            onSelectRow(e, rowData, scheduleType);
          }}
          disabled={!playbook[scheduleType]}
        />
      </div>
    </Table.SelectionCell>
  );
};
vmSelectionCellFormatter.propTypes = {
  /** rowData for this row */
  rowData: PropTypes.object,
  /** rowIndex for this row */
  rowIndex: PropTypes.number.isRequired,
  /** row selected callback */
  onSelectRow: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  /** checkbox id override */
  id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  /** checkbox label override */
  label: PropTypes.string // eslint-disable-line react/no-unused-prop-types
};
vmSelectionCellFormatter.defaultProps = {
  rowData: {},
  onSelectRow: noop,
  id: '',
  label: ''
};
export default vmSelectionCellFormatter;
