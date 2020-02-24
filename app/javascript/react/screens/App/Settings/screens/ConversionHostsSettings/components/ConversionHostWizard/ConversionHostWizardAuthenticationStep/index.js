import { connect } from 'react-redux';
import BaseConversionHostWizardAuthenticationStep from './ConversionHostWizardAuthenticationStep';

import { stepIDs } from '../ConversionHostWizardConstants';

const mapStateToProps = ({ form }) => {
  const locationStepForm = form[stepIDs.locationStep];
  const locationStepValues = locationStepForm && locationStepForm.values;
  const authStepForm = form[stepIDs.authenticationStep];
  const authStepValues = authStepForm && authStepForm.values;
  return {
    selectedProviderType: locationStepValues && locationStepValues.providerType,
    selectedTransformationMethod: authStepValues && authStepValues.transformationMethod,
    verifyCaCerts: authStepValues && authStepValues.verifyCaCerts
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

const ConversionHostWizardAuthenticationStep = connect(
  mapStateToProps,
  {},
  mergeProps
)(BaseConversionHostWizardAuthenticationStep);

ConversionHostWizardAuthenticationStep.displayName = 'ConversionHostWizardAuthenticationStep';

export default ConversionHostWizardAuthenticationStep;
