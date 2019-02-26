import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'patternfly-react';

class ConversionHostWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postBody } = this.props;
    console.log('TODO: submit POST /api/conversion_hosts', postBody); // TODO move stuff to conversion hosts common reducer?
  }

  render() {
    return (
      <Form className="form-horizontal">
        <h2>TODO: Results Step Contents</h2>
      </Form>
    );
  }
}

ConversionHostWizardResultsStep.propTypes = {
  postBody: PropTypes.object
};

export default ConversionHostWizardResultsStep;
