import { connect } from 'react-redux';
import PlanWizard from './PlanWizard';
import * as PlanWizardActions from './PlanWizardActions';
import {
  planWizardOverviewFilter,
  planWizardFormFilter
} from './PlanWizardSelectors';

import reducer from './PlanWizardReducer';

export const reducers = { planWizard: reducer };

const mapStateToProps = ({ overview, planWizard, form }, ownProps) => {
  const selectedOverview = planWizardOverviewFilter(overview);
  const selectedForms = planWizardFormFilter(form);
  console.log('selected forms for plan wizard? ', selectedForms);
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
