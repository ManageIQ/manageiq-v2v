import {
  V2V_NOTIFICATION_ADD,
  V2V_NOTIFICATION_REMOVE
} from './NotificationConstants';

export const addNotificationAction = notification => dispatch => {
  dispatch({
    type: V2V_NOTIFICATION_ADD,
    header: notification.header,
    message: notification.message,
    notificationType: notification.notificationType,
    data: notification.data,
    persistent: notification.persistent,
    timerdelay: notification.timerdelay,
    actionEnabled: notification.actionEnabled
  });
};

export const removeNotificationAction = key => dispatch => {
  dispatch({
    type: V2V_NOTIFICATION_REMOVE,
    key
  });
};
