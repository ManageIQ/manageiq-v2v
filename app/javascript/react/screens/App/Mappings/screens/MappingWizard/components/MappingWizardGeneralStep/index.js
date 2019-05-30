import { connect } from 'react-redux';

import MappingWizardGeneralStep from './MappingWizardGeneralStep';
import * as MappingWizardGeneralStepActions from './MappingWizardGeneralStepActions';
import { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

import reducer from './MappingWizardGeneralStepReducer';

export const reducers = { mappingWizardGeneralStep: reducer };

const mapStateToProps = ({
  mappingWizardGeneralStep: { editingMapping, conversionHosts },
  overview: { transformationMappings },
  form: { mappingWizardGeneralStep },
  providers: { providers }
}) => ({
  editingMapping,
  conversionHosts,
  providers,
  transformationMappings,
  targetProvider:
    mappingWizardGeneralStep && mappingWizardGeneralStep.values && mappingWizardGeneralStep.values.targetProvider
});

const actions = { showAlertAction, hideAlertAction, ...MappingWizardGeneralStepActions };

export default connect(
  mapStateToProps,
  actions
)(MappingWizardGeneralStep);
