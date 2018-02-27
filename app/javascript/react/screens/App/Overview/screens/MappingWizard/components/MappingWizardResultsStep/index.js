import { connect } from 'react-redux';
import MappingWizardResultsStep from './MappingWizardResultsStep';
import * as MappingWizardResultsStepActions from './MappingWizardResultsStepActions';

import reducer from './MappingWizardResultsStepReducer';

export const reducers = { mappingWizardResultsStep: reducer };

const mapStateToProps = ({ mappingWizardResultsStep }, ownProps) => ({
  ...mappingWizardResultsStep,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  MappingWizardResultsStepActions,
  mergeProps
)(MappingWizardResultsStep);
