import { connect } from 'react-redux';

import MappingWizardGeneralStep from './MappingWizardGeneralStep';
import { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

import reducer from './MappingWizardGeneralStepReducer';

export const reducers = { mappingWizardGeneralStep: reducer };

const mapStateToProps = ({
  mappingWizardGeneralStep: { editingMapping },
  overview: { transformationMappings },
  form: { mappingWizardGeneralStep }
}) => ({
  editingMapping,
  transformationMappings,
  targetProvider:
    mappingWizardGeneralStep && mappingWizardGeneralStep.values && mappingWizardGeneralStep.values.targetProvider
});

const actions = { showAlertAction, hideAlertAction };

export default connect(
  mapStateToProps,
  actions
)(MappingWizardGeneralStep);
