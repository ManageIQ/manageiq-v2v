import { connect } from 'react-redux';
import ConversionHostWizardResultsStep from './ConversionHostWizardResultsStep';

import { stepIDs } from '../ConversionHostWizardConstants';
import { getConfigureConversionHostPostBody } from './helpers';
import { postConversionHostsAction } from '../../../../../SettingsActions';

const mapStateToProps = ({
  form,
  settings: { isPostingConversionHosts, isRejectedPostingConversionHosts, postConversionHostsResult }
}) => {
  const locationStepValues = form[stepIDs.locationStep] && form[stepIDs.locationStep].values;
  const hostsStepValues = form[stepIDs.hostsStep] && form[stepIDs.hostsStep].values;
  const authStepValues = form[stepIDs.authenticationStep] && form[stepIDs.authenticationStep].values;
  const postBody = getConfigureConversionHostPostBody(locationStepValues, hostsStepValues, authStepValues);
  return {
    postBody,
    isPostingConversionHosts,
    isRejectedPostingConversionHosts,
    postConversionHostsResult
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  { postConversionHostsAction },
  mergeProps
)(ConversionHostWizardResultsStep);
