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
  const currentStep = activeStepIndex === 2 ? 'Datastores' : 'Networks';

  return (
    <Modal
      show={warningModalVisible}
      onHide={hideWarningModalAction}
      onExited={hideWarningModalAction}
      dialogClassName="warning-modal"
      backdropClassName="warning-modal"
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
        <Modal.Title>{sprintf(__('Unmapped %s'), currentStep)}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="warning-modal-body">
        <div className="warning-modal-body--icon">
          <Icon type="pf" name="warning-triangle-o" />
        </div>
        <div className="warning-modal-body--list">
          <h3>
            {sprintf(
              __('The following source clusters have unmapped %s'),
              currentStep.toLowerCase()
            )}
          </h3>
          <ul>
            {sourceClustersWithoutMappings &&
              sourceClustersWithoutMappings.map(sourceCluster => {
                return <li key={sourceCluster.id}>{sourceCluster.name}</li>;
              })}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer className="warning-modal-footer">
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
            : activeStepIndex === 3 ? __('Create') : __('Continue')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningModal;
