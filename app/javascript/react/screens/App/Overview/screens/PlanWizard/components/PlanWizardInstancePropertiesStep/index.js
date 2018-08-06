import { connect } from 'react-redux';

import PlanWizardInstancePropertiesStep from './PlanWizardInstancePropertiesStep';
import * as PlanWizardInstancePropertiesStepActions from './PlanWizardInstancePropertiesStepActions';
import reducer from './PlanWizardInstancePropertiesStepReducer';

export const reducers = { planWizardInstancePropertiesStep: reducer };

const mapStateToProps = (state, ownProps) => ({
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps.data,
  ...dispatchProps
});

export default connect(
  mapStateToProps,
  PlanWizardInstancePropertiesStepActions,
  mergeProps
)(PlanWizardInstancePropertiesStep);
