import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods, Grid, CardGrid } from 'patternfly-react';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingCard from './components/Cards/InfrastructureMappingCard/InfrastructureMappingCard';
import componentRegistry from '../../../../components/componentRegistry';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    bindMethods(this, ['getNodes', 'stopPolling', 'startPolling']);

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
      fetchTransformationPlanRequestsAction
    } = this.props;

    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    fetchTransformationPlanRequestsAction(fetchTransformationPlanRequestsUrl);

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

  getNodes(equalizerComponent, equalizerElement) {
    return [this.node1, this.node2];
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
      showPlanWizardAction, // eslint-disable-line no-unused-vars
      mappingWizardVisible,
      planWizardVisible,
      transformationMappings, // eslint-disable-line no-unused-vars
      isFetchingTransformationMappings, // eslint-disable-line no-unused-vars
      isRejectedTransformationMappings // eslint-disable-line no-unused-vars
    } = this.props;

    const aggregateDataCards = (
      <CardGrid matchHeight>
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

    return (
      <React.Fragment>
        <div
          className="row cards-pf"
          style={{ overflow: 'auto', paddingBottom: 100, height: '100%' }}
        >
          <Grid.Col md={12}>
            <Grid.Row>
              <Grid.Col xs={12}>{aggregateDataCards}</Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <div className="spacer" />
              <Grid.Col xs={12}>
                <InfrastructureMappingCard
                  cardRef={n => (this.node1 = n)}
                  showMappingWizardAction={showMappingWizardAction}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
        </div>
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
  fetchTransformationMappingsUrl: PropTypes.string,
  fetchTransformationMappingsAction: PropTypes.func,
  fetchTransformationPlanRequestsUrl: PropTypes.string,
  fetchTransformationPlanRequestsAction: PropTypes.func,
  transformationMappings: PropTypes.array,
  isFetchingTransformationMappings: PropTypes.bool,
  isRejectedTransformationMappings: PropTypes.bool,
  isContinuingToPlan: PropTypes.bool,
  planWizardId: PropTypes.string,
  continueToPlanAction: PropTypes.func,
  shouldReloadMappings: PropTypes.bool
};
export default Overview;
