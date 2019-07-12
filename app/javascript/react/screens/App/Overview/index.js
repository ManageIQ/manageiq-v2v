import { connect } from 'react-redux';
import Overview from './Overview';
import * as OverviewActions from './OverviewActions';
import * as NotificationActions from '../common/NotificationList/NotificationListActions';
import * as ProductFeaturesActions from '../../../../redux/common/productFeatures/productFeaturesActions';
import * as ProvidersActions from '../../../../redux/common/providers/providersActions';
import * as RouterActions from '../../../../redux/actions/routerActions';

import reducer from './OverviewReducer';
import {
  notStartedTransformationPlansFilter,
  activeTransformationPlansFilter,
  finishedTransformationPlansFilter,
  requestsProcessingCancellationFilter,
  combineRequestsProcessingCancellation,
  attachTargetProviderToOspPlans
} from './OverviewSelectors';

export const reducers = { overview: reducer, form: {} };

const mapStateToProps = (
  {
    overview,
    overview: { transformationPlans, allRequestsWithTasks, planId, cloudTenants },
    providers,
    productFeatures: { productFeatures }
  },
  ownProps
) => {
  const { requestsProcessingCancellation, ...overviewRest } = overview;

  return {
    ...overviewRest,
    ...providers,
    ...ownProps.data,
    notStartedTransformationPlans: notStartedTransformationPlansFilter(transformationPlans),
    activeTransformationPlans: attachTargetProviderToOspPlans(
      activeTransformationPlansFilter(transformationPlans, planId),
      providers.providers,
      cloudTenants
    ),
    finishedTransformationPlans: finishedTransformationPlansFilter(transformationPlans),
    requestsProcessingCancellation: combineRequestsProcessingCancellation(
      requestsProcessingCancellation,
      requestsProcessingCancellationFilter(transformationPlans)
    ),
    productFeatures
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(OverviewActions, NotificationActions, ProvidersActions, RouterActions, ProductFeaturesActions),
  mergeProps
)(Overview);
