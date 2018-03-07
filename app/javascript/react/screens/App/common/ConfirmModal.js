import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Grid, Icon, noop } from 'patternfly-react';

const ConfirmModal = props => (
  <Modal show={props.show} onHide={props.onCancel}>
    <Modal.Header>
      <Modal.CloseButton onClick={props.onCancel} />
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {!props.icon ? props.body : (
        <Grid.Row className="show-grid">
          <Grid.Col xsHidden md={2} className="text-right">
            <Icon size="4x" type={props.iconType} name={props.icon} />
          </Grid.Col>
          <Grid.Col xs={12} md={10}>
            {props.body}
          </Grid.Col>
        </Grid.Row>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel" onClick={props.onCancel}>
        {props.cancelButtonLabel}
      </Button>
      <Button bsStyle="primary" onClick={props.onConfirm}>
        {props.confirmButtonLabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

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
