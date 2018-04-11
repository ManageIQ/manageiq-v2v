import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Link } from 'react-router-dom';
import { bindMethods, Breadcrumb, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import PlanRequestDetailList from './components/PlanRequestDetailList';

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

    this.state = { planRequestTasksMutable: [] };

    bindMethods(this, ['stopPolling', 'startPolling']);
  }

  componentDidMount() {
    const { fetchPlanRequestsUrl, fetchPlanRequestsAction } = this.props;
    fetchPlanRequestsAction(fetchPlanRequestsUrl);
    this.startPolling();
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

  startPolling() {
    const { fetchPlanRequestsAction, fetchPlanRequestsUrl } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchPlanRequestsAction(fetchPlanRequestsUrl);
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
      isRejectedPlanRequests,
      isFetchingPlanRequests,
      planRequestsPreviouslyFetched
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
          {planRequestsPreviouslyFetched &&
            !isRejectedPlanRequests &&
            planName && <Breadcrumb.Item active>{planName}</Breadcrumb.Item>}
        </Toolbar>

        <Spinner
          loading={isFetchingPlanRequests && !planRequestsPreviouslyFetched}
        >
          {planRequestsPreviouslyFetched &&
            !isRejectedPlanRequests &&
            planRequestTasksMutable.length > 0 && (
              <PlanRequestDetailList
                planRequestTasks={planRequestTasksMutable}
              />
            )}
        </Spinner>
      </React.Fragment>
    );
  }
}
Plan.propTypes = {
  fetchPlanRequestsUrl: PropTypes.string.isRequired,
  fetchPlanRequestsAction: PropTypes.func.isRequired,
  planName: PropTypes.string,
  planRequestTasks: PropTypes.array,
  isRejectedPlanRequests: PropTypes.bool,
  isFetchingPlanRequests: PropTypes.bool,
  planRequestsPreviouslyFetched: PropTypes.bool,
  errorPlanRequests: PropTypes.object // eslint-disable-line react/no-unused-prop-types
};
Plan.defaultProps = {
  planName: '',
  planRequestTasks: [],
  isRejectedPlanRequests: false,
  isFetchingPlanRequests: false,
  planRequestsPreviouslyFetched: false,
  errorPlanRequests: null
};
export default Plan;
