import React from 'react';
import PropTypes from 'prop-types';

import { Button, TreeView } from 'patternfly-react';

const DatastoresStepTreeView = ({
  mappings,
  selectMapping,
  removeMapping,
  removeAll,
  selectedMapping
}) => (
  <div className="treeview-container">
    <div className="treeview-container--body">
      {mappings.length > 0 ? (
        <TreeView
          nodes={mappings}
          selectNode={selectMapping}
          highlightOnSelect
          highlightOnHover
        />
      ) : (
        <div className="treeview__is-empty">
          <h3>{__('No mappings have been added yet')}</h3>
          <p>
            {__(
              'Select source cluster(s) and a target cluster and click Add Mapping to add the mapping.'
            )}
          </p>
          <p>{__('Multiple mappings can be added')}</p>
        </div>
      )}
    </div>
    <div className="treeview-container--buttons">
      <Button
        disabled={mappings.length === 0 || !selectedMapping}
        onClick={removeMapping}
      >
        {__('Remove Mapping')}
      </Button>{' '}
      <Button disabled={mappings.length === 0} onClick={removeAll}>
        {__('Remove All')}
      </Button>
    </div>
  </div>
);

DatastoresStepTreeView.propTypes = {
  mappings: PropTypes.array,
  selectMapping: PropTypes.func,
  removeMapping: PropTypes.func,
  removeAll: PropTypes.func,
  selectedMapping: PropTypes.object
};

export default DatastoresStepTreeView;
