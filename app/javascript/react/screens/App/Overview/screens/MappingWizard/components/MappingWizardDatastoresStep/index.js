import { connect } from 'react-redux';
import MappingWizardDatastoresStep from './MappingWizardDatastoresStep';
import * as MappingWizardDatastoresStepActions from './MappingWizardDatastoresStepActions';
import { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

import reducer from './MappingWizardDatastoresStepReducer';

export const reducers = { mappingWizardDatastoresStep: reducer };

const mapStateToProps = ({ mappingWizardDatastoresStep, form }, ownProps) => ({
  ...mappingWizardDatastoresStep,
  ...ownProps.data,
  clusterMappings: form.mappingWizardClustersStep.values.clusterMappings,
  targetProvider: form.mappingWizardGeneralStep.values.targetProvider
});

const actions = {
  ...MappingWizardDatastoresStepActions,
  showAlertAction,
  hideAlertAction
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  actions,
  mergeProps
)(MappingWizardDatastoresStep);
