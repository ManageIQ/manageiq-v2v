import { connect } from 'react-redux';
import Overview from './Overview';
import * as OverviewActions from './OverviewActions';
import * as NotificationActions from '../common/NotificationList/NotificationListActions';
import * as RouterActions from '../../../../redux/actions/routerActions';

import reducer from './OverviewReducer';
import {
  notStartedTransformationPlansFilter,
  activeTransformationPlansFilter,
  finishedTransformationPlansFilter,
  requestsProcessingCancellationFilter,
  combineRequestsProcessingCancellation
} from './OverviewSelectors';

export const reducers = { overview: reducer, form: {} };

const mapStateToProps = ({ overview, overview: { transformationPlans, allRequestsWithTasks, planId } }, ownProps) => {
  const { requestsProcessingCancellation, ...overviewRest } = overview;

  return {
    ...overviewRest,
    ...ownProps.data,
    notStartedTransformationPlans: notStartedTransformationPlansFilter(transformationPlans),
    activeTransformationPlans: activeTransformationPlansFilter(transformationPlans, planId),
    finishedTransformationPlans: finishedTransformationPlansFilter(transformationPlans),
    requestsProcessingCancellation: combineRequestsProcessingCancellation(
      requestsProcessingCancellation,
      requestsProcessingCancellationFilter(transformationPlans)
    )
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(OverviewActions, NotificationActions, RouterActions),
  mergeProps
)(Overview);
