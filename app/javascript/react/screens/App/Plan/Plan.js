import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Link } from 'react-router-dom';
import { Breadcrumb, Spinner, Icon } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import PlanRequestDetailList from './components/PlanRequestDetailList/PlanRequestDetailList';
import PlanVmsList from './components/PlanVmsList';
import PlanEmptyState from './components/PlanEmptyState';
import getMostRecentRequest from '../common/getMostRecentRequest';

class Plan extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.planNotStarted && nextProps.planRequestTasks === prevState.planRequestTasks) {
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
  }

  componentDidMount() {
    const {
      fetchPlanUrl,
      fetchPlanAction,
      planId,
      fetchTasksForAllRequestsForPlanUrl,
      fetchTasksForAllRequestsForPlanAction,
      queryPlanVmsAction
    } = this.props;

    fetchPlanAction(fetchPlanUrl, planId).then(({ value: { data: plan } }) => {
      const {
        miq_requests,
        options: {
          config_info: { actions }
        }
      } = plan;

      let vm_ids = [];
      if (actions && actions.length) {
        vm_ids = actions.map(a => a.vm_id);
      }

      if (miq_requests.length > 0) {
        const mostRecentRequest = getMostRecentRequest(miq_requests);
        fetchTasksForAllRequestsForPlanAction(fetchTasksForAllRequestsForPlanUrl, miq_requests);
        if (mostRecentRequest.request_state === 'active') {
          this.startPolling(miq_requests);
        } else {
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

  startPolling = requests => {
    const { fetchTasksForAllRequestsForPlanAction, fetchTasksForAllRequestsForPlanUrl } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchTasksForAllRequestsForPlanAction(fetchTasksForAllRequestsForPlanUrl, requests);
    }, 15000);
  };

  stopPolling = () => {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  };

  render() {
    const {
      plan,
      planName,
      planArchived,
      planRequestFailed,
      isRejectedPlanRequest,
      isFetchingPlanRequest,
      isRejectedPlan,
      isFetchingPlan,
      isQueryingVms,
      isRejectedVms,
      downloadLogAction,
      downloadLogInProgressTaskIds,
      fetchAnsiblePlaybookTemplateAction,
      fetchPlanUrl,
      ansiblePlaybookTemplate,
      fetchOrchestrationStackUrl,
      fetchOrchestrationStackAction,
      orchestrationStack,
      cancelPlanRequestTasksAction,
      cancelPlanRequestTasksUrl
    } = this.props;

    const {
      planRequestTasksMutable,
      vmsMutable,
      planNotStarted,
      planFinished,
      planRequestPreviouslyFetched
    } = this.state;

    const icons = {
      inProgress: <Icon type="pf" name="spinner2" />,
      success: <Icon type="pf" name="ok" />,
      failed: <Icon type="pf" name="error-circle-o" />,
      archived: <Icon type="fa" name="archive" />
    };
    const breadcrumbIcon =
      (planRequestFailed && icons.failed) ||
      (planArchived && icons.archived) ||
      (planFinished && icons.success) ||
      (!planNotStarted && icons.inProgress) ||
      null;

    return (
      <React.Fragment>
        <Toolbar>
          <Breadcrumb.Item href="/dashboard/maintab?tab=compute">{__('Compute')}</Breadcrumb.Item>
          <li>
            <Link to="/migration">{__('Migration')}</Link>
          </li>
          {!isRejectedPlan &&
            planName && (
              <Breadcrumb.Item active>
                {breadcrumbIcon}
                {breadcrumbIcon ? ` ${planName}` : planName}
              </Breadcrumb.Item>
            )}
        </Toolbar>

        <Spinner loading={(isFetchingPlan || isFetchingPlanRequest || isQueryingVms) && !planRequestPreviouslyFetched}>
          {!planNotStarted &&
            planRequestPreviouslyFetched &&
            !isRejectedPlanRequest &&
            planRequestTasksMutable.length > 0 && (
              <PlanRequestDetailList
                plan={plan}
                planFinished={planFinished}
                planRequestTasks={planRequestTasksMutable}
                downloadLogAction={downloadLogAction}
                downloadLogInProgressTaskIds={downloadLogInProgressTaskIds}
                fetchAnsiblePlaybookTemplateAction={fetchAnsiblePlaybookTemplateAction}
                fetchAnsiblePlaybookTemplateUrl={fetchPlanUrl}
                ansiblePlaybookTemplate={ansiblePlaybookTemplate}
                fetchOrchestrationStackUrl={fetchOrchestrationStackUrl}
                fetchOrchestrationStackAction={fetchOrchestrationStackAction}
                orchestrationStack={orchestrationStack}
                cancelPlanRequestTasksUrl={cancelPlanRequestTasksUrl}
                cancelPlanRequestTasksAction={cancelPlanRequestTasksAction}
              />
            )}
          {!planNotStarted &&
            planRequestPreviouslyFetched &&
            planRequestTasksMutable.length === 0 && (
              <PlanEmptyState
                title={__('No Migration Tasks.')}
                iconType="pf"
                iconName="warning-triangle-o"
                description={__('No VM migration tasks have been started for this plan. Please refresh and try again.')}
              />
            )}
          {planNotStarted && !isRejectedVms && vmsMutable.length > 0 && <PlanVmsList planVms={vmsMutable} />}
          {planNotStarted &&
            vmsMutable.length === 0 && (
              <PlanEmptyState
                title={__('No VMs')}
                iconType="pf"
                iconName="warning-triangle-o"
                description={__('No VMs were returned for this migration plan. Please refresh and try again.')}
              />
            )}
        </Spinner>
        {(isRejectedPlanRequest || isRejectedPlan || isRejectedVms) && (
          <PlanEmptyState
            title={__('Unable to retrieve migration details.')}
            iconType="pf"
            iconName="error-circle-o"
            description={
              __('Sorry, we were unable to retrieve migration details at this time. Please refresh and try again.') // prettier-ignore
            }
          />
        )}
      </React.Fragment>
    );
  }
}
Plan.propTypes = {
  fetchTasksForAllRequestsForPlanUrl: PropTypes.string.isRequired,
  fetchTasksForAllRequestsForPlanAction: PropTypes.func.isRequired,
  planName: PropTypes.string,
  planRequestFailed: PropTypes.bool,
  planArchived: PropTypes.bool,
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
  downloadLogInProgressTaskIds: PropTypes.array,
  plan: PropTypes.object,
  fetchAnsiblePlaybookTemplateAction: PropTypes.func,
  ansiblePlaybookTemplate: PropTypes.object,
  fetchOrchestrationStackUrl: PropTypes.string,
  fetchOrchestrationStackAction: PropTypes.func,
  orchestrationStack: PropTypes.object,
  cancelPlanRequestTasksAction: PropTypes.func,
  cancelPlanRequestTasksUrl: PropTypes.string
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
