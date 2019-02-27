import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'patternfly-react';

class ConversionHostWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postBodies, postConversionHostsAction, postConversionHostsUrl } = this.props;
    postConversionHostsAction(postConversionHostsUrl, postBodies);
  }

  render() {
    const { isPostingConversionHosts, isRejectedPostingConversionHosts, postConversionHostsResults } = this.props;
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
