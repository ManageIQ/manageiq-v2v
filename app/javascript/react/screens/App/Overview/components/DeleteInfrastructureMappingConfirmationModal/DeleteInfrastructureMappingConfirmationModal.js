import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon } from 'patternfly-react';

const unUsedMappingInPlans = (
  mappingToDelete,
  notStartedTransformationPlans,
  finishedWithErrorTransformationPlans
) => {
  const planNames = [];

  const plansWithMappingToBeDeleted = notStartedTransformationPlans.filter(
    plan =>
      plan.options.config_info.transformation_mapping_id === mappingToDelete.id
  );
  plansWithMappingToBeDeleted.map(plan => planNames.push(plan.name));

  const plansWithErrorWithMappingToBeDeleted = finishedWithErrorTransformationPlans.filter(
    plan =>
      plan.options.config_info.transformation_mapping_id === mappingToDelete.id
  );
  plansWithErrorWithMappingToBeDeleted.map(plan => planNames.push(plan.name));

  if (planNames.length > 0) {
    const deleteMessageAboutUnMigratedVMs = __(
      'The infrastructure mapping is associated with migration plans that include unmigrated VMs. Deleting the mapping will prevent you from migrating the VMs in these plans:'
    );
    const deleteMessageAboutPlansUsingMapping = (
      <div>
        <h4>{deleteMessageAboutUnMigratedVMs}</h4>
        <strong>{planNames.map(plan => <ul key={plan}>{plan}</ul>)}</strong>
      </div>
    );
    return <div>{deleteMessageAboutPlansUsingMapping}</div>;
  }
  return '';
};

const displayDeleteMessage = mappingToDelete => {
  const mappingNameStyled = `<strong>${mappingToDelete.name}</strong>`;
  const regularDeleteMessage = sprintf(
    __('Are you sure you want to delete the infrastructure mapping %s ?'),
    mappingNameStyled
  );
  return <div dangerouslySetInnerHTML={{ __html: regularDeleteMessage }} />;
};

const DeleteInfrastructureMappingConfirmationModal = ({
  showDeleteConfirmationModal,
  hideDeleteConfirmationModalAction,
  mappingToDelete,
  yesToDeleteInfrastructureMappingAction,
  notStartedTransformationPlans,
  finishedWithErrorTransformationPlans
}) => (
  <Modal
    show={showDeleteConfirmationModal}
    onHide={hideDeleteConfirmationModalAction}
  >
    <Modal.Header>
      <Modal.CloseButton onClick={hideDeleteConfirmationModalAction} />
      <Modal.Title>{__('Delete Infrastructure Mapping')}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="warning-modal-body">
      <div className="warning-modal-body--icon">
        <Icon type="pf" name="delete" />
      </div>
      <div className="warning-modal-body--list">
        <h4>
          {mappingToDelete &&
            unUsedMappingInPlans(
              mappingToDelete,
              notStartedTransformationPlans,
              finishedWithErrorTransformationPlans
            )}
        </h4>
        <h4>{mappingToDelete && displayDeleteMessage(mappingToDelete)}</h4>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button
        bsStyle="default"
        className="btn-cancel"
        onClick={hideDeleteConfirmationModalAction}
      >
        {__('Cancel')}
      </Button>
      <Button
        bsStyle="primary"
        onClick={yesToDeleteInfrastructureMappingAction}
      >
        {__('Delete')}
      </Button>
    </Modal.Footer>
  </Modal>
);

DeleteInfrastructureMappingConfirmationModal.propTypes = {
  showDeleteConfirmationModal: PropTypes.bool,
  hideDeleteConfirmationModalAction: PropTypes.func,
  mappingToDelete: PropTypes.object,
  yesToDeleteInfrastructureMappingAction: PropTypes.func,
  notStartedTransformationPlans: PropTypes.array,
  finishedWithErrorTransformationPlans: PropTypes.array
};

export default DeleteInfrastructureMappingConfirmationModal;
