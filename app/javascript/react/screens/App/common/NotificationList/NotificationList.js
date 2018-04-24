import React from 'react';
import PropTypes from 'prop-types';
import {
  TimedToastNotification,
  ToastNotificationList
} from 'patternfly-react';
import { Link } from 'react-router-dom';

class NotificationList extends React.Component {
  render() {
    const { notifications, removeNotificationAction } = this.props;

    return (
      <ToastNotificationList>
        {notifications &&
          notifications.map((notification, index) => (
            <TimedToastNotification
              key={index}
              type={notification.notificationType}
              persistent={notification.persistent}
              timerdelay={notification.timerdelay}
              onDismiss={() => removeNotificationAction({ notification })}
              onMouseLeave={() => removeNotificationAction({ notification })}
            >
              <span>
                {notification.header && <strong>{notification.header}</strong>}
                {notification.message}
              </span>
              {notification.actionEnabled && (
                <div className="pull-right toast-pf-action">
                  <Link to={`/migration/plan/${notification.data.id}`}>
                    {__('View Details')}
                  </Link>
                </div>
              )}
            </TimedToastNotification>
          ))}
      </ToastNotificationList>
    );
  }
}

NotificationList.propTypes = {
  removeNotificationAction: PropTypes.func,
  notifications: PropTypes.array
};

NotificationList.defaultProps = {
  notifications: []
};

export default NotificationList;
