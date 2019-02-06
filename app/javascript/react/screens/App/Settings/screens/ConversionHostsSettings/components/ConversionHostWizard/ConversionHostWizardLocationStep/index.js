import { connect } from 'react-redux';
import ConversionHostWizardLocationStep from './ConversionHostWizardLocationStep';

import { fetchTargetClustersAction } from '../../../../../../../../../redux/common/targetResources/targetResourcesActions';

import { stepIDs } from '../ConversionHostWizardConstants';

const mapStateToProps = ({
  form,
  providers: { providers },
  targetResources: { isFetchingTargetClusters, targetClusters }
}) => {
  const locationStepForm = form[stepIDs.locationStep];
  const locationStepValues = locationStepForm && locationStepForm.values;
  return {
    selectedProviderType: locationStepValues && locationStepValues.providerType,
    selectedProviderId: locationStepValues && locationStepValues.provider,
    providers,
    isFetchingTargetClusters,
    targetClusters
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  { fetchTargetClustersAction },
  mergeProps
)(ConversionHostWizardLocationStep);
