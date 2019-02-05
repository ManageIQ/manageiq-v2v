import React from 'react';
import PropTypes from 'prop-types';
import ShowWizardEmptyState from '../../../../common/ShowWizardEmptyState/ShowWizardEmptyState';

const ConversionHostsEmptyState = ({ showConversionHostWizardAction }) => (
  <React.Fragment>
    <ShowWizardEmptyState
      description={
        __('Select one or more hosts to be configured as IMS conversion hosts.') // prettier-ignore
      }
      showWizardAction={showConversionHostWizardAction}
      buttonText={__('Configure Conversion Host')}
      buttonHref=""
      className="mappings"
    />
  </React.Fragment>
);

ConversionHostsEmptyState.propTypes = {
  showConversionHostWizardAction: PropTypes.func
};

export default ConversionHostsEmptyState;
