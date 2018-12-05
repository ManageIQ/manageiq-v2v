import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Settings from '../Settings';
import { settings } from '../settings.fixures';
import { getFormValuesFromApiSettings } from '../helpers';

describe('Settings component', () => {
  const defaultFormValues = getFormValuesFromApiSettings(settings);
  const baseProps = {
    fetchServersAction: jest.fn(),
    fetchSettingsAction: jest.fn(),
    patchSettingsAction: jest.fn(),
    savedSettings: defaultFormValues,
    settingsForm: { values: defaultFormValues }
  };

  it('renders the settings page', () => {
    const component = shallow(<Settings {...baseProps} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
