import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import { stepIDs, VDDK, SSH } from '../ConversionHostWizardConstants';
import { FormField } from '../../../../../../common/forms/FormField';
import { OPENSTACK } from '../../../../../../../../../common/constants';
import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import SshKeyField from '../../../../../../common/forms/SshKeyField';
import { getConversionHostSshKeyInfoMessage } from '../../../../../helpers';

const requiredWithMessage = required({ msg: __('This field is required') });

const ConversionHostWizardAuthenticationStep = ({ selectedProviderType, selectedTransformationMethod }) => {
  const fieldBaseProps = { labelWidth: 4, controlWidth: 7 };

  return (
    <Form className="form-horizontal">
      {selectedProviderType === OPENSTACK && (
        <Field
          {...fieldBaseProps}
          name="openstackUser"
          label={__('OpenStack User')}
          component={FormField}
          type="text"
          controlId="openstack-user-input"
          required
          validate={[requiredWithMessage]}
        />
      )}
      <SshKeyField
        {...fieldBaseProps}
        name="conversionHostSshKey"
        label={__('Conversion Host SSH private key')}
        controlId="host-ssh-key-input"
        info={getConversionHostSshKeyInfoMessage(selectedProviderType)}
      />
      <Field
        {...fieldBaseProps}
        name="transformationMethod"
        label={__('Transformation method')}
        component={BootstrapSelect}
        options={[{ id: SSH, name: __('SSH') }, { id: VDDK, name: __('VDDK') }]}
        option_key="id"
        option_value="name"
        inline_label
        required
        validate={[requiredWithMessage]}
        style={{ marginTop: 25 }}
      />
      {selectedTransformationMethod === SSH && (
        <SshKeyField
          {...fieldBaseProps}
          name="vmwareSshKey"
          label={__('VMware hypervisors SSH private key')}
          controlId="vmware-ssh-key-input"
        />
      )}
      {selectedTransformationMethod === VDDK && (
        <Field
          {...fieldBaseProps}
          name="vddkLibraryPath"
          label={__('VDDK library path')}
          component={FormField}
          controlId="vddk-library-path"
          required
          validate={[requiredWithMessage]}
        >
          {({ input }) => (
            <Form.FormControl {...input} type="text" />
            /*
            // TODO replace the above FormControl with this InputGroup
            // when API support for the Validate button is ready.
            <Form.InputGroup>
              <Form.FormControl {...input} type="text" />
              <Form.InputGroup.Button>
                <Button onClick={() => {}}>{__('Validate')}</Button>
              </Form.InputGroup.Button>
            </Form.InputGroup>
            */
          )}
        </Field>
      )}
    </Form>
  );
};

ConversionHostWizardAuthenticationStep.propTypes = {
  selectedProviderType: PropTypes.string,
  selectedTransformationMethod: PropTypes.string,
  unregisterFieldAction: PropTypes.func
};

export default reduxForm({
  form: stepIDs.authenticationStep,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    openstackUser: 'cloud-user',
    conversionHostSshKey: { filename: '', body: '' },
    vmwareSshKey: { filename: '', body: '' }
  }
})(ConversionHostWizardAuthenticationStep);
