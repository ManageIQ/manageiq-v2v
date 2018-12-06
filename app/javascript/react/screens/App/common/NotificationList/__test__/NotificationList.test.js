import React from 'react';
import { mount } from 'enzyme';
import NotificationList from '../NotificationList';
import NotificationListReducer from '../NotificationListReducer';

describe('NotificationList Component', () => {
  test('correctly empty renders', () => {
    const wrapper = mount(<NotificationList />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('NotificationsListReducer initial state', () => {
  it('should return the initial state', () => {
    const initialState = {
      notifications: []
    };

    expect(NotificationListReducer(undefined, {})).toEqual(initialState);
  });
});
