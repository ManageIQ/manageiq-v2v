import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'patternfly-react';
import WizardLoadingState from '../../../../../../common/WizardLoadingState';

class ConversionHostWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postBodies, postConversionHostsAction, postConversionHostsUrl } = this.props;
    postConversionHostsAction(postConversionHostsUrl, postBodies);
  }

  // TODO use WizardLoadingState

  render() {
    const { isPostingConversionHosts, isRejectedPostingConversionHosts, postConversionHostsResults } = this.props;

    if (isPostingConversionHosts) {
      return <WizardLoadingState title={__('Starting Conversion Host Configuration...')} />;
    }

    return (
      <Form className="form-horizontal">
        <h2>TODO: Results Step Contents</h2>
        <ul>
          <li>Posting? {isPostingConversionHosts}</li>
          <li>Rejected? {isRejectedPostingConversionHosts}</li>
          <li>Results: {JSON.stringify(postConversionHostsResults, 4)}</li>
        </ul>
      </Form>
    );
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
