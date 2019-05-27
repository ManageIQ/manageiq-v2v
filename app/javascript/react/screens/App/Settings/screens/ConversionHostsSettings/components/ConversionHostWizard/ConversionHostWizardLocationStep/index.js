import { connect } from 'react-redux';
import { reset } from 'redux-form';
import BaseConversionHostWizardLocationStep from './ConversionHostWizardLocationStep';

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

const ConversionHostWizardLocationStep = connect(
  mapStateToProps,
  { fetchTargetClustersAction, resetFormAction: reset },
  mergeProps
)(BaseConversionHostWizardLocationStep);

ConversionHostWizardLocationStep.displayName = 'ConversionHostWizardLocationStep';

export default ConversionHostWizardLocationStep;
