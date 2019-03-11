import { connect } from 'react-redux';
import { change } from 'redux-form';
import GeneralSettings from './GeneralSettings';

import { fetchServersAction, fetchSettingsAction, patchSettingsAction } from '../../SettingsActions';

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
  { fetchServersAction, fetchSettingsAction, patchSettingsAction, formChangeAction: change },
  mergeProps
)(GeneralSettings);
