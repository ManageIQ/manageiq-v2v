import { connect } from 'react-redux';

import MappingWizardClustersStep from './MappingWizardClustersStep';
import * as MappingWizardClustersStepActions from './MappingWizardClustersStepActions';
import { createClusterMappings } from './components/ClustersStepForm/helpers';
import { getTransformationMappingItemsBySourceType } from '../../helpers';
import { TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES } from '../../MappingWizardConstants';

import reducer from './MappingWizardClustersStepReducer';

export const reducers = { mappingWizardClustersStep: reducer };

const mapStateToProps = (
  { mappingWizardClustersStep, mappingWizardGeneralStep: { editingMapping }, form },
  ownProps
) => ({
  ...mappingWizardClustersStep,
  ...ownProps.data,
  targetProvider: form.mappingWizardGeneralStep.values.targetProvider,
  initialValues: {
    clusterMappings: editingMapping
      ? createClusterMappings(
          getTransformationMappingItemsBySourceType(TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES.cluster, editingMapping),
          mappingWizardClustersStep.targetClusters,
          mappingWizardClustersStep.sourceClusters
        )
      : []
  },
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  MappingWizardClustersStepActions,
  mergeProps
)(MappingWizardClustersStep);
