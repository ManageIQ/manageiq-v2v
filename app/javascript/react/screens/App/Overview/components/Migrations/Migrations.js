import React from 'react';
import PropTypes from 'prop-types';
import { noop, DropdownButton, Grid, Icon, MenuItem } from 'patternfly-react';
import MigrationsInProgressCards from './MigrationsInProgressCards';
import MigrationsNotStartedList from './MigrationsNotStartedList';
import MigrationsCompletedList from './MigrationsCompletedList';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';

const Migrations = ({
  activeFilter,
  setActiveFilter,
  transformationPlans,
  allRequestsWithTasks,
  reloadCard,
  notStartedPlans,
  activeTransformationPlans,
  createMigrationPlanClick,
  createTransformationPlanRequestClick,
  isCreatingTransformationPlanRequest,
  finishedTransformationPlans,
  redirectTo
}) => {
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
              onSelect={eventKey => {
                setActiveFilter(eventKey);
              }}
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
            description={__(
              'Create a migration plan to select VMs for migration.'
            )}
            buttonText={__('Create Migration Plan')}
          />
        )}
      </Grid.Col>
      {transformationPlans.length > 0 && (
        <React.Fragment>
          {activeFilter === 'Migration Plans Not Started' && (
            <MigrationsNotStartedList
              notStartedPlans={notStartedPlans}
              migrateClick={createTransformationPlanRequestClick}
              loading={isCreatingTransformationPlanRequest}
              redirectTo={redirectTo}
            />
          )}
          {activeFilter === 'Migration Plans in Progress' && (
            <MigrationsInProgressCards
              activeTransformationPlans={activeTransformationPlans}
              allRequestsWithTasks={allRequestsWithTasks}
              reloadCard={reloadCard}
              loading={isCreatingTransformationPlanRequest !== null}
              redirectTo={redirectTo}
            />
          )}
          {activeFilter === 'Migration Plans Completed' && (
            <MigrationsCompletedList
              finishedTransformationPlans={finishedTransformationPlans}
              allRequestsWithTasks={allRequestsWithTasks}
              retryClick={createTransformationPlanRequestClick}
              loading={isCreatingTransformationPlanRequest}
              redirectTo={redirectTo}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Migrations.propTypes = {
  activeFilter: PropTypes.string,
  setActiveFilter: PropTypes.func,
  transformationPlans: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
  notStartedPlans: PropTypes.array,
  activeTransformationPlans: PropTypes.array,
  createMigrationPlanClick: PropTypes.func,
  createTransformationPlanRequestClick: PropTypes.func,
  isCreatingTransformationPlanRequest: PropTypes.string,
  finishedTransformationPlans: PropTypes.array,
  redirectTo: PropTypes.func
};
Migrations.defaultProps = {
  transformationPlans: [],
  notStartedPlans: [],
  activeTransformationPlans: [],
  createMigrationPlanClick: noop,
  createTransformationPlanRequestClick: noop,
  isCreatingTransformationPlanRequest: '',
  finishedTransformationPlans: []
};
export default Migrations;
