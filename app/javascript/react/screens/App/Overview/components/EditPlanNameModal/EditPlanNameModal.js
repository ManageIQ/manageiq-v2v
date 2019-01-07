import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import { Modal, Button, Form, Spinner, noop } from 'patternfly-react';
import { FormField } from '../../../common/forms/FormField';
import { validation } from '../../../../../../common/constants';
import { asyncValidate, onChange } from '../../screens/PlanWizard/components/PlanWizardGeneralStep/helpers';

class EditPlanNameModal extends React.Component {
  onSubmit = () => {
    const {
      editPlanNameModal,
      editingPlan,
      editMigrationPlansAction,
      editMigrationPlansUrl,
      hideEditPlanNameModalAction,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      fetchArchivedTransformationPlansUrl
    } = this.props;
    const {
      values: { name, description }
    } = editPlanNameModal;
    const resource = { name, description };
    editMigrationPlansAction(editMigrationPlansUrl, editingPlan.id, resource).then(() => {
      hideEditPlanNameModalAction();
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
      fetchTransformationPlansAction({
        url: fetchArchivedTransformationPlansUrl,
        archived: true
      });
    });
  };

  render() {
    const { editPlanNameModalVisible, hideEditPlanNameModalAction, editPlanNameModal, savingPlan } = this.props;

    const disableConfirmButton = savingPlan || !!editPlanNameModal.syncErrors || !!editPlanNameModal.asyncErrors;

    const formBody = (
      <Form horizontal>
        <Field
          name="name"
          label={__('Name')}
          required
          component={FormField}
          type="text"
          help={validation.name.help}
          maxLength={validation.name.maxLength}
          maxLengthWarning={validation.name.maxLengthWarning}
          validate={[
            required({
              msg: validation.name.requiredMessage
            })
          ]}
        />
        <Field
          name="description"
          label={__('Description')}
          component={FormField}
          type="textarea"
          help={validation.description.help}
          maxLength={validation.description.maxLength}
          maxLengthWarning={validation.description.maxLengthWarning}
        />
      </Form>
    );

    const spinner = (
      <div style={{ marginTop: 15 }}>
        <Spinner loading size="lg" />
        <h2 style={{ textAlign: 'center' }}>{__('Saving...')}</h2>
      </div>
    );

    return (
      <Modal show={editPlanNameModalVisible} onHide={hideEditPlanNameModalAction} backdrop="static">
        <Modal.Header>
          <Modal.CloseButton onClick={hideEditPlanNameModalAction} />
          <Modal.Title>{__('Edit Migration Plan')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{!savingPlan ? formBody : spinner}</Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" className="btn-cancel" onClick={hideEditPlanNameModalAction}>
            {__('Cancel')}
          </Button>
          <Button bsStyle="primary" onClick={this.onSubmit} disabled={disableConfirmButton}>
            {__('Save')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditPlanNameModal.propTypes = {
  editPlanNameModalVisible: PropTypes.bool,
  hideEditPlanNameModalAction: PropTypes.func,
  editPlanNameModal: PropTypes.object,
  editingPlan: PropTypes.object,
  editMigrationPlansAction: PropTypes.func,
  editMigrationPlansUrl: PropTypes.string,
  savingPlan: PropTypes.bool.isRequired,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchArchivedTransformationPlansUrl: PropTypes.string
};

EditPlanNameModal.defaultProps = {
  editPlanNameModalVisible: false,
  hideEditPlanNameModalAction: noop,
  editPlanNameModal: {},
  editMigrationPlansUrl: '/api/service_templates'
};

export default reduxForm({
  form: 'editPlanNameModal',
  asyncValidate,
  asyncBlurFields: ['name'],
  onChange
})(EditPlanNameModal);
