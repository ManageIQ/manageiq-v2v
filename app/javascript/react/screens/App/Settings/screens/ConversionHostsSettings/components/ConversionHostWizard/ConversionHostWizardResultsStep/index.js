import { connect } from 'react-redux';
import ConversionHostWizardResultsStep from './ConversionHostWizardResultsStep';

import { stepIDs } from '../ConversionHostWizardConstants';
import { getConfigureConversionHostPostBody } from './helpers';

const mapStateToProps = ({ form }) => {
  const locationStepValues = form[stepIDs.locationStep] && form[stepIDs.locationStep].values;
  const hostsStepValues = form[stepIDs.hostsStep] && form[stepIDs.hostsStep].values;
  const authStepValues = form[stepIDs.authenticationStep] && form[stepIDs.authenticationStep].values;
  const postBody = getConfigureConversionHostPostBody(locationStepValues, hostsStepValues, authStepValues);
  return { postBody };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  {},
  mergeProps
)(ConversionHostWizardResultsStep);
