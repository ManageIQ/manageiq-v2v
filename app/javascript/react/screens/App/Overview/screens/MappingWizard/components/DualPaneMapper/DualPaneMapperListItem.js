import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import { OverlayTrigger, Popover, Icon } from 'patternfly-react';

const DualPaneMapperListItem = ({ item, text, warningMessage, selected, handleClick, handleKeyPress }) => {
  const classes = cx('dual-pane-mapper-item', { selected });

  const warningOverlay = warningMessage && (
    <OverlayTrigger
      overlay={
        <Popover id={`warning_for_${text}`}>
          <div style={{ maxWidth: 400 }}>{warningMessage}</div>
        </Popover>
      }
      placement="top"
      trigger={['click']}
      delay={500}
      rootClose
      onClick={event => event.stopPropagation()}
    >
      <Icon type="pf" name="warning-triangle-o" className="clickable-icon" />
    </OverlayTrigger>
  );

  return (
    <div
      className={classes}
      onClick={() => handleClick(item)}
      onKeyPress={() => handleKeyPress(item)}
      tabIndex="0"
      aria-selected={selected}
      role="option"
    >
      <EllipsisWithTooltip id={text}>
        <div className="dual-pane-mapper-info">
          <span className="dual-pane-mapper-item-container">
            {text}
            {warningOverlay}
          </span>
          <span className="dual-pane-mapper-item-select-indicator fa fa-check" />
        </div>
      </EllipsisWithTooltip>
    </div>
  );
};

DualPaneMapperListItem.propTypes = {
  item: PropTypes.object,
  text: PropTypes.string,
  warningMessage: PropTypes.string,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  handleKeyPress: PropTypes.func
};

export default DualPaneMapperListItem;
