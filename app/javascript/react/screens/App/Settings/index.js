import { connect } from 'react-redux';
import Settings from './Settings';

import * as SettingsActions from './SettingsActions';
import * as NotificationActions from '../common/NotificationList/NotificationListActions';
import * as RouterActions from '../../../../redux/actions/routerActions';

import reducer from './SettingsReducer';

export const reducers = { settings: reducer };

const mapStateToProps = ({ settings, form }, ownProps) => ({
  ...settings,
  ...ownProps.data,
  settingsForm: form.settings
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(SettingsActions, NotificationActions, RouterActions),
  mergeProps
)(Settings);
