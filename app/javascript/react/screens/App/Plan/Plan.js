import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Link } from 'react-router-dom';
import { bindMethods, Breadcrumb, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import PlanRequestDetailList from './components/PlanRequestDetailList';
import PlanEmptyState from './components/PlanEmptyState';

class Plan extends React.Component {
  // need to update ui-classic to React 16.3 to support this
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.planRequestTasks === prevState.planRequestTasks) {
  //     return null;
  //   }
  //   return {
  //     planRequestTasks,
  //     planRequestTasksMutable: Immutable.asMutable(planRequestTasks)
  //   };
  // }

  constructor(props) {
    super(props);

    this.state = {
      planRequestTasksMutable: Immutable.asMutable(props.planRequestTasks)
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
          this.startPolling(planRequestId);
        } else {
          queryPlanVmsAction(vm_ids);
        }
      }
    );
  }

  // Remove this after updating to 16.3
  componentDidUpdate(prevProps) {
    const { planRequestTasks } = this.props;
    if (prevProps.planRequestTasks !== planRequestTasks) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        planRequestTasksMutable: Immutable.asMutable(planRequestTasks)
      });
    }
  }

  componentWillUnmount() {
    this.stopPolling();
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
      isRejectedPlan
    } = this.props;

    const { planRequestTasksMutable } = this.state;

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
            isFetchingPlanRequest &&
            !planRequestPreviouslyFetched &&
            !isRejectedPlanRequest
          }
        >
          {planRequestPreviouslyFetched &&
            !isRejectedPlanRequest &&
            planRequestTasksMutable.length > 0 && (
              <PlanRequestDetailList
                planRequestTasks={planRequestTasksMutable}
              />
            )}
          {planRequestPreviouslyFetched &&
            planRequestTasksMutable.length === 0 && (
              <PlanEmptyState
                title="No Migration Tasks."
                iconType="pf"
                iconName="warning-triangle-o"
                description="No VM migration tasks have been started for this plan. Please refresh and try again."
              />
            )}
        </Spinner>
        {isRejectedPlanRequest && (
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
  isRejectedPlan: PropTypes.bool,
  planId: PropTypes.string,
  queryPlanVmsAction: PropTypes.func
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
