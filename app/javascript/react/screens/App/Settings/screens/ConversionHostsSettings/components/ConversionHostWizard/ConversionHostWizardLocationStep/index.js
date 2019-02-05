import { connect } from 'react-redux';
import ConversionHostWizardLocationStep from './ConversionHostWizardLocationStep';

import { fetchTargetClustersAction } from '../../../../../../../../../redux/common/targetResources/targetResourcesActions';

import { stepIDs } from '../ConversionHostWizardConstants';

const mapStateToProps = ({
  form,
  providers: { providers },
  targetResources: { isFetchingTargetClusters, targetClusters }
}) => ({
  locationStepForm: form[stepIDs.locationStep],
  providers,
  isFetchingTargetClusters,
  targetClusters
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  { fetchTargetClustersAction },
  mergeProps
)(ConversionHostWizardLocationStep);
