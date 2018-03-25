import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods, Grid, CardGrid } from 'patternfly-react';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingCard from './components/Cards/InfrastructureMappingCard/InfrastructureMappingCard';
import componentRegistry from '../../../../components/componentRegistry';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    bindMethods(this, ['getNodes']);

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
      fetchMigrationsInProgressAction,
      fetchMigrationsCompletedAction
    } = this.props;

    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    fetchMigrationsInProgressAction();
    fetchMigrationsCompletedAction();
  }

  componentWillReceiveProps(nextProps) {
    const {
      isContinuingToPlan,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
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
  }

  getNodes(equalizerComponent, equalizerElement) {
    return [this.node1, this.node2];
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
  fetchMigrationsInProgressAction: PropTypes.func,
  transformationMappings: PropTypes.array,
  isFetchingTransformationMappings: PropTypes.bool,
  isRejectedTransformationMappings: PropTypes.bool,
  isContinuingToPlan: PropTypes.bool,
  planWizardId: PropTypes.string,
  continueToPlanAction: PropTypes.func,
  shouldReloadMappings: PropTypes.bool
};
export default Overview;
