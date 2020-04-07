import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const ConversionHostRemoveButton = ({
  hostOrTask,
  setHostToDeleteAction,
  showConversionHostDeleteModalAction,
  ...props
}) => (
  <Button
    id={`remove_${hostOrTask.id}`}
    onClick={e => {
      e.stopPropagation();
      setHostToDeleteAction(hostOrTask);
      showConversionHostDeleteModalAction();
    }}
    {...props}
  >
    {__('Remove')}
  </Button>
);

ConversionHostRemoveButton.propTypes = {
  hostOrTask: PropTypes.object,
  setHostToDeleteAction: PropTypes.func,
  showConversionHostDeleteModalAction: PropTypes.func
};

export default ConversionHostRemoveButton;
