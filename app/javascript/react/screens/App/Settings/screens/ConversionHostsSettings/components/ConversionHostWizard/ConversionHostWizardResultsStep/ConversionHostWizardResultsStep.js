import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'patternfly-react';

class ConversionHostWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postBody, postConversionHostsAction, postConversionHostsUrl } = this.props;
    postConversionHostsAction(postConversionHostsUrl, postBody);
  }

  render() {
    const { isPostingConversionHosts, isRejectedPostingConversionHosts, postConversionHostsResult } = this.props;
    return (
      <Form className="form-horizontal">
        <h2>TODO: Results Step Contents</h2>
        <ul>
          <li>Posting? {isPostingConversionHosts}</li>
          <li>Rejected? {isRejectedPostingConversionHosts}</li>
          <li>Result: {JSON.stringify(postConversionHostsResult, 4)}</li>
        </ul>
      </Form>
    );
  }
}

ConversionHostWizardResultsStep.propTypes = {
  postBody: PropTypes.object,
  postConversionHostsAction: PropTypes.func,
  postConversionHostsUrl: PropTypes.string,
  isPostingConversionHosts: PropTypes.bool,
  isRejectedPostingConversionHosts: PropTypes.bool,
  postConversionHostsResult: PropTypes.object
};

ConversionHostWizardResultsStep.defaultProps = {
  postConversionHostsUrl: '/api/conversion_hosts'
};

export default ConversionHostWizardResultsStep;
