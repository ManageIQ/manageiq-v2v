import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Spinner, InputGroup, FormControl, Icon, Button } from 'patternfly-react';

const DualPaneMapperList = ({
  children,
  listTitle,
  searchAriaLabel,
  searchText,
  onSearchChange,
  loading,
  id,
  counter
}) => {
  const classes = cx('dual-pane-mapper-items-container', {
    'has-counter': counter,
    loading
  });

  return (
    <div className="dual-pane-mapper-list-container">
      <label htmlFor="availableTitle">
        <span id="listTitle">{listTitle}</span>
      </label>
      <InputGroup style={{ marginBottom: 8 }}>
        <FormControl
          type="text"
          aria-label={searchAriaLabel}
          value={searchText}
          placeholder="Search..."
          onChange={event => onSearchChange(event.target.value)}
        />
        <InputGroup.Button>
          <Button onClick={() => onSearchChange('')} disabled={searchText === ''}>
            <Icon type="pf" name="close" />
          </Button>
        </InputGroup.Button>
      </InputGroup>
      <div className="dual-pane-mapper-list">
        <div className={classes} id={id}>
          {loading ? <Spinner loading /> : children}
        </div>
      </div>
      {counter && counter}
    </div>
  );
};

DualPaneMapperList.propTypes = {
  children: PropTypes.node,
  listTitle: PropTypes.string,
  searchAriaLabel: PropTypes.string,
  searchText: PropTypes.string,
  onSearchChange: PropTypes.func,
  id: PropTypes.string,
  loading: PropTypes.bool,
  counter: PropTypes.node
};

export default DualPaneMapperList;
