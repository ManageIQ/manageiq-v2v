import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods, CardGrid, Spinner } from 'patternfly-react';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingsList from './components/InfrastructureMappingsList/InfrastructureMappingsList';
import Migrations from './components/Migrations/Migrations';
import componentRegistry from '../../../../components/componentRegistry';

import { planRequestsWithPlanIds } from './helpers';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    bindMethods(this, ['stopPolling', 'startPolling']);

    this.mappingWizard = componentRegistry.markup(
      'MappingWizardContainer',
      props.store
    );
    this.planWizard = componentRegistry.markup(
      'PlanWizardContainer',
      props.store
    );
  }

  componentDidMount() {
    const {
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlanRequestsUrl,
      fetchTransformationPlanRequestsAction,
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction
    } = this.props;

    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    fetchTransformationPlanRequestsAction(fetchTransformationPlanRequestsUrl);
    fetchTransformationPlansAction(fetchTransformationPlansUrl);

    this.startPolling();
  }

  componentWillReceiveProps(nextProps) {
    const {
      isContinuingToPlan,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlanRequestsUrl,
      fetchTransformationPlanRequestsAction,
      planWizardId,
      continueToPlanAction,
      shouldReloadMappings
    } = this.props;

    if (
      shouldReloadMappings !== nextProps.shouldReloadMappings &&
      nextProps.shouldReloadMappings
    ) {
      // refetech our mappings so that plan wizard has this newly created mapping
      fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    } else if (
      isContinuingToPlan !== nextProps.isContinuingToPlan &&
      !nextProps.isContinuingToPlan
    ) {
      continueToPlanAction(planWizardId);
    }

    // kill interval if a wizard becomes visble
    if (nextProps.mappingWizardVisible || nextProps.planWizardVisible) {
      this.stopPolling();
    } else if (
      !nextProps.mappingWizardVisible &&
      !nextProps.planWizardVisible &&
      !this.pollingInterval
    ) {
      fetchTransformationPlanRequestsAction(fetchTransformationPlanRequestsUrl);
      this.startPolling();
    }
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling() {
    const {
      fetchTransformationPlanRequestsAction,
      fetchTransformationPlanRequestsUrl
    } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchTransformationPlanRequestsAction(fetchTransformationPlanRequestsUrl);
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
      showMappingWizardAction,
      showPlanWizardAction,
      mappingWizardVisible,
      planWizardVisible,
      transformationMappings,
      isFetchingTransformationMappings,
      isRejectedTransformationMappings, // eslint-disable-line no-unused-vars
      transformationPlans,
      isFetchingTransformationPlans,
      activeTransformationPlanRequests,
      completeTransformationPlanRequests,
      pendingTransformationPlans
    } = this.props;

    const aggregateDataCards = (
      <CardGrid
        matchHeight
        style={{
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <CardGrid.Row>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.MigrationsNotStarted />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.MigrationsInProgress />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.MigrationsComplete />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.InfrastructureMappings />
          </CardGrid.Col>
        </CardGrid.Row>
      </CardGrid>
    );

    const overviewContent = (
      <div
        className="row cards-pf"
        style={{ overflow: 'auto', paddingBottom: 1, height: '100%' }}
      >
        {aggregateDataCards}
        <Spinner loading={isFetchingTransformationMappings}>
          {!isFetchingTransformationPlans &&
            transformationMappings.length > 0 && (
              <Migrations
                activeTransformationPlanRequests={planRequestsWithPlanIds(
                  activeTransformationPlanRequests,
                  transformationPlans
                )}
                completeTransformationPlanRequests={
                  completeTransformationPlanRequests
                }
                pendingTransformationPlans={pendingTransformationPlans}
                transformationPlans={transformationPlans}
                createMigrationPlanClick={showPlanWizardAction}
              />
            )}
          <InfrastructureMappingsList
            transformationMappings={transformationMappings}
            createInfraMappingClick={showMappingWizardAction}
          />
        </Spinner>
      </div>
    );

    return (
      <React.Fragment>
        {overviewContent}
        {mappingWizardVisible && this.mappingWizard}
        {planWizardVisible && this.planWizard}
      </React.Fragment>
    );
  }
}
Overview.propTypes = {
  activeTransformationPlanRequests: PropTypes.array,
  completeTransformationPlanRequests: PropTypes.array,
  pendingTransformationPlans: PropTypes.array,
  store: PropTypes.object,
  showMappingWizardAction: PropTypes.func,
  showPlanWizardAction: PropTypes.func,
  mappingWizardVisible: PropTypes.bool,
  planWizardVisible: PropTypes.bool,
  fetchTransformationMappingsUrl: PropTypes.string,
  fetchTransformationMappingsAction: PropTypes.func,
  fetchTransformationPlanRequestsUrl: PropTypes.string,
  fetchTransformationPlanRequestsAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchTransformationPlansAction: PropTypes.func,
  transformationMappings: PropTypes.array,
  isFetchingTransformationMappings: PropTypes.bool,
  isRejectedTransformationMappings: PropTypes.bool,
  transformationPlans: PropTypes.array,
  isFetchingTransformationPlans: PropTypes.bool,
  isContinuingToPlan: PropTypes.bool,
  planWizardId: PropTypes.string,
  continueToPlanAction: PropTypes.func,
  shouldReloadMappings: PropTypes.bool
};
export default Overview;
