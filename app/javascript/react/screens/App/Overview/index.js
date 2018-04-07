import { connect } from 'react-redux';
import Overview from './Overview';
import * as OverviewActions from './OverviewActions';
import {
  activeTransformationPlanRequestsFilter,
  completeTransformationPlanRequestsFilter,
  pendingTransformationPlansFilter
} from './OverviewSelectors';

import reducer from './OverviewReducer';

export const reducers = { overview: reducer, form: {} };

const mapStateToProps = (
  { overview, overview: { transformationPlanRequests, transformationPlans } },
  ownProps
) => ({
  ...overview,
  ...ownProps.data,
  activeTransformationPlanRequests: activeTransformationPlanRequestsFilter(
    transformationPlanRequests
  ),
  completeTransformationPlanRequests: completeTransformationPlanRequestsFilter(
    transformationPlanRequests
  ),
  pendingTransformationPlans: pendingTransformationPlansFilter(
    transformationPlans
  )
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, OverviewActions, mergeProps)(Overview);
