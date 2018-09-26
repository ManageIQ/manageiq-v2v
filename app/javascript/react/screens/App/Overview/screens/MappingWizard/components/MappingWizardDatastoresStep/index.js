import { connect } from 'react-redux';

import MappingWizardDatastoresStep from './MappingWizardDatastoresStep';
import * as MappingWizardDatastoresStepActions from './MappingWizardDatastoresStepActions';
import { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

import reducer from './MappingWizardDatastoresStepReducer';

export const reducers = { mappingWizardDatastoresStep: reducer };

const mapStateToProps = (
  {
    mappingWizardDatastoresStep,
    mappingWizardGeneralStep: { editingMapping },
    form: {
      mappingWizardClustersStep: { values: clustersStepForm },
      mappingWizardGeneralStep: { values: generalStepForm },
      mappingWizardDatastoresStep: mappingWizardDatastoresStepForm
    }
  },
  ownProps
) => ({
  ...mappingWizardDatastoresStep,
  ...ownProps.data,
  editingMapping,
  mappingWizardDatastoresStepForm,
  clusterMappings: clustersStepForm.clusterMappings,
  targetProvider: generalStepForm.targetProvider,
  initialValues: {
    datastoresMappings: []
  }
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
