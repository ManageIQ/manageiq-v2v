import { connect } from 'react-redux';
import GeneralSettings from './GeneralSettings';

import * as SettingsActions from '../../SettingsActions';
import * as RouterActions from '../../../../../../redux/actions/routerActions';

const mapStateToProps = ({ settings, form }, ownProps) => ({
  ...settings,
  ...ownProps.data,
  settingsForm: form.settings,
  initialValues: settings.savedSettings,
  enableReinitialize: true,
  destroyOnUnmount: false
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(SettingsActions, RouterActions),
  mergeProps
)(GeneralSettings);
