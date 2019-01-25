import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const ConversionHostsEmptyState = ({ showConversionHostWizard }) => (
  <React.Fragment>
    <h2>TODO: render an EmptyState here</h2>;
    <Button onClick={showConversionHostWizard}>{__('Configure Conversion Host')}</Button>
  </React.Fragment>
);

ConversionHostsEmptyState.propTypes = {
  showConversionHostWizard: PropTypes.func
};

export default ConversionHostsEmptyState;
