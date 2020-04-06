import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon } from 'patternfly-react';

const DeleteConversionHostConfirmationModal = ({
  conversionHostToDelete,
  deleteConversionHostAction,
  hideConversionHostDeleteModalAction,
  conversionHostDeleteModalVisible,
  isDeletingConversionHost
}) => (
  <Modal show={conversionHostDeleteModalVisible} onHide={hideConversionHostDeleteModalAction} backdrop="static">
    <Modal.Header>
      <Modal.CloseButton onClick={hideConversionHostDeleteModalAction} />
      <Modal.Title>{__('Remove Conversion Host')}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="warning-modal-body">
      <div className="warning-modal-body--icon">
        <Icon type="pf" name="delete" />
      </div>
      <div className="warning-modal-body--list">
        <h4>
          {__('Are you sure you want to remove the following conversion host?') /* TODO different text for task? */}
        </h4>
        <div>
          <ul>
            <h4>
              <strong>{conversionHostToDelete && conversionHostToDelete.name}</strong>
            </h4>
          </ul>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel" onClick={hideConversionHostDeleteModalAction}>
        {__('Cancel')}
      </Button>
      <Button
        bsStyle="primary"
        disabled={isDeletingConversionHost}
        onClick={() => {
          deleteConversionHostAction(conversionHostToDelete);
        }}
      >
        {__('Remove')}
      </Button>
    </Modal.Footer>
  </Modal>
);

DeleteConversionHostConfirmationModal.propTypes = {
  conversionHostToDelete: PropTypes.object,
  deleteConversionHostAction: PropTypes.func,
  hideConversionHostDeleteModalAction: PropTypes.func,
  conversionHostDeleteModalVisible: PropTypes.bool,
  isDeletingConversionHost: PropTypes.bool
};

export default DeleteConversionHostConfirmationModal;
