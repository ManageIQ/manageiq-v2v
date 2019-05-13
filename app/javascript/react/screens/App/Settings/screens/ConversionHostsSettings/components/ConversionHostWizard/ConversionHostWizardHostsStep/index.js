import { connect } from 'react-redux';
import BaseConversionHostWizardHostsStep from './ConversionHostWizardHostsStep';

import { stepIDs } from '../ConversionHostWizardConstants';

const mapStateToProps = ({
  form,
  targetResources: { targetClusters },
  settings: { conversionHosts, conversionHostTasksByResource }
}) => {
  const locationStepForm = form[stepIDs.locationStep];
  const locationStepValues = locationStepForm && locationStepForm.values;
  const selectedClusterId = locationStepValues && locationStepValues.cluster;
  return {
    selectedProviderType: locationStepValues && locationStepValues.providerType,
    selectedCluster: targetClusters.find(cluster => cluster.id === selectedClusterId),
    conversionHosts,
    conversionHostTasksByResource
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

const ConversionHostWizardHostsStep = connect(
  mapStateToProps,
  {},
  mergeProps
)(BaseConversionHostWizardHostsStep);

ConversionHostWizardHostsStep.displayName = 'ConversionHostWizardHostsStep';

export default ConversionHostWizardHostsStep;
