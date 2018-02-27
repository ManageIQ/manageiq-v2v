import { connect } from 'react-redux';
import MappingWizardNetworksStep from './MappingWizardNetworksStep';
import * as MappingWizardNetworksStepActions from './MappingWizardNetworksStepActions';

import reducer from './MappingWizardNetworksStepReducer';

export const reducers = { mappingWizardNetworksStep: reducer };

const mapStateToProps = ({ mappingWizardNetworksStep, form }, ownProps) => ({
  ...mappingWizardNetworksStep,
  ...ownProps.data,
  clusterMappings: form.mappingWizardClustersStep.values.clusterMappings
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  MappingWizardNetworksStepActions,
  mergeProps
)(MappingWizardNetworksStep);
