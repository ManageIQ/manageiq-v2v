import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Button, Modal, Form, Grid } from 'patternfly-react';
import TextFileInput from '../../../../../common/forms/TextFileInput';
import { FormField } from '../../../../../common/forms/FormField';
import { V2V_TARGET_PROVIDERS, OPENSTACK, RHV } from '../../../../../../../../common/constants';

const requiredWithMessage = required({ msg: __('This field is required') });
const bodyIsRequired = value => requiredWithMessage(value.body);
const fieldBaseProps = { labelWidth: 4, controlWidth: 7 };

const RetryConversionHostConfirmationModal = ({
  show,
  conversionHostTaskToRetry,
  isPostingConversionHosts,
  hideConversionHostRetryModalAction,
  conversionHostRetryModalExitedAction,
  postConversionHostsAction,
  postConversionHostsUrl,
  retryForm
}) => {
  const requestParams =
    conversionHostTaskToRetry &&
    conversionHostTaskToRetry.context_data &&
    conversionHostTaskToRetry.context_data.request_params;
  const isUsingSshTransformation = !requestParams.vmware_vddk_package_url;
  const selectedProviderType = V2V_TARGET_PROVIDERS.find(provider => provider.type === requestParams.resource_type).id;
  // TODO dedupe this from the auth step of the wizard:
  let sshKeyInfo = '';
  if (selectedProviderType === RHV) {
    sshKeyInfo = __('RHV-M deploys a common SSH public key on all hosts when configuring them. This allows commands and playbooks to be run from RHV-M. The associated private key is in the file /etc/pki/ovirt-engine/keys/engine_id_rsa on RHV-M.'); // prettier-ignore
  }
  if (selectedProviderType === OPENSTACK) {
    sshKeyInfo = __('This is the private key file used to connect to the conversion host instance for the OpenStack User.'); // prettier-ignore
  }

  const formHasErrors = retryForm && !!retryForm.syncErrors;

  return (
    <Modal
      show={show}
      onHide={hideConversionHostRetryModalAction}
      onExited={conversionHostRetryModalExitedAction}
      dialogClassName="modal-lg wizard-pf"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.CloseButton onClick={hideConversionHostRetryModalAction} />
        <Modal.Title>{__('Retry Conversion Host Configuration')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form-horizontal">
          <ul>
            <p>
              {__('For your security, private SSH keys from the configuration wizard were not saved.')} <br />
              {__('Re-enter the necessary authentication details to retry configuration of the following conversion host:') /* prettier-ignore */}
            </p>
          </ul>
          <Form.FormGroup>
            <Grid.Col componentClass={Form.ControlLabel} sm={fieldBaseProps.labelWidth}>
              {__('Host')}
            </Grid.Col>
            <Grid.Col sm={fieldBaseProps.controlWidth} style={{ paddingTop: 3 }}>
              {conversionHostTaskToRetry.name}
            </Grid.Col>
          </Form.FormGroup>
          <Field
            {...fieldBaseProps}
            name="conversionHostSshKey"
            label={__('Conversion Host SSH private key')}
            component={FormField}
            info={sshKeyInfo}
            controlId="host-ssh-key-input"
            required
            validate={[bodyIsRequired]}
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
          {isUsingSshTransformation && (
            <Field
              {...fieldBaseProps}
              name="vmwareSshKey"
              label={__('VMware hypervisors SSH private key')}
              component={FormField}
              controlId="vmware-ssh-key-input"
              required
              validate={[bodyIsRequired]}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="default" className="btn-cancel" onClick={hideConversionHostRetryModalAction}>
          {__('Cancel')}
        </Button>
        <Button
          bsStyle="primary"
          disabled={formHasErrors || isPostingConversionHosts}
          onClick={() => {
            const postBody = { ...conversionHostTaskToRetry.context_data.request_params };
            // TODO also pass the two SSH keys
            postConversionHostsAction(postConversionHostsUrl, [postBody]);
          }}
        >
          {__('Retry')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

RetryConversionHostConfirmationModal.propTypes = {
  show: PropTypes.bool,
  conversionHostTaskToRetry: PropTypes.object,
  isPostingConversionHosts: PropTypes.bool,
  hideConversionHostRetryModalAction: PropTypes.func,
  conversionHostRetryModalExitedAction: PropTypes.func,
  postConversionHostsAction: PropTypes.func,
  postConversionHostsUrl: PropTypes.string,
  retryForm: PropTypes.object
};

export default reduxForm({
  form: 'retryConversionHost',
  initialValues: {
    conversionHostSshKey: { filename: '', body: '' },
    vmwareSshKey: { filename: '', body: '' }
  }
})(RetryConversionHostConfirmationModal);

// TODO add the keys to the request
// TODO prevent Retry button in the list view from appearing if there is no context_data.request_params
// TODO dedupe the sshKeyInfo, and maybe even the actual fields, abstracted along with the auth step of the wizard
// TODO refactor the whole list view to be in its own folder with an index.js
