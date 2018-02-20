import { connect } from 'react-redux';
import MappingWizardDatastoresStep from './MappingWizardDatastoresStep';
import * as MappingWizardDatastoresStepActions from './MappingWizardDatastoresStepActions';

import reducer from './MappingWizardDatastoresStepReducer';

export const reducers = { mappingWizardDatastoresStep: reducer };

const mapStateToProps = ({ mappingWizardDatastoresStep }, ownProps) => ({
  ...mappingWizardDatastoresStep,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  MappingWizardDatastoresStepActions,
  mergeProps
)(MappingWizardDatastoresStep);
