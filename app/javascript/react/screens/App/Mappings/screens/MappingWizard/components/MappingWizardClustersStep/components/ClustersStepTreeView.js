import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button, TreeView, Spinner } from 'patternfly-react';

const ClustersStepTreeView = ({ mappings, selectMapping, removeMapping, removeAll, selectedMapping, loading }) => (
  <div className="treeview-container">
    <div className={cx('treeview-container--body', { loading })}>
      <Spinner loading={loading}>
        {mappings.length > 0 ? (
          <TreeView nodes={mappings} selectNode={selectMapping} highlightOnSelect highlightOnHover />
        ) : (
          <div className="treeview__is-empty">
            <h3>{__('No mappings have been added yet')}</h3>
          </div>
        )}
      </Spinner>
    </div>
    <div className="treeview-container--buttons">
      <Button disabled={mappings.length === 0 || !selectedMapping} onClick={removeMapping}>
        {__('Remove Mapping')}
      </Button>{' '}
      <Button disabled={mappings.length === 0} onClick={removeAll}>
        {__('Remove All')}
      </Button>
    </div>
  </div>
);

ClustersStepTreeView.propTypes = {
  mappings: PropTypes.array,
  selectMapping: PropTypes.func,
  removeMapping: PropTypes.func,
  removeAll: PropTypes.func,
  selectedMapping: PropTypes.object,
  loading: PropTypes.bool
};

export default ClustersStepTreeView;
