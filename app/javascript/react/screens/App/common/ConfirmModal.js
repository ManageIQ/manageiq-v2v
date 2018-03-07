import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Grid, noop } from 'patternfly-react';

const ConfirmModal = props => {
  const {
    icon,
    title,
    body,
    cancelButtonLabel,
    confirmButtonLabel,
    onCancel,
    onConfirm,
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
            <Grid.Col md={2} className="text-right">
              {icon}
            </Grid.Col>
            <Grid.Col md={10}>{body}</Grid.Col>
          </Grid.Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="default" className="btn-cancel" onClick={onCancel}>
          {cancelButtonLabel}
        </Button>
        <Button bsStyle="primary" onClick={onConfirm}>
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
  onConfirm: PropTypes.func
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
