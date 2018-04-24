import { connect } from 'react-redux';
import NotificationList from './NotificationList';
import * as NotificationListActions from './NotificationListActions';
import reducer from './NotificationListReducer';

export const reducers = { notifications: reducer };

const mapStateToProps = ({ notifications }, ownProps) => ({
  ...notifications,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, NotificationListActions, mergeProps)(
  NotificationList
);
