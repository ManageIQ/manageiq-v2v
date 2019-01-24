import React from 'react';
import { Spinner } from 'patternfly-react';
import { shallow } from 'enzyme';
import { GeneralSettings } from '../GeneralSettings';
import { servers, settings } from '../../../settings.fixures';
import { getFormValuesFromApiSettings } from '../../../helpers';

describe('GeneralSettings component', () => {
  const defaultFormValues = getFormValuesFromApiSettings(settings);
  const getBaseProps = () => ({
    fetchServersAction: jest.fn(),
    fetchSettingsAction: jest.fn(),
    patchSettingsAction: jest.fn(),
    savedSettings: defaultFormValues,
    settingsForm: { values: defaultFormValues },
    servers: servers.resources
  });

  it('renders the general settings page', () => {
    const component = shallow(<GeneralSettings {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders the general settings page with Applying spinner when saving', () => {
    const component = shallow(<GeneralSettings {...getBaseProps()} isSavingSettings />);
    const applying = component.find(Spinner).findWhere(child => child.text() === ' Applying...');
    expect(applying).toHaveLength(1);
  });

  it('properly calls patchSettingsAction on apply click', () => {
    const patchSettingsAction = jest.fn();
    const component = shallow(<GeneralSettings {...getBaseProps()} patchSettingsAction={patchSettingsAction} />);
    component.find('Button').simulate('click');
    expect(patchSettingsAction).toBeCalledWith(servers.resources, defaultFormValues);
  });
});
