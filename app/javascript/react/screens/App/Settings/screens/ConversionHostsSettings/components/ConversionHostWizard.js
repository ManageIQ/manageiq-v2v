import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const ConversionHostWizard = ({ hideConversionHostWizard }) => (
  <React.Fragment>
    <h2>TODO: render a wizard here</h2>
    <Button onClick={hideConversionHostWizard}>Close</Button>
  </React.Fragment>
);

ConversionHostWizard.propTypes = {
  hideConversionHostWizard: PropTypes.func
};

export default ConversionHostWizard;
