import { connect } from 'react-redux';
import MappingWizardGeneralStep from './MappingWizardGeneralStep';
import { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

const mapStateToProps = ({ overview: { transformationMappings }, form: { mappingWizardGeneralStep } }) => ({
  transformationMappings,
  targetProvider:
    mappingWizardGeneralStep && mappingWizardGeneralStep.values && mappingWizardGeneralStep.values.targetProvider
});

const actions = { showAlertAction, hideAlertAction };

export default connect(
  mapStateToProps,
  actions
)(MappingWizardGeneralStep);
