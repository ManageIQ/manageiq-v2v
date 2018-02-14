import React from 'react';
import PropTypes from 'prop-types';
import Equalizer from 'react-equalizer';
import { bindMethods, Button, EmptyState, Grid } from 'patternfly-react';
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
  getNodes(equalizerComponent, equalizerElement) {
    return [this.node1, this.node2];
  }
  render() {
    const {
      showMappingWizardAction,
      showPlanWizardAction,
      mappingWizardVisible,
      planWizardVisible
    } = this.props;

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
                <div className="card-pf">
                  <div className="card-pf-body">
                    <div className="blank-slate-pf" ref={n => (this.node1 = n)}>
                      <EmptyState.Icon />
                      <EmptyState.Title>
                        {__('Infrastructure Mappings')}
                      </EmptyState.Title>
                      <EmptyState.Info>
                        {__(
                          'Create mapping to later be used by a migration plan.'
                        )}
                      </EmptyState.Info>
                      <EmptyState.Action>
                        <Button
                          bsStyle="primary"
                          bsSize="large"
                          onClick={showMappingWizardAction}
                        >
                          {__('Create Infrastructure Mapping')}
                        </Button>
                      </EmptyState.Action>
                    </div>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col xs={12} md={6}>
                <div className="card-pf">
                  <div className="card-pf-body">
                    <div className="blank-slate-pf" ref={n => (this.node2 = n)}>
                      <EmptyState.Icon />
                      <EmptyState.Title>
                        {__('Migration Plans')}
                      </EmptyState.Title>
                      <EmptyState.Info>
                        {__('Create a migration plan to start migrating.')}
                      </EmptyState.Info>
                      <EmptyState.Action>
                        <Button
                          bsStyle="primary"
                          bsSize="large"
                          onClick={showPlanWizardAction}
                        >
                          {__('Create Migration Plan')}
                        </Button>
                      </EmptyState.Action>
                    </div>
                  </div>
                </div>
              </Grid.Col>
            </Equalizer>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col xs={12}>
              <div className="card-pf">
                <div className="card-pf-heading">
                  <h2>0 Migrations in Progress</h2>
                </div>
                <div className="card-pf-body">
                  <p>content</p>
                </div>
              </div>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col xs={12}>
              <div className="card-pf">
                <div className="card-pf-heading">
                  <h2>0 Completed Migrations</h2>
                </div>
                <div className="card-pf-body">
                  <p>content</p>
                </div>
              </div>
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
  planWizardVisible: PropTypes.bool
};
export default Overview;
