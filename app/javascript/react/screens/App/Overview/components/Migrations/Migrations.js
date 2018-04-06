import React from 'react';
import PropTypes from 'prop-types';
import { noop, DropdownButton, Grid, Icon, MenuItem } from 'patternfly-react';
import MigrationsInProgressCard from '../Cards/MigrationsInProgressCard';
import MigrationsNotStartedList from './MigrationsNotStartedList';
import MigrationsCompletedList from './MigrationsCompletedList';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';

class Migrations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: 'Migration Plans Not Started'
    };
  }
  onSelect = eventKey => {
    this.setState({ activeFilter: eventKey });
  };
  render() {
    const { transformationPlans, createMigrationPlanClick } = this.props;
    const { activeFilter } = this.state;
    const filterOptions = [
      'Migration Plans Not Started',
      'Migration Plans in Progress',
      'Migration Plans Completed'
    ];

    return (
      <React.Fragment>
        <Grid.Col xs={12}>
          <div className="heading-with-link-container">
            <div className="pull-left">
              <h3>{__('Migrations')}</h3>
            </div>
            <div className="pull-right">
              {/** todo: create IconLink in patternfly-react * */}
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  createMigrationPlanClick();
                }}
              >
                <Icon type="pf" name="add-circle-o" />
                &nbsp;{__('Create Migration Plan')}
              </a>
            </div>
          </div>
          <hr style={{ borderTopColor: '#d1d1d1' }} />
          {transformationPlans.length > 0 ? (
            <div style={{ marginBottom: 15 }}>
              <DropdownButton
                bsStyle="default"
                title={sprintf('%s', activeFilter)}
                id="dropdown-filter"
                onSelect={this.onSelect}
              >
                {filterOptions.map((filter, i) => (
                  <MenuItem
                    eventKey={filter}
                    active={filter === activeFilter}
                    key={i}
                  >
                    {sprintf('%s', filter)}
                  </MenuItem>
                ))}
              </DropdownButton>
            </div>
          ) : (
            <OverviewEmptyState
              showWizardAction={createMigrationPlanClick}
              description="Create a migration plan to select VMs for migration."
              buttonText="Create Migration Plan"
            />
          )}
        </Grid.Col>
        {transformationPlans.length > 0 && (
          <React.Fragment>
            {activeFilter === 'Migration Plans Not Started' && (
              <MigrationsNotStartedList />
            )}
            {activeFilter === 'Migration Plans in Progress' && (
              <MigrationsInProgressCard />
            )}
            {activeFilter === 'Migration Plans Completed' && (
              <MigrationsCompletedList />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
Migrations.propTypes = {
  transformationPlans: PropTypes.array,
  createMigrationPlanClick: PropTypes.func
};
Migrations.defaultProps = {
  createMigrationPlanClick: noop
};
export default Migrations;
