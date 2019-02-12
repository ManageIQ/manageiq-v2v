import { connect } from 'react-redux';
import ConversionHostWizardHostsStep from './ConversionHostWizardHostsStep';

import { stepIDs } from '../ConversionHostWizardConstants';

const mapStateToProps = ({ form, targetResources: { targetClusters } }) => {
  const locationStepForm = form[stepIDs.locationStep];
  const locationStepValues = locationStepForm && locationStepForm.values;
  const selectedClusterId = locationStepValues && locationStepValues.cluster;
  return {
    selectedProviderType: locationStepValues && locationStepValues.providerType,
    selectedCluster: targetClusters.find(cluster => cluster.id === selectedClusterId)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  {},
  mergeProps
)(ConversionHostWizardHostsStep);
