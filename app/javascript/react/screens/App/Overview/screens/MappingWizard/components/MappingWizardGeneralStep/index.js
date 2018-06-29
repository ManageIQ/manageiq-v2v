import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import MappingWizardGeneralStep from './MappingWizardGeneralStep';
import { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

import { asyncValidate, onChange } from './helpers';

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const MappingWizardGeneralStepForm = reduxForm({
  form: 'mappingWizardGeneralStep', // a unique identifier for this form
  destroyOnUnmount: false, // preserve form data
  asyncValidate,
  asyncBlurFields: ['name'],
  onChange
  // forceUnregisterOnUnmount: true, // unregister fields on unmount
})(MappingWizardGeneralStep);

const mapStateToProps = ({ overview: { transformationMappings } }) => ({
  transformationMappings
});

const actions = { showAlertAction, hideAlertAction };

export default connect(
  mapStateToProps,
  actions
)(MappingWizardGeneralStepForm);
