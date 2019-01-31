import { connect } from 'react-redux';
import ConversionHostWizard from './ConversionHostWizard';

import * as SettingsActions from '../../../../SettingsActions';

const mapStateToProps = ({ settings: { conversionHostWizardVisible } }, ownProps) => ({
  ...ownProps.data,
  conversionHostWizardVisible
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  SettingsActions,
  mergeProps
)(ConversionHostWizard);
