import { connect } from 'react-redux';

import MappingWizardClustersStep from './MappingWizardClustersStep';
import * as MappingWizardClustersStepActions from './MappingWizardClustersStepActions';
import * as TargetResourcesActions from '../../../../../../../../redux/common/targetResources/targetResourcesActions';
import { createClusterMappings } from './components/ClustersStepForm/helpers';
import { getTransformationMappingItemsBySourceType } from '../../helpers';
import { TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES, OPENSTACK, RHV } from '../../MappingWizardConstants';
import { conversionHostsFilter } from './MappingWizardClustersStepSelectors';

import reducer from './MappingWizardClustersStepReducer';

export const reducers = { mappingWizardClustersStep: reducer };

const mapStateToProps = (
  { mappingWizardClustersStep, mappingWizardGeneralStep: { editingMapping, conversionHosts }, form, targetResources },
  ownProps
) => ({
  ...mappingWizardClustersStep,
  ...targetResources,
  ...ownProps.data,
  targetProvider: form.mappingWizardGeneralStep.values.targetProvider,
  rhvConversionHosts: conversionHostsFilter(conversionHosts, RHV),
  ospConversionHosts: conversionHostsFilter(conversionHosts, OPENSTACK),
  initialValues: {
    clusterMappings: editingMapping
      ? createClusterMappings(
          getTransformationMappingItemsBySourceType(TRANSFORMATION_MAPPING_ITEM_SOURCE_TYPES.cluster, editingMapping),
          targetResources.targetClusters,
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
  { ...MappingWizardClustersStepActions, ...TargetResourcesActions },
  mergeProps
)(MappingWizardClustersStep);
