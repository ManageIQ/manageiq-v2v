import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindMethods, Breadcrumb, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import PlanRequestDetailList from './components/PlanRequestDetailList';

class Plan extends React.Component {
  constructor(props) {
    super(props);

    bindMethods(this, ['stopPolling', 'startPolling']);
  }

  componentDidMount() {
    const { fetchPlanRequestsUrl, fetchPlanRequestsAction } = this.props;
    fetchPlanRequestsAction(fetchPlanRequestsUrl);
    this.startPolling();
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
      planRequestTasks,
      isRejectedPlanRequests,
      isFetchingPlanRequests,
      planRequestsPreviouslyFetched
    } = this.props;

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

        <div style={{ overflow: 'auto', paddingBottom: 1, height: '100%' }}>
          <Spinner
            loading={isFetchingPlanRequests && !planRequestsPreviouslyFetched}
          >
            {planRequestsPreviouslyFetched &&
              !isRejectedPlanRequests &&
              planRequestTasks.length > 0 && (
                <PlanRequestDetailList planRequestTasks={planRequestTasks} />
              )}
          </Spinner>
        </div>
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
