import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon } from 'patternfly-react';

const unUsedMappingInPlans = (mappingToDelete, notStartedTransformationPlans, finishedWithErrorTransformationPlans) => {
  const planNames = [];

  const plansWithMappingToBeDeleted = notStartedTransformationPlans.filter(
    plan => plan.options.config_info.transformation_mapping_id === mappingToDelete.id
  );
  plansWithMappingToBeDeleted.map(plan => planNames.push({ name: plan.name, id: plan.id }));

  const plansWithErrorWithMappingToBeDeleted = finishedWithErrorTransformationPlans.filter(
    plan => plan.options.config_info.transformation_mapping_id === mappingToDelete.id
  );
  plansWithErrorWithMappingToBeDeleted.map(plan => planNames.push({ name: plan.name, id: plan.id }));

  if (planNames.length > 0) {
    const deleteMessageAboutUnMigratedVMs = (
      <div>
        <h4>
          {__('The infrastructure mapping is associated with migration plans that include unmigrated VMs. Deleting the mapping will prevent you from migrating the VMs in these plans:') // prettier-ignore
          }
        </h4>
      </div>
    );

    const deleteMessageAboutPlansUsingMapping = (
      <div className="warning-modal-body-enable-scrollbar">
        <h4>
          <strong>
            {planNames.map(plan => (
              <ul key={plan.id}>{plan.name}</ul>
            ))}
          </strong>
        </h4>
      </div>
    );
    return (
      <div>
        {deleteMessageAboutUnMigratedVMs}
        {deleteMessageAboutPlansUsingMapping}
      </div>
    );
  }
  return '';
};

const DeleteInfrastructureMappingConfirmationModal = ({
  showDeleteConfirmationModal,
  hideDeleteConfirmationModalAction,
  mappingToDelete,
  yesToDeleteInfrastructureMappingAction,
  notStartedTransformationPlans,
  finishedWithErrorTransformationPlans
}) => (
  <Modal show={showDeleteConfirmationModal} onHide={hideDeleteConfirmationModalAction} backdrop="static">
    <Modal.Header>
      <Modal.CloseButton onClick={hideDeleteConfirmationModalAction} />
      <Modal.Title>{__('Delete Infrastructure Mapping')}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="warning-modal-body">
      <div className="warning-modal-body--icon">
        <Icon type="pf" name="delete" />
      </div>
      <div className="warning-modal-body--list">
        {mappingToDelete &&
          unUsedMappingInPlans(mappingToDelete, notStartedTransformationPlans, finishedWithErrorTransformationPlans)}
        <h4>{__('Are you sure you want to delete the following infrastructure mapping?')}</h4>
        <ul>
          <h4>
            <strong>{mappingToDelete && mappingToDelete.name}</strong>
          </h4>
        </ul>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel" onClick={hideDeleteConfirmationModalAction}>
        {__('Cancel')}
      </Button>
      <Button bsStyle="primary" onClick={yesToDeleteInfrastructureMappingAction}>
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
