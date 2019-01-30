import { connect } from 'react-redux';
import ConversionHostWizardLocationStep from './ConversionHostWizardLocationStep';

import { stepIDs } from '../ConversionHostWizardConstants';

const mapStateToProps = ({ form }) => ({
  foo: console.log('Form?', form) || 'bar',
  locationStepForm: form[stepIDs.locationStep]
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  {},
  mergeProps
)(ConversionHostWizardLocationStep);
