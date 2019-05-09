import React from 'react';
import PropTypes from 'prop-types';
import ShowWizardEmptyState from '../../../../common/ShowWizardEmptyState/ShowWizardEmptyState';

const ConversionHostsEmptyState = ({ showConversionHostWizardAction }) => (
  <ShowWizardEmptyState
    description={
      __('Select one or more hosts to be configured as IMS conversion hosts.') // prettier-ignore
    }
    showWizardAction={showConversionHostWizardAction}
    buttonText={__('Configure Conversion Host')}
    buttonHref=""
    className="white-bg"
  />
);

ConversionHostsEmptyState.propTypes = {
  showConversionHostWizardAction: PropTypes.func
};

export default ConversionHostsEmptyState;
