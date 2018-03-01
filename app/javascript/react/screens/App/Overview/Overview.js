import React from 'react';
import PropTypes from 'prop-types';
import Equalizer from 'react-equalizer';
import { bindMethods, Grid } from 'patternfly-react';
import InfrastructureMappingCard from './components/Cards/InfrastructureMappingCard/InfrastructureMappingCard';
import MigrationPlansCard from './components/Cards/MigrationPlansCard/MigrationPlansCard';
import MigrationsInProgressCard from './components/Cards/MigrationsInProgressCard/MigrationsInProgressCard';
import MigrationsCompletedCard from './components/Cards/MigrationsCompletedCard/MigrationsCompletedCard';
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
      fetchTransformationMappingsAction
    } = this.props;

    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
  }

  componentWillReceiveProps(nextProps) {
    const {
      isContinuingToPlan,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      planWizardId,
      continueToPlanAction
    } = this.props;
    if (
      isContinuingToPlan !== nextProps.isContinuingToPlan &&
      nextProps.isContinuingToPlan
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
      showPlanWizardAction,
      mappingWizardVisible,
      planWizardVisible,
      transformationMappings,
      isFetchingTransformationMappings, // eslint-disable-line no-unused-vars
      isRejectedTransformationMappings // eslint-disable-line no-unused-vars
    } = this.props;

    const showPlanEnabled =
      transformationMappings && transformationMappings.length;

    const overviewCards = (
      <div
        className="row cards-pf"
        ref={n => (this.mainContent = n)}
        style={{ overflow: 'auto', paddingBottom: 100, height: '100%' }}
      >
        <Grid.Col md={12}>
          <Grid.Row>
            <div className="spacer" />
            <Equalizer nodes={this.getNodes}>
              <Grid.Col xs={12} md={6}>
                <InfrastructureMappingCard
                  cardRef={n => (this.node1 = n)}
                  showMappingWizardAction={showMappingWizardAction}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={6}>
                <MigrationPlansCard
                  cardRef={n => (this.node2 = n)}
                  showPlanWizardAction={showPlanWizardAction}
                  showPlanDisabled={!showPlanEnabled}
                />
              </Grid.Col>
            </Equalizer>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col xs={12}>
              <MigrationsInProgressCard />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col xs={12}>
              <MigrationsCompletedCard />
              <div className="spacer" />
            </Grid.Col>
          </Grid.Row>
        </Grid.Col>
      </div>
    );

    return (
      <React.Fragment>
        {overviewCards}
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
  transformationMappings: PropTypes.array,
  isFetchingTransformationMappings: PropTypes.bool,
  isRejectedTransformationMappings: PropTypes.bool,
  isContinuingToPlan: PropTypes.bool,
  planWizardId: PropTypes.string,
  continueToPlanAction: PropTypes.func
};
export default Overview;
