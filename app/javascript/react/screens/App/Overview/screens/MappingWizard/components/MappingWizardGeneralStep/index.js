import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import MappingWizardGeneralStep from './MappingWizardGeneralStep';

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const MappingWizardGeneralStepForm = reduxForm({
  form: 'mappingWizardGeneralStep', // a unique identifier for this form
  destroyOnUnmount: false // preserve form data
  // forceUnregisterOnUnmount: true, // unregister fields on unmount
})(MappingWizardGeneralStep);

export default connect()(MappingWizardGeneralStepForm);
