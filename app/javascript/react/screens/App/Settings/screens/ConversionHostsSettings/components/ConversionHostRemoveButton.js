import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const ConversionHostRemoveButton = ({ host, setHostToDeleteAction, showConversionHostDeleteModalAction, ...props }) => (
  <React.Fragment>
    <Button
      id={`remove_${host.id}`}
      onClick={e => {
        e.stopPropagation();
        setHostToDeleteAction(host);
        showConversionHostDeleteModalAction();
      }}
      {...props}
    >
      {__('Remove')}
    </Button>
  </React.Fragment>
);

ConversionHostRemoveButton.propTypes = {
  host: PropTypes.object,
  setHostToDeleteAction: PropTypes.func,
  showConversionHostDeleteModalAction: PropTypes.func
};

export default ConversionHostRemoveButton;
