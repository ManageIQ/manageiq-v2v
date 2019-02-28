import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button } from 'patternfly-react';

import { transformationHasBeenEdited } from './helpers';
import { FETCH_TRANSFORMATION_MAPPINGS_URL } from '../../../../../Mappings/MappingsConstants';
import WizardLoadingState from '../../../../../common/WizardLoadingState';
import WizardErrorState from '../../../../../common/WizardErrorState';

class MappingWizardResultsStep extends React.Component {
  componentDidMount() {
    const {
      postMappingsUrl,
      postTransformMappingsAction,
      transformationsBody,
      editingMapping,
      updateTransformationMappingAction,
      targetProvider,
      fetchTransformationMappingsAction,
      fetchTransformationMappingsUrl
    } = this.props;

    if (editingMapping) {
      if (transformationHasBeenEdited(editingMapping, transformationsBody, targetProvider)) {
        updateTransformationMappingAction(postMappingsUrl, editingMapping.id, transformationsBody).then(() => {
          fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
        });
      }
    } else {
      postTransformMappingsAction(postMappingsUrl, transformationsBody).then(() => {
        fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
      });
    }
  }

  onContinueToPlanWizard = id => {
    this.props.continueToPlanAction(id);
    this.props.redirectTo('/plans');
  };

  render() {
    const {
      isPostingMappings,
      isRejectedPostingMappings,
      isUpdatingMapping,
      transformationMappingsResult,
      errorPostingMappings, // eslint-disable-line no-unused-vars
      transformationsBody
    } = this.props;

    if (isPostingMappings) {
      return (
        <WizardLoadingState
          title={__('Creating Infrastructure Mapping...')}
          message={__('Please wait while the infrastructure mapping is created.')}
        />
      );
    } else if (isRejectedPostingMappings) {
      return (
        <WizardErrorState
          title={__('Error Creating Infrastructure Mapping')}
          message={__("We're sorry, something went wrong. Please try again.")}
        />
      );
    } else if (isUpdatingMapping) {
      return (
        <WizardLoadingState
          title={__('Saving Infrastructure Mapping...')}
          message={__('Please wait while the infrastructure mapping is saved.')}
        />
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
            <Button bsStyle="link" onClick={() => this.onContinueToPlanWizard(transformationMappingsResult.id)}>
              {__('Continue to the plan wizard to create a migration plan using the infrastructure mapping.')}
            </Button>
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
  continueToPlanAction: PropTypes.func,
  editingMapping: PropTypes.object,
  updateTransformationMappingAction: PropTypes.func,
  isUpdatingMapping: PropTypes.bool,
  targetProvider: PropTypes.string,
  fetchTransformationMappingsAction: PropTypes.func,
  fetchTransformationMappingsUrl: PropTypes.string,
  redirectTo: PropTypes.func
};
MappingWizardResultsStep.defaultProps = {
  postMappingsUrl: '/api/transformation_mappings',
  postTransformMappingsAction: noop,
  transformationsBody: {},
  isPostingMappings: true,
  isRejectedPostingMappings: false,
  errorPostingMappings: null,
  transformationMappingsResult: null,
  continueToPlanAction: noop,
  fetchTransformationMappingsUrl: FETCH_TRANSFORMATION_MAPPINGS_URL
};
export default MappingWizardResultsStep;
