import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon, Modal } from 'patternfly-react';

const WarningModal = ({
  warningModalVisible,
  hideWarningModalAction,
  onFinalStep,
  activeStepIndex,
  nextStep,
  sourceClustersWithoutMappings
}) => {
  return (
    <Modal
      show={warningModalVisible}
      onHide={hideWarningModalAction}
      onExited={hideWarningModalAction}
      dialogClassName="modal-lg wizard-pf"
    >
      <Modal.Header>
        <button
          className="close"
          onClick={hideWarningModalAction}
          aria-hidden="true"
          aria-label="Close"
        >
          <Icon type="pf" name="close" />
        </button>
        <Modal.Title>{__('Unmapped Things')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="wizard-pf-body clearfix">
        {sourceClustersWithoutMappings &&
          sourceClustersWithoutMappings.map(sourceCluster => {
            return <p>{sourceCluster.name}</p>;
          })}
      </Modal.Body>
      <Modal.Footer className="wizard-pf-footer">
        <Button
          bsStyle="default"
          className="btn-cancel"
          onClick={hideWarningModalAction}
        >
          {__('Cancel')}
        </Button>
        <Button
          bsStyle="primary"
          onClick={onFinalStep ? hideWarningModalAction : nextStep}
        >
          {onFinalStep
            ? __('Close')
            : activeStepIndex === 3 ? __('Create') : __('Next')}
          <Icon type="fa" name="angle-right" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningModal;
