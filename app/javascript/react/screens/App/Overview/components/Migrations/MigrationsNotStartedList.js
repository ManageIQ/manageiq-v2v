import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid, Icon, Spinner, Toolbar, Sort } from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import ScheduleMigrationModal from '../ScheduleMigrationModal/ScheduleMigrationModal';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import { MIGRATIONS_NOT_STARTED_SORT_FIELDS } from './MigrationsConstants';
import sortFilter from '../../../Plan/components/sortFilter';

class MigrationsNotStartedList extends React.Component {
  state = {
    sortFields: MIGRATIONS_NOT_STARTED_SORT_FIELDS,
    currentSortType: MIGRATIONS_NOT_STARTED_SORT_FIELDS[0],
    isSortNumeric: MIGRATIONS_NOT_STARTED_SORT_FIELDS[0].isNumeric,
    isSortAscending: true
  };

  sortedMigrations = () => {
    const { currentSortType, isSortNumeric, isSortAscending } = this.state;
    const { notStartedPlans } = this.props;

    return sortFilter(currentSortType, isSortNumeric, isSortAscending, notStartedPlans);
  };

  toggleCurrentSortDirection = () => {
    this.setState(prevState => ({
      isSortAscending: !prevState.isSortAscending
    }));
  };

  updateCurrentSortType = sortType => {
    const { currentSortType } = this.state;
    if (currentSortType !== sortType) {
      this.setState({
        currentSortType: sortType,
        isSortNumeric: sortType.isNumeric,
        isSortAscending: true
      });
    }
  };

  render() {
    const { sortFields, currentSortType, isSortNumeric, isSortAscending } = this.state;
    const {
      migrateClick,
      notStartedPlans,
      loading,
      redirectTo,
      showConfirmModalAction,
      hideConfirmModalAction,
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlanId,
      scheduleMigration,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl
    } = this.props;
    const sortedMigrations = this.sortedMigrations();

    return (
      <React.Fragment>
        <Grid.Col xs={12}>
          <Spinner loading={!!loading}>
            {notStartedPlans.length > 0 ? (
              <React.Fragment>
                <Grid.Row>
                  <Toolbar>
                    <Sort>
                      <Sort.TypeSelector
                        sortTypes={sortFields}
                        currentSortType={currentSortType}
                        onSortTypeSelected={this.updateCurrentSortType}
                      />
                      <Sort.DirectionSelector
                        isNumeric={isSortNumeric}
                        isAscending={isSortAscending}
                        onClick={this.toggleCurrentSortDirection}
                      />
                    </Sort>
                  </Toolbar>
                </Grid.Row>
                <ListView className="plans-not-started-list" style={{ marginTop: 0 }}>
                  {sortedMigrations.map(plan => {
                    const migrationScheduled = plan.schedules && plan.schedules[0].run_at.start_time;

                    const confirmationWarningText = (
                      <React.Fragment>
                        <p>
                          {sprintf(
                            __('Are you sure you want to unschedule plan %s  targted to run on %s ?'),
                            plan.name,
                            formatDateTime(migrationScheduled)
                          )}
                        </p>
                      </React.Fragment>
                    );

                    const confirmModalProps = {
                      title: __('Unschedule Migration Plan'),
                      body: confirmationWarningText,
                      icon: <Icon className="confirm-warning-icon" type="pf" name="warning-triangle-o" />,
                      confirmButtonLabel: __('Unschedule')
                    };

                    const onConfirm = () => {
                      scheduleMigration({
                        planId: plan.id,
                        scheduleId: plan.schedules[0].id
                      }).then(() => {
                        fetchTransformationPlansAction({
                          url: fetchTransformationPlansUrl,
                          archived: false
                        });
                      });
                      hideConfirmModalAction();
                    };

                    const confirmModalOptions = {
                      ...confirmModalProps,
                      onConfirm
                    };

                    return (
                      <ListView.Item
                        stacked
                        className="plans-not-started-list__list-item"
                        onClick={() => {
                          redirectTo(`/migration/plan/${plan.id}`);
                        }}
                        actions={
                          <div>
                            {!migrationScheduled && (
                              <Button
                                onClick={e => {
                                  e.stopPropagation();
                                  toggleScheduleMigrationModal({ planId: plan.id });
                                }}
                                disabled={loading === plan.href || plan.schedule_type}
                              >
                                {__('Schedule')}
                              </Button>
                            )}
                            {migrationScheduled && (
                              <Button
                                onClick={e => {
                                  e.stopPropagation();
                                  showConfirmModalAction(confirmModalOptions);
                                }}
                                disabled={loading === plan.href}
                              >
                                {__('Unschedule')}
                              </Button>
                            )}
                            <Button
                              onClick={e => {
                                e.stopPropagation();
                                migrateClick(plan.href);
                              }}
                              disabled={loading === plan.href || plan.schedule_type}
                            >
                              {__('Migrate')}
                            </Button>
                          </div>
                        }
                        leftContent={<div />}
                        heading={plan.name}
                        description={
                          <EllipsisWithTooltip id={plan.description}>
                            <React.Fragment>{plan.description}</React.Fragment>
                          </EllipsisWithTooltip>
                        }
                        additionalInfo={[
                          <ListView.InfoItem key={plan.id}>
                            <Icon type="pf" name="virtual-machine" />
                            <strong>{plan.options.config_info.actions.length}</strong> {__('VMs')}
                          </ListView.InfoItem>,
                          <ListView.InfoItem key={`${plan.id}-infraMappingName`}>
                            {plan.infraMappingName}
                          </ListView.InfoItem>,
                          migrationScheduled && (
                            <ListView.InfoItem key={plan.id + 1} style={{ textAlign: 'left' }}>
                              <Icon type="fa" name="clock-o" />
                              {__(`Migration scheduled`)}
                              <br />
                              {formatDateTime(migrationScheduled)}
                            </ListView.InfoItem>
                          )
                        ]}
                        key={plan.id}
                      />
                    );
                  })}
                </ListView>
              </React.Fragment>
            ) : (
              <OverviewEmptyState
                title={__('No Migration Plans Not Started')}
                iconType="pf"
                iconName="info"
                description={
                  <span>
                    {__('There are no existing migration plans in a Not Started state.')}
                    <br /> {__('Make a selection in the dropdown to view plans in other states.')}
                  </span>
                }
              />
            )}
          </Spinner>
        </Grid.Col>
        <ScheduleMigrationModal
          toggleScheduleMigrationModal={toggleScheduleMigrationModal}
          scheduleMigrationModal={scheduleMigrationModal}
          scheduleMigrationPlanId={scheduleMigrationPlanId}
          scheduleMigration={scheduleMigration}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchTransformationPlansUrl={fetchTransformationPlansUrl}
        />
      </React.Fragment>
    );
  }
}

MigrationsNotStartedList.propTypes = {
  migrateClick: PropTypes.func,
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  notStartedPlans: PropTypes.array,
  loading: PropTypes.string,
  redirectTo: PropTypes.func,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlanId: PropTypes.string,
  scheduleMigration: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string
};
MigrationsNotStartedList.defaultProps = {
  migrateClick: noop,
  notStartedPlans: [],
  loading: ''
};

export default MigrationsNotStartedList;
