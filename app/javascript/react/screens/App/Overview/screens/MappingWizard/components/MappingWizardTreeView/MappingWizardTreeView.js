import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button, TreeView, Spinner } from 'patternfly-react';

const MappingWizardTreeView = ({ mappings, selectNode, removeNode, removeAll, selectedNode, loading }) => (
  <div className="treeview-container">
    <div className={cx('treeview-container--body', { loading })}>
      <Spinner loading={loading}>
        {mappings.length > 0 ? (
          <TreeView nodes={mappings} selectNode={selectNode} highlightOnSelect highlightOnHover />
        ) : (
          <div className="treeview__is-empty">
            <h3>{__('No mappings have been added yet')}</h3>
          </div>
        )}
      </Spinner>
    </div>
    <div className="treeview-container--buttons">
      <Button disabled={mappings.length === 0 || !selectedNode} onClick={removeNode}>
        {__('Remove Selected')}
      </Button>{' '}
      <Button disabled={mappings.length === 0} onClick={removeAll}>
        {__('Remove All')}
      </Button>
    </div>
  </div>
);

MappingWizardTreeView.propTypes = {
  mappings: PropTypes.array,
  selectNode: PropTypes.func,
  removeNode: PropTypes.func,
  removeAll: PropTypes.func,
  selectedNode: PropTypes.object,
  loading: PropTypes.bool
};

export default MappingWizardTreeView;
