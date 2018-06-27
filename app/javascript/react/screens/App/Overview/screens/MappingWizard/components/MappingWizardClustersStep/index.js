import { connect } from 'react-redux';
import MappingWizardClustersStep from './MappingWizardClustersStep';
import * as MappingWizardClustersStepActions from './MappingWizardClustersStepActions';

import reducer from './MappingWizardClustersStepReducer';

export const reducers = { mappingWizardClustersStep: reducer };

const mapStateToProps = ({ mappingWizardClustersStep }, ownProps) => ({
  ...mappingWizardClustersStep,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, MappingWizardClustersStepActions, mergeProps)(MappingWizardClustersStep);
