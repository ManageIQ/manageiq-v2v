import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon } from 'patternfly-react';

const onClickHandler = (host, deleteHostAction, deleteHostActionUrl, fetchHostsAction, fetchHostsUrl) => {
  deleteHostAction(deleteHostActionUrl, host).then(() => fetchHostsAction(fetchHostsUrl));
};

const DeleteConversionHostConfirmationModal = ({
  conversionHostToDelete,
  deleteConversionHostAction,
  deleteConversionHostActionUrl,
  fetchConversionHostsAction,
  fetchConversionHostsUrl,
  hideConversionHostDeleteModalAction,
  showConversionHostDeleteModal
}) => (
  <Modal show={showConversionHostDeleteModal} onHide={hideConversionHostDeleteModalAction} backdrop="static">
    <Modal.Header>
      <Modal.CloseButton onClick={hideConversionHostDeleteModalAction} />
      <Modal.Title>{__('Delete Conversion Host')}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="warning-modal-body">
      <div className="warning-modal-body--icon">
        <Icon type="pf" name="delete" />
      </div>
      <div className="warning-modal-body--list">
        <h4>
          {conversionHostToDelete &&
            sprintf(__('Are you sure you want to delete conversion host %s ?'), conversionHostToDelete.name)}
        </h4>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel" onClick={hideConversionHostDeleteModalAction}>
        {__('Cancel')}
      </Button>
      <Button
        bsStyle="primary"
        onClick={() => {
          onClickHandler(
            conversionHostToDelete,
            deleteConversionHostAction,
            deleteConversionHostActionUrl,
            fetchConversionHostsAction,
            fetchConversionHostsUrl
          );
        }}
      >
        {__('Delete')}
      </Button>
    </Modal.Footer>
  </Modal>
);

DeleteConversionHostConfirmationModal.propTypes = {
  conversionHostToDelete: PropTypes.object,
  deleteConversionHostAction: PropTypes.func,
  deleteConversionHostActionUrl: PropTypes.string,
  fetchConversionHostsAction: PropTypes.func,
  fetchConversionHostsUrl: PropTypes.string,
  hideConversionHostDeleteModalAction: PropTypes.func,
  showConversionHostDeleteModal: PropTypes.bool
};

export default DeleteConversionHostConfirmationModal;
