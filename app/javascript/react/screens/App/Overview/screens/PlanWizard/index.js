import { connect } from 'react-redux';
import PlanWizard from './PlanWizard';
import * as PlanWizardActions from './PlanWizardActions';
import { planWizardOverviewFilter, planWizardFormFilter } from './PlanWizardSelectors';
import { setMigrationsFilterAction } from '../../OverviewActions';

import reducer from './PlanWizardReducer';

export const reducers = { planWizard: reducer };

const mapStateToProps = ({ overview, planWizard, form }, ownProps) => {
  const selectedOverview = planWizardOverviewFilter(overview);
  const selectedForms = planWizardFormFilter(form);
  return {
    ...selectedOverview,
    ...selectedForms,
    ...ownProps.data
  };
};

const actions = {
  ...PlanWizardActions,
  setMigrationsFilterAction
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, actions, mergeProps)(PlanWizard);
