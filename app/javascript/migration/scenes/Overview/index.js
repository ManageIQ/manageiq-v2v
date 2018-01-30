import React from 'react';
import Equalizer from 'react-equalizer';
import { Button, EmptyState, Grid } from 'patternfly-react';
import { bindMethods } from '../../../common/helpers';
import componentRegistry from '../../../components/componentRegistry';

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      showMappingWizard: false,
      mappingWizardVisible: false,
      showPlanWizard: false,
      planWizardVisible: false
    };
    bindMethods(this, [
      'getNodes',
      'mappingWizardOpened',
      'mappingWizardClosed',
      'mappingWizardExited',
      'planWizardOpened',
      'planWizardClosed',
      'planWizardExited'
    ]);
  }
  getNodes(equalizerComponent, equalizerElement) {
    return [this.node1, this.node2];
  }
  mappingWizardOpened() {
    this.setState({ showMappingWizard: true, mappingWizardVisible: true });
  }
  mappingWizardClosed() {
    this.setState({ showMappingWizard: false });
  }
  mappingWizardExited() {
    this.setState({ mappingWizardVisible: false });
  }
  planWizardOpened() {
    this.setState({ showPlanWizard: true, planWizardVisible: true });
  }
  planWizardClosed() {
    this.setState({ showPlanWizard: false });
  }
  planWizardExited() {
    this.setState({ planWizardVisible: false });
  }
  render() {
    const {
      showMappingWizard,
      mappingWizardVisible,
      showPlanWizard,
      planWizardVisible
    } = this.state;

    const mappingWizard = componentRegistry.markupWithProps(
      'MappingWizardContainer',
      {
        showWizard: showMappingWizard,
        onHide: this.mappingWizardClosed,
        onExit: this.mappingWizardExited
      }
    );

    const planWizard = componentRegistry.markupWithProps(
      'PlanWizardContainer',
      {
        showWizard: showPlanWizard,
        onHide: this.planWizardClosed,
        onExit: this.planWizardExited
      }
    );

    const overviewCards = (
      <div
        className="row cards-pf"
        ref={n => (this.mainContent = n)}
        style={{ overflow: 'auto', paddingBottom: 100, height: '100%' }}
      >
        <Grid.Col md={12}>
          <Grid.Row>
            <Equalizer nodes={this.getNodes}>
              <Grid.Col xs={6}>
                <div className="spacer" />
                <div className="card-pf">
                  <div className="card-pf-body">
                    <div className="blank-slate-pf" ref={n => (this.node1 = n)}>
                      <EmptyState.Icon />
                      <EmptyState.Title>
                        Infrastructure Mappings
                      </EmptyState.Title>
                      <EmptyState.Info>
                        Create mapping to later be used by a migration plan.
                      </EmptyState.Info>
                      <EmptyState.Action>
                        <Button
                          bsStyle="primary"
                          bsSize="large"
                          onClick={this.mappingWizardOpened}
                        >
                          Create Infrastructure Mapping
                        </Button>
                      </EmptyState.Action>
                    </div>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col xs={6}>
                <div className="spacer" />
                <div className="card-pf">
                  <div className="card-pf-body">
                    <div className="blank-slate-pf" ref={n => (this.node2 = n)}>
                      <EmptyState.Icon />
                      <EmptyState.Title>Migration Plans</EmptyState.Title>
                      <EmptyState.Info>
                        Create a migration plan to start migrating.
                      </EmptyState.Info>
                      <EmptyState.Action>
                        <Button
                          bsStyle="primary"
                          bsSize="large"
                          onClick={this.planWizardOpened}
                        >
                          Create Migration Plan
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
        {mappingWizardVisible && mappingWizard}
        {planWizardVisible && planWizard}
      </React.Fragment>
    );
  }
}
export default Overview;
