import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer, change } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardAuthenticationStep from '../ConversionHostWizardAuthenticationStep';
import ConversionHostWizardAuthenticationStepContainer from '../index';
import { OPENSTACK } from '../../../../../../../../../../common/constants';
import { stepIDs } from '../../ConversionHostWizardConstants';

describe('ConversionHostWizardAuthenticationStep integration test', () => {
  const mountComponentWithNewStore = () => {
    const store = generateStore(
      { form: formReducer },
      { form: { conversionHostWizardLocationStep: { values: { providerType: OPENSTACK } } } }
    );
    const wrapper = mount(
      <Provider store={store}>
        <ConversionHostWizardAuthenticationStepContainer />
      </Provider>
    );
    return { wrapper, store };
  };

  it('should mount ConversionHostWizardAuthenticationStep with mapStateToProps reduced', () => {
    const { wrapper } = mountComponentWithNewStore();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ConversionHostWizardAuthenticationStep);
    expect(component.props()).toMatchSnapshot();
  });

  it('fails validation when there are empty required fields', () => {
    const { store } = mountComponentWithNewStore();
    expect(store.getState().form[stepIDs.authenticationStep].syncErrors).toBeTruthy();
  });

  // This test case is related to the bug fixed in https://github.com/ManageIQ/manageiq-v2v/pull/961
  it('passes validation when required fields are unmounted while empty', () => {
    const { store } = mountComponentWithNewStore();
    const form = () => store.getState().form[stepIDs.authenticationStep];
    const changeFormValue = (key, val) => store.dispatch(change(stepIDs.authenticationStep, key, val));

    // Form starts with two empty required fields mounted. (with VDDK default selected)
    expect(Object.keys(form().syncErrors)).toEqual(['conversionHostSshKey', 'vddkLibraryPath']);

    // Filling in conversionHostSshKey and switching to SSH transformation mounts another empty required field (vmwareSshKey).
    changeFormValue('conversionHostSshKey', { filename: '', body: 'foo' });
    changeFormValue('transformationMethod', 'SSH');
    expect(Object.keys(form().syncErrors)).toEqual(['vmwareSshKey']); // The vddkLibraryPath that was unmounted is still empty+required, but has no error.

    // Filling in vmwareSshKey makes the form pass validation.
    changeFormValue('vmwareSshKey', { filename: '', body: 'foo' });
    expect(form().syncErrors).toBeFalsy();

    // Changing the transformation method mounts an empty required field (vddkLibraryPath).
    changeFormValue('transformationMethod', 'VDDK');
    expect(Object.keys(form().syncErrors)).toEqual(['vddkLibraryPath']);

    // Changing the transformation method back unmounts vddkLibraryPath while it's empty
    // and remounts vmwareSshKey with its value from earlier, making the form pass validation.
    changeFormValue('transformationMethod', 'SSH');
    expect(form().syncErrors).toBeFalsy(); // <-------

    // Turning on TLS Certificates mounts an empty required field (caCerts)
    changeFormValue('verifyCaCerts', true);
    expect(Object.keys(form().syncErrors)).toEqual(['caCerts']);

    // Turning it off unmounts caCerts while it's empty.
    changeFormValue('verifyCaCerts', false);
    expect(form().syncErrors).toBeFalsy(); // <-------
  });
});
