import { connect } from 'react-redux';
import PlanWizard from './PlanWizard';
import * as PlanWizardActions from './PlanWizardActions';
import {
  planWizardOverviewFilter,
  planWizardFormFilter
} from './PlanWizardSelectors';

const mapStateToProps = ({ overview, form }, ownProps) => {
  const selectedOverview = planWizardOverviewFilter(overview);
  const selectedForms = planWizardFormFilter(form);
  return {
    ...selectedOverview,
    ...selectedForms,
    ...ownProps.data
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, PlanWizardActions, mergeProps)(
  PlanWizard
);
