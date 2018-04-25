import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Link } from 'react-router-dom';
import { bindMethods, Breadcrumb, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import PlanRequestDetailList from './components/PlanRequestDetailList';
import PlanVmsList from './components/PlanVmsList';
import PlanEmptyState from './components/PlanEmptyState';

class Plan extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !prevState.planNotStarted &&
      nextProps.planRequestTasks === prevState.planRequestTasks
    ) {
      return null;
    }
    return {
      planRequestTasks: nextProps.planRequestTasks,
      planRequestTasksMutable: Immutable.asMutable(nextProps.planRequestTasks),
      vms: nextProps.vms,
      vmsMutable: Immutable.asMutable(nextProps.vms),
      planNotStarted: nextProps.planRequestTasks.length === 0
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      planRequestTasksMutable: Immutable.asMutable(props.planRequestTasks),
      vmsMutable: [],
      planNotStarted: false,
      planFinished: false
    };

    bindMethods(this, ['stopPolling', 'startPolling']);
  }

  componentDidMount() {
    const {
      fetchPlanUrlBuilder,
      fetchPlanAction,
      planId,
      fetchPlanRequestUrlBuilder,
      fetchPlanRequestAction,
      queryPlanVmsAction
    } = this.props;

    fetchPlanAction(fetchPlanUrlBuilder, planId).then(
      ({ value: { data: plan } }) => {
        const {
          miq_requests,
          options: {
            config_info: { vm_ids }
          }
        } = plan;

        if (miq_requests.length > 0) {
          const [mostRecentRequest] = miq_requests.slice(-1);
          const planRequestId = mostRecentRequest.id;
          fetchPlanRequestAction(fetchPlanRequestUrlBuilder, planRequestId);
          if (mostRecentRequest.status === 'active') {
            this.startPolling(planRequestId);
          } else if (
            mostRecentRequest.status === 'complete' ||
            mostRecentRequest.status === 'failed'
          ) {
            this.setState(() => ({
              planFinished: true
            }));
          }
        } else {
          queryPlanVmsAction(vm_ids);
        }
      }
    );
  }

  componentWillUnmount() {
    const { resetPlanStateAction } = this.props;
    this.stopPolling();
    resetPlanStateAction();
  }

  startPolling(id) {
    const { fetchPlanRequestAction, fetchPlanRequestUrlBuilder } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchPlanRequestAction(fetchPlanRequestUrlBuilder, id);
    }, 15000);
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  render() {
    const {
      planName,
      isRejectedPlanRequest,
      isFetchingPlanRequest,
      planRequestPreviouslyFetched,
      isRejectedPlan,
      isFetchingPlan,
      isQueryingVms,
      isRejectedVms
    } = this.props;

    const {
      planRequestTasksMutable,
      vmsMutable,
      planNotStarted,
      planFinished
    } = this.state;

    return (
      <React.Fragment>
        <Toolbar>
          <Breadcrumb.Item href="/dashboard/maintab?tab=compute">
            {__('Compute')}
          </Breadcrumb.Item>
          <li>
            <Link to="/migration">{__('Migration')}</Link>
          </li>
          {!isRejectedPlan &&
            planName && <Breadcrumb.Item active>{planName}</Breadcrumb.Item>}
        </Toolbar>

        <Spinner
          loading={
            (isFetchingPlan || isFetchingPlanRequest || isQueryingVms) &&
            !planRequestPreviouslyFetched
          }
        >
          {!planNotStarted &&
            planRequestPreviouslyFetched &&
            !isRejectedPlanRequest &&
            planRequestTasksMutable.length > 0 && (
              <PlanRequestDetailList
                planFinished={planFinished}
                planRequestTasks={planRequestTasksMutable}
              />
            )}
          {!planNotStarted &&
            planRequestPreviouslyFetched &&
            planRequestTasksMutable.length === 0 && (
              <PlanEmptyState
                title="No Migration Tasks."
                iconType="pf"
                iconName="warning-triangle-o"
                description="No VM migration tasks have been started for this plan. Please refresh and try again."
              />
            )}
          {planNotStarted &&
            !isRejectedVms &&
            vmsMutable.length > 0 && <PlanVmsList planVms={vmsMutable} />}
          {planNotStarted &&
            vmsMutable.length === 0 && (
              <PlanEmptyState
                title="No VMs"
                iconType="pf"
                iconName="warning-triangle-o"
                description="No VMs were returned for this migration plan. Please refresh and try again."
              />
            )}
        </Spinner>
        {(isRejectedPlanRequest || isRejectedPlan || isRejectedVms) && (
          <PlanEmptyState
            title="Unable to retrieve migration details."
            iconType="pf"
            iconName="error-circle-o"
            description="Sorry, we were unable to retrieve migration details at this time. Please refresh and try again."
          />
        )}
      </React.Fragment>
    );
  }
}
Plan.propTypes = {
  fetchPlanRequestUrlBuilder: PropTypes.func.isRequired,
  fetchPlanRequestAction: PropTypes.func.isRequired,
  planName: PropTypes.string,
  planRequestTasks: PropTypes.array,
  isRejectedPlanRequest: PropTypes.bool,
  isFetchingPlanRequest: PropTypes.bool,
  planRequestPreviouslyFetched: PropTypes.bool,
  errorPlanRequest: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  fetchPlanUrlBuilder: PropTypes.func,
  fetchPlanAction: PropTypes.func,
  isFetchingPlan: PropTypes.bool,
  isRejectedPlan: PropTypes.bool,
  planId: PropTypes.string,
  queryPlanVmsAction: PropTypes.func,
  isQueryingVms: PropTypes.bool,
  isRejectedVms: PropTypes.bool,
  resetPlanStateAction: PropTypes.func
};
Plan.defaultProps = {
  planName: '',
  planRequestTasks: [],
  isRejectedPlanRequest: false,
  isFetchingPlanRequest: false,
  planRequestPreviouslyFetched: false,
  errorPlanRequest: null
};
export default Plan;
