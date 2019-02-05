import { connect } from 'react-redux';
import ConversionHostsSettings from './ConversionHostsSettings';

import * as SettingsActions from '../../SettingsActions';
import * as ProvidersActions from '../../../../../../redux/common/providers/providersActions';

const mapStateToProps = ({ settings, providers }, ownProps) => ({
  ...settings,
  ...providers,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  { ...SettingsActions, ...ProvidersActions },
  mergeProps
)(ConversionHostsSettings);
