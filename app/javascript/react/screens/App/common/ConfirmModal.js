import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Grid, noop } from 'patternfly-react';

// Note: This is in the process of being moved to `patternfly-react`.
// TODO: Replace this implementation with an import

const ConfirmModal = props => {
  const {
    icon,
    title,
    body,
    cancelButtonLabel,
    confirmButtonLabel,
    onCancel,
    onConfirm,
    disableCancelButton,
    disableConfirmButton,
    ...otherProps
  } = props;
  return (
    <Modal {...otherProps} onHide={onCancel}>
      <Modal.Header>
        <Modal.CloseButton onClick={onCancel} />
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!icon ? (
          body
        ) : (
          <Grid.Row className="show-grid">
            <Grid.Col xsHidden md={2} className="text-right">
              {icon}
            </Grid.Col>
            <Grid.Col xs={12} md={10}>
              {body}
            </Grid.Col>
          </Grid.Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="default" className="btn-cancel" onClick={onCancel} disabled={disableCancelButton}>
          {cancelButtonLabel}
        </Button>
        <Button bsStyle="primary" onClick={onConfirm} disabled={disableConfirmButton}>
          {confirmButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.node,
  body: PropTypes.node,
  cancelButtonLabel: PropTypes.string,
  confirmButtonLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  disableCancelButton: PropTypes.bool,
  disableConfirmButton: PropTypes.bool
};

ConfirmModal.defaultProps = {
  show: false,
  title: __('Confirm'),
  icon: null,
  body: <p>{__('Are you sure?')}</p>,
  cancelButtonLabel: __('Cancel'),
  confirmButtonLabel: __('Yes'),
  onCancel: noop,
  onConfirm: noop
};

export default ConfirmModal;
