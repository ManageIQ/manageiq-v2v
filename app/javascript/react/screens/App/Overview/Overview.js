import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods, Breadcrumb, CardGrid, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingsList from './components/InfrastructureMappingsList/InfrastructureMappingsList';
import Migrations from './components/Migrations/Migrations';
import componentRegistry from '../../../../components/componentRegistry';

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
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction
    } = this.props;

    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    fetchTransformationPlansAction(fetchTransformationPlansUrl);

    this.startPolling();
  }

  componentWillReceiveProps(nextProps) {
    const {
      isContinuingToPlan,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction,
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
      fetchTransformationPlansAction(fetchTransformationPlansUrl);
      this.startPolling();
    }
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling() {
    const {
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl
    } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchTransformationPlansAction(fetchTransformationPlansUrl);
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
      isFetchingTransformationPlans, // eslint-disable-line no-unused-vars
      pendingTransformationPlans,
      activeTransformationPlans
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
            <AggregateCards.PendingTransformationPlans
              pendingPlans={pendingTransformationPlans}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.ActiveTransformationPlans
              activePlans={activeTransformationPlans}
            />
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
          {transformationMappings.length > 0 && (
            <Migrations
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

    const toolbarContent = (
      <Toolbar>
        <Breadcrumb.Item href="/dashboard/maintab?tab=compute">
          Compute
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Migration</Breadcrumb.Item>
      </Toolbar>
    );

    return (
      <React.Fragment>
        {toolbarContent}
        {overviewContent}
        {mappingWizardVisible && this.mappingWizard}
        {planWizardVisible && this.planWizard}
      </React.Fragment>
    );
  }
}
Overview.propTypes = {
  store: PropTypes.object,
  showMappingWizardAction: PropTypes.func,
  showPlanWizardAction: PropTypes.func,
  mappingWizardVisible: PropTypes.bool,
  planWizardVisible: PropTypes.bool,
  transformationPlans: PropTypes.array,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchTransformationPlansAction: PropTypes.func,
  isFetchingTransformationPlans: PropTypes.bool,
  pendingTransformationPlans: PropTypes.array,
  activeTransformationPlans: PropTypes.array,
  transformationMappings: PropTypes.array,
  fetchTransformationMappingsUrl: PropTypes.string,
  fetchTransformationMappingsAction: PropTypes.func,
  isFetchingTransformationMappings: PropTypes.bool,
  isRejectedTransformationMappings: PropTypes.bool,
  isContinuingToPlan: PropTypes.bool,
  planWizardId: PropTypes.string,
  continueToPlanAction: PropTypes.func,
  shouldReloadMappings: PropTypes.bool
};
export default Overview;
