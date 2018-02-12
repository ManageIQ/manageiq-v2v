import { connect } from 'react-redux';
import PlanWizard from './PlanWizard';
import * as PlanWizardActions from './PlanWizardActions';
import { planWizardFilter } from './PlanWizardSelectors';

const mapStateToProps = ({ overview }, ownProps) => {
  const selected = planWizardFilter(overview);
  return {
    ...selected,
    ...ownProps.data
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, PlanWizardActions, mergeProps)(
  PlanWizard
);
