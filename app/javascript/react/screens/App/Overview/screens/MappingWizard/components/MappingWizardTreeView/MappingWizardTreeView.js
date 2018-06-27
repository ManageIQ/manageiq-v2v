import React from 'react';
import PropTypes from 'prop-types';

import { Button, TreeView } from 'patternfly-react';

const MappingWizardTreeView = ({ mappings, selectNode, removeNode, removeAll, selectedNode }) => (
  <div className="treeview-container">
    <div className="treeview-container--body">
      {mappings.length > 0 ? (
        <TreeView nodes={mappings} selectNode={selectNode} highlightOnSelect highlightOnHover />
      ) : (
        <div className="treeview__is-empty">
          <h3>{__('No mappings have been added yet')}</h3>
          <p>{__('Select source cluster(s) and a target cluster and click Add Mapping to add the mapping.')}</p>
          <p>{__('Multiple mappings can be added')}</p>
        </div>
      )}
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
  selectedNode: PropTypes.object
};

export default MappingWizardTreeView;
