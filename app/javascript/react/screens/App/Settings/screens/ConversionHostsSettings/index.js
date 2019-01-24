import { connect } from 'react-redux';
import ConversionHostsSettings from './ConversionHostsSettings';

import * as SettingsActions from '../../SettingsActions';

const mapStateToProps = ({ settings }, ownProps) => ({
  ...settings,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  SettingsActions,
  mergeProps
)(ConversionHostsSettings);
