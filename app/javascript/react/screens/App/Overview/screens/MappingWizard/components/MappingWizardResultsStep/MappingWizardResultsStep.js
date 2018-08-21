import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, Spinner } from 'patternfly-react';

class MappingWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postMappingsUrl, postTransformMappingsAction, transformationsBody } = this.props;

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
          <h3 className="blank-slate-pf-main-action">{__('Creating Infrastructure Mapping...')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Please wait while infrastructure mapping is created.')}
          </p>
        </div>
      );
    } else if (isRejectedPostingMappings) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">{__('Error Creating Infrastructure Mapping')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__("We're sorry, something went wrong. Please try again.")}
          </p>
        </div>
      );
    } else if (transformationMappingsResult) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="glyphicon glyphicon-ok-circle" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            {sprintf(__('All mappings in %s have been mapped.'), transformationsBody.name)}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            <Button bsStyle="link" onClick={() => continueToPlanAction(transformationMappingsResult.id)}>
              {__('Continue to the plan wizard')}
            </Button>
            {__('to create a migration plan using the infrastructure mapping.')}
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
  transformationsBody: PropTypes.object,
  isPostingMappings: PropTypes.bool,
  isRejectedPostingMappings: PropTypes.bool,
  errorPostingMappings: PropTypes.object,
  transformationMappingsResult: PropTypes.object,
  continueToPlanAction: PropTypes.func
};
MappingWizardResultsStep.defaultProps = {
  postMappingsUrl: 'api/transformation_mappings',
  postTransformMappingsAction: noop,
  transformationsBody: {},
  isPostingMappings: true,
  isRejectedPostingMappings: false,
  errorPostingMappings: null,
  transformationMappingsResult: null,
  continueToPlanAction: noop
};
export default MappingWizardResultsStep;
