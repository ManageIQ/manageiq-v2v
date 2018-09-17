import { connect } from 'react-redux';
import Settings from './Settings';

import * as SettingsActions from './SettingsActions';
import * as NotificationActions from '../common/NotificationList/NotificationListActions';

import reducer from './SettingsReducer';

export const reducers = { settings: reducer };

const mapStateToProps = ({ settings, form }, ownProps) => ({
  ...settings,
  ...ownProps.data,
  settingsForm: form.settings,
  initialValues: {
    maxMigrationsPerHost: 10
  },
  enableReinitialize: true
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(SettingsActions, NotificationActions),
  mergeProps
)(Settings);
