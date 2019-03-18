import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon } from 'patternfly-react';

const RetryConversionHostConfirmationModal = ({
  show,
  conversionHostTaskToRetry,
  isPostingConversionHosts,
  hideConversionHostRetryModalAction,
  postConversionHostsAction,
  postConversionHostsUrl
}) => (
  <Modal show={show} onHide={hideConversionHostRetryModalAction} backdrop="static">
    <Modal.Header>
      <Modal.CloseButton onClick={hideConversionHostRetryModalAction} />
      <Modal.Title>{__('Retry Conversion Host Configuration')}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="warning-modal-body">
      <div className="warning-modal-body--icon">
        <Icon type="pf" name="info" />
      </div>
      <div className="warning-modal-body--list">
        <h4>
          {__(
            'To retry configuration of the conversion host below, re-enter the required SSH keys for Authentication.'
          )}
        </h4>
        <div>
          <ul>
            <h4>
              <strong>{conversionHostTaskToRetry && conversionHostTaskToRetry.name}</strong>
              {/* TODO also include the two SSH key fields. redux-form? maybe just local state? */}
            </h4>
          </ul>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel" onClick={hideConversionHostRetryModalAction}>
        {__('Cancel')}
      </Button>
      <Button
        bsStyle="primary"
        disabled={isPostingConversionHosts} // TODO disable if the ssh key fields are empty, too
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

RetryConversionHostConfirmationModal.propTypes = {
  show: PropTypes.bool,
  conversionHostTaskToRetry: PropTypes.object,
  isPostingConversionHosts: PropTypes.bool,
  hideConversionHostRetryModalAction: PropTypes.func,
  postConversionHostsAction: PropTypes.func,
  postConversionHostsUrl: PropTypes.string
};

export default RetryConversionHostConfirmationModal;
