import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form, Switch } from 'patternfly-react';
import { stepIDs, VDDK, SSH } from '../ConversionHostWizardConstants';
import { FormField } from '../../../../../../common/forms/FormField';
import { OPENSTACK } from '../../../../../../../../../common/constants';
import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import TextFileField from '../../../../../../common/forms/TextFileField';
import { getConversionHostSshKeyInfoMessage } from '../../../../../helpers';

const requiredWithMessage = required({ msg: __('This field is required') });

const ConversionHostWizardAuthenticationStep = ({
  selectedProviderType,
  selectedTransformationMethod,
  verifyOpenstackCerts
}) => {
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
      <TextFileField
        {...fieldBaseProps}
        name="conversionHostSshKey"
        label={__('Conversion Host SSH private key')}
        help={__('Upload your SSH key file or paste its contents below.')}
        controlId="host-ssh-key-input"
        info={getConversionHostSshKeyInfoMessage(selectedProviderType)}
      />
      <Field
        {...fieldBaseProps}
        name="transformationMethod"
        label={__('Transformation method')}
        component={BootstrapSelect}
        options={[{ id: VDDK, name: __('VDDK') }, { id: SSH, name: __('SSH') }]}
        option_key="id"
        option_value="name"
        inline_label
        required
        validate={[requiredWithMessage]}
        style={{ marginTop: 25 }}
      />
      {selectedTransformationMethod === SSH && (
        <TextFileField
          {...fieldBaseProps}
          name="vmwareSshKey"
          label={__('VMware hypervisors SSH private key')}
          help={__('Upload your SSH key file or paste its contents below.')}
          controlId="vmware-ssh-key-input"
        />
      )}
      {selectedTransformationMethod === VDDK && (
        <Field
          {...fieldBaseProps}
          name="vddkLibraryPath"
          label={__('VDDK library path')}
          info={
            __('This is the location where you downloaded and saved the VDDK package, as a URL accessible via HTTP. e.g. http://hostname/VMware-vix-disklib-version.x86_64.tar.gz') /* prettier-ignore */
          }
          component={FormField}
          type="text"
          controlId="vddk-library-path"
          required
          validate={[requiredWithMessage]}
        />
      )}
      {selectedProviderType === OPENSTACK && (
        // TODO collect CA certs for RHV too, see chat with Fabien for strings.
        <React.Fragment>
          <Field
            {...fieldBaseProps}
            name="verifyOpenstackCerts"
            label={__('Verify TLS Certificates for OpenStack')}
            component={FormField}
            controlId="verify-openstack-certs"
            style={{ marginTop: 25 }}
            validate={() => undefined} // Force redux-form to re-run validation when this field changes, since it can unmount openstackCaCerts
          >
            {({ input: { value, onChange } }) => (
              <Switch
                bsSize="normal"
                id="verify-openstack-certs-switch"
                onText={__('Yes')}
                offText={__('No')}
                defaultValue={false}
                value={value}
                onChange={(element, state) => onChange(state)}
              />
            )}
          </Field>
          {verifyOpenstackCerts && (
            <TextFileField
              {...fieldBaseProps}
              name="openstackCaCerts"
              label={__('OpenStack Trusted CA Certificates')}
              help={__('Upload your certificates file, in PEM format, or paste its contents below.')}
              controlId="openstack-ca-certs-input"
            />
          )}
        </React.Fragment>
      )}
    </Form>
  );
};

ConversionHostWizardAuthenticationStep.propTypes = {
  selectedProviderType: PropTypes.string,
  selectedTransformationMethod: PropTypes.string,
  verifyOpenstackCerts: PropTypes.bool
};

export default reduxForm({
  form: stepIDs.authenticationStep,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    openstackUser: 'cloud-user',
    conversionHostSshKey: { filename: '', body: '' },
    transformationMethod: VDDK,
    vmwareSshKey: { filename: '', body: '' },
    openstackCaCerts: { filename: '', body: '' },
    verifyOpenstackCerts: false
  }
})(ConversionHostWizardAuthenticationStep);
