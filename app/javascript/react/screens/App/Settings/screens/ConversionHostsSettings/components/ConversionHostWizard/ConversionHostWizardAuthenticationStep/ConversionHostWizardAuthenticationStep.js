import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import TextFileInput from '../../../../../../common/forms/TextFileInput';
import { stepIDs, VDDK, SSH } from '../ConversionHostWizardConstants';
import { FormField } from '../../../../../../common/forms/FormField';
import { RHV, OPENSTACK } from '../../../../../../../../../common/constants';
import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';

const requiredWithMessage = required({ msg: __('This field is required') });

const ConversionHostWizardAuthenticationStep = ({ selectedProviderType, selectedTransformationMethod }) => {
  let sshKeyInfo = '';
  if (selectedProviderType === RHV) {
    sshKeyInfo = __('RHV-M deploys a common SSH public key on all hosts when configuring them. This allows commands and playbooks to be run from RHV-M. The associated private key is in the file /etc/pki/ovirt-engine/keys/engine_id_rsa on RHV-M.'); // prettier-ignore
  }
  if (selectedProviderType === OPENSTACK) {
    sshKeyInfo = __('This is the private key file used to connect to the conversion host instance for the OpenStack User.'); // prettier-ignore
  }

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
      <Field
        {...fieldBaseProps}
        name="conversionHostSshKey"
        label={__('Conversion Host SSH private key')}
        component={FormField}
        info={sshKeyInfo}
        controlId="host-ssh-key-input"
        required
        validate={[value => requiredWithMessage(value.body)]}
      >
        {({ input: { value, onChange, onBlur } }) => (
          <TextFileInput
            help={__('Upload your SSH key file or paste its contents below.')}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      </Field>
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
        <Field
          {...fieldBaseProps}
          name="vmwareSshKey"
          label={__('VMware hypervisors SSH private key')}
          component={FormField}
          controlId="vmware-ssh-key-input"
          required
          validate={[value => requiredWithMessage(value.body)]}
        >
          {({ input: { value, onChange, onBlur } }) => (
            <TextFileInput
              help={__('Upload your SSH key file or paste its contents below.')}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        </Field>
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
