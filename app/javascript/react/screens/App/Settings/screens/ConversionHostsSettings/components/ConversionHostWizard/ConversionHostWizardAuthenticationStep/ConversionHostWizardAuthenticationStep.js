import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import TextFileInput from '../../../../../../common/forms/TextFileInput';
import { stepIDs } from '../ConversionHostWizardConstants';
import { FormField } from '../../../../../../common/forms/FormField';
import { RHV, OPENSTACK } from '../../../../../../../../../common/constants';

// TODO OSP-specific user field
// TODO transformation method field
// TODO second SSH key for SSH transformation method
// TODO vddk path for that thing?
// TODO double check validation
// TODO double check clearing the form on provider changes?

const ConversionHostWizardAuthenticationStep = ({ selectedProviderType }) => {
  let sshKeyInfo = '';
  if (selectedProviderType === RHV) {
    sshKeyInfo = __('RHV-M deploys a common SSH public key on all hosts when configuring them. This allows commands and playbooks to be run from RHV-M. The associated private key is in the file /etc/pki/ovirt-engine/keys/engine_id_rsa on RHV-M.'); // prettier-ignore
  }
  if (selectedProviderType === OPENSTACK) {
    sshKeyInfo = __('This is the private key file used to connect to the conversion host instance for cloud_user.');
  }
  return (
    <Form className="form-horizontal">
      <Field
        name="sshKey"
        component={FormField}
        label={__('Conversion Host SSH key')}
        required
        info={sshKeyInfo}
        labelWidth={4}
        controlWidth={7}
        controlId="host-ssh-key-input"
        validate={[value => required()(value.body)]}
      >
        {({ input: { value, onChange } }) => (
          <TextFileInput
            help={__('Upload your SSH key file or paste its contents below.')}
            value={value}
            onChange={onChange}
          />
        )}
      </Field>
    </Form>
  );
};

export default reduxForm({
  form: stepIDs.authenticationStep,
  destroyOnUnmount: false,
  initialValues: {
    sshKey: { filename: '', body: '' }
  }
})(ConversionHostWizardAuthenticationStep);
