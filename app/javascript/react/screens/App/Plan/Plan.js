import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Link } from 'react-router-dom';
import { bindMethods, Breadcrumb, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import PlanRequestDetailList from './components/PlanRequestDetailList/PlanRequestDetailList';
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
      planNotStarted: nextProps.planRequestTasks.length === 0,
      planRequestPreviouslyFetched: nextProps.planRequestPreviouslyFetched
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      planRequestTasksMutable: Immutable.asMutable(props.planRequestTasks),
      vmsMutable: [],
      planNotStarted: false,
      planFinished: false,
      planRequestPreviouslyFetched: false
    };

    this.props.resetPlanStateAction();

    bindMethods(this, ['stopPolling', 'startPolling']);
  }

  componentDidMount() {
    const {
      fetchPlanUrl,
      fetchPlanAction,
      planId,
      fetchPlanRequestUrl,
      fetchPlanRequestAction,
      queryPlanVmsAction
    } = this.props;

    fetchPlanAction(fetchPlanUrl, planId).then(({ value: { data: plan } }) => {
      const {
        miq_requests,
        options: {
          config_info: { vm_ids }
        }
      } = plan;

      if (miq_requests.length > 0) {
        const mostRecentRequest = miq_requests.reduce(
          (prev, current) =>
            prev.updated_on > current.updated_on ? prev : current
        );
        const planRequestId = mostRecentRequest.id;
        fetchPlanRequestAction(fetchPlanRequestUrl, planRequestId);
        if (mostRecentRequest.status === 'active') {
          this.startPolling(planRequestId);
        } else if (
          mostRecentRequest.request_state === 'finished' ||
          mostRecentRequest.status === 'Error'
        ) {
          this.setState(() => ({
            planFinished: true
          }));
        }
      } else {
        queryPlanVmsAction(vm_ids);
      }
    });
  }

  componentWillUnmount() {
    const { resetPlanStateAction } = this.props;
    this.stopPolling();
    resetPlanStateAction();
  }

  startPolling(id) {
    const { fetchPlanRequestAction, fetchPlanRequestUrl } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchPlanRequestAction(fetchPlanRequestUrl, id);
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
      isRejectedPlan,
      isFetchingPlan,
      isQueryingVms,
      isRejectedVms,
      downloadLogAction,
      isFetchingMigrationTaskLog,
      addNotificationAction
    } = this.props;

    const {
      planRequestTasksMutable,
      vmsMutable,
      planNotStarted,
      planFinished,
      planRequestPreviouslyFetched
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
                downloadLogAction={downloadLogAction}
                isFetchingMigrationTaskLog={isFetchingMigrationTaskLog}
                addNotificationAction={addNotificationAction}
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
  fetchPlanRequestUrl: PropTypes.string.isRequired,
  fetchPlanRequestAction: PropTypes.func.isRequired,
  planName: PropTypes.string,
  planRequestTasks: PropTypes.array,
  isRejectedPlanRequest: PropTypes.bool,
  isFetchingPlanRequest: PropTypes.bool,
  planRequestPreviouslyFetched: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  errorPlanRequest: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  fetchPlanUrl: PropTypes.string,
  fetchPlanAction: PropTypes.func,
  isFetchingPlan: PropTypes.bool,
  isRejectedPlan: PropTypes.bool,
  planId: PropTypes.string,
  queryPlanVmsAction: PropTypes.func,
  isQueryingVms: PropTypes.bool,
  isRejectedVms: PropTypes.bool,
  resetPlanStateAction: PropTypes.func,
  downloadLogAction: PropTypes.func,
  isFetchingMigrationTaskLog: PropTypes.bool,
  addNotificationAction: PropTypes.func
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
