import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Grid, Icon, noop } from 'patternfly-react';

const ConfirmModal = props => {
  const {
    icon,
    iconType,
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
            <Grid.Col xsHidden md={2} className="text-right">
              <Icon size="4x" type={iconType} name={icon} />
            </Grid.Col>
            <Grid.Col xs={12} md={10}>
              {body}
            </Grid.Col>
          </Grid.Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle="default"
          className="btn-cancel"
          onClick={onCancel}
        >
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
  icon: PropTypes.string,
  iconType: PropTypes.string,
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
  iconType: 'fa',
  body: <p>{__('Are you sure?')}</p>,
  cancelButtonLabel: __('Cancel'),
  confirmButtonLabel: __('Yes'),
  onCancel: noop,
  onConfirm: noop
};

export default ConfirmModal;
