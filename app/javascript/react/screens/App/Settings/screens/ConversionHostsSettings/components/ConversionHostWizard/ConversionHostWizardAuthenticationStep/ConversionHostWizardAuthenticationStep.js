import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form, Switch } from 'patternfly-react';
import { stepIDs, VDDK, SSH } from '../ConversionHostWizardConstants';
import { FormField } from '../../../../../../common/forms/FormField';
import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import TextFileField from '../../../../../../common/forms/TextFileField';
import { CONVERSION_HOST_SSH_KEY_MESSAGE } from '../../../../../SettingsConstants';

const requiredWithMessage = required({ msg: __('This field is required') });

export const ConversionHostWizardAuthenticationStep = ({ selectedTransformationMethod, verifyCaCerts }) => {
  const fieldBaseProps = { labelWidth: 4, controlWidth: 7 };

  return (
    <Form className="form-horizontal">
      <TextFileField
        {...fieldBaseProps}
        name="conversionHostSshKey"
        label={__('Conversion Host SSH private key')}
        help={__('Upload your SSH key file or paste its contents below.')}
        controlId="host-ssh-key-input"
        info={CONVERSION_HOST_SSH_KEY_MESSAGE}
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
      <React.Fragment>
        <Field
          {...fieldBaseProps}
          name="verifyCaCerts"
          label={__('Verify TLS Certificates')}
          component={FormField}
          controlId="verify-ca-certs"
          style={{ marginTop: 25 }}
        >
          {({ input: { value, onChange } }) => (
            <Switch
              bsSize="normal"
              id="verify-ca-certs-switch"
              onText={__('Yes')}
              offText={__('No')}
              defaultValue={false}
              value={value}
              onChange={(element, state) => onChange(state)}
            />
          )}
        </Field>
        {verifyCaCerts && (
          <TextFileField
            {...fieldBaseProps}
            name="caCerts"
            label={__('Trusted CA Certificates')}
            help={__('Upload your certificates file, in PEM format, or paste its contents below.')}
            controlId="ca-certs-input"
          />
        )}
      </React.Fragment>
    </Form>
  );
};

ConversionHostWizardAuthenticationStep.propTypes = {
  selectedProviderType: PropTypes.string,
  selectedTransformationMethod: PropTypes.string,
  verifyCaCerts: PropTypes.bool
};

export default reduxForm({
  form: stepIDs.authenticationStep,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  shouldError: () => true, // Force validation to re-run on every field change so unmounted fields get excluded
  initialValues: {
    conversionHostSshKey: { filename: '', body: '' },
    transformationMethod: VDDK,
    vmwareSshKey: { filename: '', body: '' },
    caCerts: { filename: '', body: '' },
    verifyCaCerts: false
  }
})(ConversionHostWizardAuthenticationStep);
