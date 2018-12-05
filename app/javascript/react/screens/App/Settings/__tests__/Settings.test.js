import React from 'react';
import { Spinner } from 'patternfly-react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Settings } from '../Settings';
import { servers, settings } from '../settings.fixures';
import { getFormValuesFromApiSettings } from '../helpers';

describe('Settings component', () => {
  const defaultFormValues = getFormValuesFromApiSettings(settings);
  const baseProps = {
    fetchServersAction: jest.fn(),
    fetchSettingsAction: jest.fn(),
    patchSettingsAction: jest.fn(),
    savedSettings: defaultFormValues,
    settingsForm: { values: defaultFormValues },
    servers: servers.resources
  };

  it('renders the settings page', () => {
    const component = shallow(<Settings {...baseProps} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders the settings page with Applying spinner when saving', () => {
    const component = shallow(<Settings {...baseProps} isSavingSettings />);
    const applying = component.find(Spinner).findWhere(child => child.text() === ' Applying...');
    expect(applying).toHaveLength(1);
  });

  it('properly calls patchSettingsAction on apply click', () => {
    const patchSettingsAction = jest.fn();
    const component = shallow(<Settings {...baseProps} patchSettingsAction={patchSettingsAction} />);
    component.instance().onApplyClick();
    expect(patchSettingsAction).toBeCalledWith(servers.resources, defaultFormValues);
  });
});
