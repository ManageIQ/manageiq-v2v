import { connect } from 'react-redux';
import MappingWizardNetworksStep from './MappingWizardNetworksStep';
import * as MappingWizardNetworksStepActions from './MappingWizardNetworksStepActions';
import { showAlertAction } from '../../MappingWizardActions';
import { uniqueNetworks } from './MappingWizardNetworksStepSelectors';

import reducer from './MappingWizardNetworksStepReducer';

export const reducers = { mappingWizardNetworksStep: reducer };

const mapStateToProps = (
  { mappingWizardNetworksStep, form, mappingWizardGeneralStep: { editingMapping } },
  ownProps
) => ({
  ...mappingWizardNetworksStep,
  ...ownProps.data,
  editingMapping,
  clusterMappings: form.mappingWizardClustersStep.values.clusterMappings,
  groupedSourceNetworks: uniqueNetworks(mappingWizardNetworksStep.sourceNetworks),
  groupedTargetNetworks: uniqueNetworks(mappingWizardNetworksStep.targetNetworks),
  targetProvider: form.mappingWizardGeneralStep.values.targetProvider,
  mappingWizardNetworksStepForm: form.mappingWizardNetworksStep,
  initialValues: {
    networksMappings: []
  }
});

const actions = {
  ...MappingWizardNetworksStepActions,
  showAlertAction
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  actions,
  mergeProps
)(MappingWizardNetworksStep);
