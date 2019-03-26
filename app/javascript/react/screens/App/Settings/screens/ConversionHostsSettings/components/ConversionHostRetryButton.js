import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const ConversionHostRetryButton = ({
  task,
  setConversionHostTaskToRetryAction,
  showConversionHostRetryModalAction,
  ...props
}) => (
  <React.Fragment>
    <Button
      id={`retry_${task.id}`}
      onClick={e => {
        e.stopPropagation();
        setConversionHostTaskToRetryAction(task);
        showConversionHostRetryModalAction();
      }}
      {...props}
    >
      {__('Retry')}
    </Button>
  </React.Fragment>
);

ConversionHostRetryButton.propTypes = {
  task: PropTypes.object,
  setConversionHostTaskToRetryAction: PropTypes.func,
  showConversionHostRetryModalAction: PropTypes.func
};

export default ConversionHostRetryButton;
