import { connect } from 'react-redux';
import MappingWizardNetworksStep from './MappingWizardNetworksStep';
import * as MappingWizardNetworksStepActions from './MappingWizardNetworksStepActions';
import { showAlertAction } from '../../MappingWizardActions';
import { groupByUidEms } from './MappingWizardNetworksStepSelectors';

import reducer from './MappingWizardNetworksStepReducer';

export const reducers = { mappingWizardNetworksStep: reducer };

const mapStateToProps = ({ mappingWizardNetworksStep, form }, ownProps) => ({
  ...mappingWizardNetworksStep,
  ...ownProps.data,
  clusterMappings: form.mappingWizardClustersStep.values.clusterMappings,
  groupedSourceNetworks: groupByUidEms(mappingWizardNetworksStep.sourceNetworks),
  groupedTargetNetworks: groupByUidEms(mappingWizardNetworksStep.targetNetworks)
});

const actions = {
  ...MappingWizardNetworksStepActions,
  showAlertAction
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, actions, mergeProps)(MappingWizardNetworksStep);
