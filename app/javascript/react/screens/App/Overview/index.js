import { connect } from 'react-redux';
import async from '../common/reactLoadable';
import * as OverviewActions from './OverviewActions';
import * as NotificationActions from '../common/NotificationList/NotificationListActions';

import reducer from './OverviewReducer';
import {
  notStartedTransformationPlansFilter,
  activeTransformationPlansFilter,
  finishedTransformationPlansFilter
} from './OverviewSelectors';

export const reducers = { overview: reducer, form: {} };

const Overview = async({
  loader: () => import('./Overview' /* webpackChunkName: 'overview' */),
  modules: ['./Overview'],
  webpack: () => [require.resolveWeak('./Overview')]
});

const mapStateToProps = (
  { overview, overview: { transformationPlans, allRequestsWithTasks, planId } },
  ownProps
) => ({
  ...overview,
  ...ownProps.data,
  notStartedTransformationPlans: notStartedTransformationPlansFilter(
    transformationPlans
  ),
  activeTransformationPlans: activeTransformationPlansFilter(
    transformationPlans,
    planId
  ),
  finishedTransformationPlans: finishedTransformationPlansFilter(
    transformationPlans
  )
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(OverviewActions, NotificationActions),
  mergeProps
)(Overview);
