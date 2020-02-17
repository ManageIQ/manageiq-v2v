import React from 'react';
import { shallow } from 'enzyme';
import ScheduleMigrationModalBody from '../ScheduleMigrationModalBody';

describe('When correctly initialized', () => {
  const baseProps = {
    handleDatepickerChange: jest.fn(),
    setScheduleMode: jest.fn(),
    defaultDate: new Date('2020-01-01 10:00:00'),
    startNowLabel: 'start now label',
    startLaterLabel: 'start later label',
    showDatepicker: false
  };

  test('renders schedule modal body', () => {
    const wrapper = shallow(<ScheduleMigrationModalBody {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
