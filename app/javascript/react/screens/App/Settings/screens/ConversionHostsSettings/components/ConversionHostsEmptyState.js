import React from 'react';
import PropTypes from 'prop-types';
import ShowWizardEmptyState from '../../../../common/ShowWizardEmptyState/ShowWizardEmptyState';

const ConversionHostsEmptyState = ({ showConversionHostWizard }) => (
  <React.Fragment>
    <ShowWizardEmptyState
      description={
        __('Select one or more hosts to be configured as IMS conversion hosts.') // prettier-ignore
      }
      showWizardAction={showConversionHostWizard}
      buttonText={__('Configure Conversion Host')}
      buttonHref=""
      className="mappings"
    />
  </React.Fragment>
);

ConversionHostsEmptyState.propTypes = {
  showConversionHostWizard: PropTypes.func
};

export default ConversionHostsEmptyState;
