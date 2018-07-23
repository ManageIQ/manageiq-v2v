import { connect } from 'react-redux';
import MappingWizardGeneralStep from './MappingWizardGeneralStep';
import { showAlertAction, hideAlertAction } from '../../MappingWizardActions';

const mapStateToProps = ({ overview: { transformationMappings } }) => ({
  transformationMappings
});

const actions = { showAlertAction, hideAlertAction };

export default connect(
  mapStateToProps,
  actions
)(MappingWizardGeneralStep);
