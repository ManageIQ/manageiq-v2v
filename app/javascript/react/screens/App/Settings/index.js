import { connect } from 'react-redux';
import Settings from './Settings';

import * as SettingsActions from './SettingsActions';
import * as NotificationActions from '../common/NotificationList/NotificationListActions';

import reducer from './SettingsReducer';

export const reducers = { settings: reducer, form: {} };

const mapStateToProps = ({ settings }, ownProps) => ({
  ...settings,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(SettingsActions, NotificationActions),
  mergeProps
)(Settings);
