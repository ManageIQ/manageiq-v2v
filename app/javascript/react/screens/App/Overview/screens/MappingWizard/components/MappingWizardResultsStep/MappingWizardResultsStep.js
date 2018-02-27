import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, Spinner } from 'patternfly-react';

class MappingWizardResultsStep extends React.Component {
  componentDidMount() {
    const {
      postMappingsUrl,
      postTransformMappingsAction,
      transformationsBody
    } = this.props;

    postTransformMappingsAction(postMappingsUrl, transformationsBody);
  }

  render() {
    const {
      isPostingMappings,
      isRejectedPostingMappings,
      transformationMappingsResult,
      errorPostingMappings, // eslint-disable-line no-unused-vars
      transformationsBody,
      continueToPlanAction
    } = this.props;

    if (isPostingMappings) {
      return (
        <div className="wizard-pf-process blank-slate-pf">
          <Spinner loading size="lg" className="blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">
            Creating Infrastructure Mapping...
          </h3>
          <p className="blank-slate-pf-secondary-action">
            Please wait while infrastructure mapping is created.
          </p>
        </div>
      );
    } else if (isRejectedPostingMappings) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            Error Creating Infrastructure Mapping
          </h3>
          <p className="blank-slate-pf-secondary-action">
            We&apos;re sorry, something went wrong. Please try again.
          </p>
          <button type="button" className="btn btn-lg btn-primary">
            Retry
          </button>
        </div>
      );
    } else if (transformationMappingsResult) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="glyphicon glyphicon-ok-circle" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            All mappings in {transformationsBody.name} have been mapped.
          </h3>
          <p className="blank-slate-pf-secondary-action">
            <Button
              bsStyle="link"
              onClick={() =>
                continueToPlanAction(transformationMappingsResult.id)
              }
            >
              Continue to the plan wizard
            </Button>
            to create a migration plan using the infrastructure mapping.
          </p>
        </div>
      );
    }
    return null;
  }
}
MappingWizardResultsStep.propTypes = {
  postMappingsUrl: PropTypes.string,
  postTransformMappingsAction: PropTypes.func,
  continueToPlanAction: PropTypes.func,
  transformationsBody: PropTypes.object,
  isPostingMappings: PropTypes.bool,
  isRejectedPostingMappings: PropTypes.bool,
  errorPostingMappings: PropTypes.object,
  transformationMappingsResult: PropTypes.object
};
MappingWizardResultsStep.defaultProps = {
  postMappingsUrl: '',
  postTransformMappingsAction: noop,
  continueToPlanAction: noop,
  transformationsBody: {},
  isPostingMappings: true,
  isRejectedPostingMappings: false,
  errorPostingMappings: null,
  transformationMappingsResult: null
};
export default MappingWizardResultsStep;
