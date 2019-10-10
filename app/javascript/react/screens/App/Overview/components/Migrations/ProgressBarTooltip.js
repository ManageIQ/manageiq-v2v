import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'patternfly-react';

const ProgressBarTooltip = ({ id, max, now, showRemaining }) => {
  if (max > 0) {
    return (
      <Tooltip id={id}>
        {showRemaining
          ? sprintf(__('%s%% Remaining'), Math.round(((max - now) / max) * 100))
          : sprintf(__('%s%% Complete'), Math.round((now / max) * 100))}
      </Tooltip>
    );
  }
  return <Tooltip id={id}>{__('No Data')}</Tooltip>;
};

ProgressBarTooltip.propTypes = {
  id: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
  showRemaining: PropTypes.bool
};

ProgressBarTooltip.defaultProps = {
  showRemaining: false
};

export default ProgressBarTooltip;
