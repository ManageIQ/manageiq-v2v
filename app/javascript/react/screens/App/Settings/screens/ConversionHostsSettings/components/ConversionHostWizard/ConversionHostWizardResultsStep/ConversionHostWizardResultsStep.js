import React from 'react';
import PropTypes from 'prop-types';
import WizardLoadingState from '../../../../../../common/WizardLoadingState';
import WizardErrorState from '../../../../../../common/WizardErrorState';

class ConversionHostWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postBodies, postConversionHostsAction, postConversionHostsUrl } = this.props;
    postConversionHostsAction(postConversionHostsUrl, postBodies);
  }

  render() {
    const { isPostingConversionHosts, isRejectedPostingConversionHosts, postConversionHostsResults } = this.props;

    if (isPostingConversionHosts) {
      return <WizardLoadingState title={__('Starting Conversion Host Configuration...')} />;
    }

    if (isRejectedPostingConversionHosts) {
      return (
        <WizardErrorState
          title={__('Error Starting Conversion Host Configuration')}
          message={__('The conversion host cannot be configured. Check your settings and try again.')}
        />
      );
    }

    if (postConversionHostsResults) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="modal-wizard-results-grey-icon">
            <span className="fa fa-clock-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">{__('Conversion host configuration is in progress.')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__('This may take a few minutes. Progress of the configuration will be shown on the Conversion Hosts page.') /* prettier-ignore */}
          </p>
        </div>
      );
    }

    return null;
  }
}

ConversionHostWizardResultsStep.propTypes = {
  postBodies: PropTypes.arrayOf(PropTypes.object),
  postConversionHostsAction: PropTypes.func,
  postConversionHostsUrl: PropTypes.string,
  isPostingConversionHosts: PropTypes.bool,
  isRejectedPostingConversionHosts: PropTypes.bool,
  postConversionHostsResults: PropTypes.arrayOf(PropTypes.object)
};

ConversionHostWizardResultsStep.defaultProps = {
  postConversionHostsUrl: '/api/conversion_hosts'
};

export default ConversionHostWizardResultsStep;
