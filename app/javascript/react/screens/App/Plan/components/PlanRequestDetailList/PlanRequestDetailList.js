import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Grid,
  FormControl,
  FormGroup,
  ListView,
  PaginationRow,
  Popover,
  OverlayTrigger,
  Spinner,
  Toolbar,
  Filter,
  Sort,
  Tooltip,
  UtilizationBar,
  PAGINATION_VIEW,
  DropdownButton,
  MenuItem
} from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import listFilter from '../listFilter';
import sortFilter from '../sortFilter';
import paginate from '../paginate';
import {
  ACTIVE_PLAN_FILTER_TYPES,
  FINISHED_PLAN_FILTER_TYPES,
  ACTIVE_PLAN_SORT_FIELDS,
  FINISHED_PLAN_SORT_FIELDS
} from './PlanRequestDetailListConstants';
import { V2V_MIGRATION_STATUS_MESSAGES } from '../../PlanConstants';
import TickingIsoElapsedTime from '../../../../../../components/dates/TickingIsoElapsedTime';
import ConfirmModal from '../../../common/ConfirmModal';

class PlanRequestDetailList extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const filterTypes = nextProps.planFinished ? FINISHED_PLAN_FILTER_TYPES : ACTIVE_PLAN_FILTER_TYPES;
    const sortFields = nextProps.planFinished ? FINISHED_PLAN_SORT_FIELDS : ACTIVE_PLAN_SORT_FIELDS;
    return {
      filterTypes,
      sortFields
    };
  }

  state = {
    // filter states
    filterTypes: ACTIVE_PLAN_FILTER_TYPES,
    currentFilterType: ACTIVE_PLAN_FILTER_TYPES[0],
    currentValue: '',
    activeFilters: [],
    selectedCancelTasks: [],

    // sort states
    sortFields: ACTIVE_PLAN_SORT_FIELDS,
    currentSortType: ACTIVE_PLAN_SORT_FIELDS[0],
    isSortNumeric: ACTIVE_PLAN_SORT_FIELDS[0].isNumeric,
    isSortAscending: true,

    // pagination default states
    pagination: {
      page: 1,
      perPage: 5,
      perPageOptions: [5, 10, 15]
    },

    // page input value
    pageChangeValue: 1
  };

  onValueKeyPress = keyEvent => {
    const { currentValue, currentFilterType } = this.state;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      this.setState({ currentValue: '' });
      this.filterAdded(currentFilterType, currentValue);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  };

  onFirstPage = () => {
    this.setPage(1);
  };

  onLastPage = () => {
    const { page } = this.state.pagination;
    const totalPages = this.totalPages();
    if (page < totalPages) {
      this.setPage(totalPages);
    }
  };

  onNextPage = () => {
    const { page } = this.state.pagination;
    if (page < this.totalPages()) {
      this.setPage(this.state.pagination.page + 1);
    }
  };

  onPageInput = e => {
    this.setState({ pageChangeValue: e.target.value });
  };

  onPerPageSelect = (eventKey, e) => {
    const newPaginationState = Object.assign({}, this.state.pagination);
    newPaginationState.perPage = eventKey;
    newPaginationState.page = 1;
    this.setState({ pagination: newPaginationState });
  };

  onPreviousPage = () => {
    if (this.state.pagination.page > 1) {
      this.setPage(this.state.pagination.page - 1);
    }
  };

  onSubmit = () => {
    this.setPage(this.state.pageChangeValue);
  };

  setPage = value => {
    const page = Number(value);
    if (!Number.isNaN(value) && value !== '' && page > 0 && page <= this.totalPages()) {
      const newPaginationState = Object.assign({}, this.state.pagination);
      newPaginationState.page = page;
      this.setState({ pagination: newPaginationState, pageChangeValue: page });
    }
  };

  filterValueSelected = filterValue => {
    const { currentFilterType, currentValue } = this.state;

    if (filterValue !== currentValue) {
      this.setState({ currentValue: filterValue });
      if (filterValue) {
        this.filterAdded(currentFilterType, filterValue);
      }
    }
  };

  clearFilters = () => {
    this.setState({ activeFilters: [], currentValue: '' });
  };
  removeFilter = filter => {
    const { activeFilters } = this.state;
    const index = activeFilters.indexOf(filter);
    if (index > -1) {
      const updated = [...activeFilters.slice(0, index), ...activeFilters.slice(index + 1)];
      this.setState({ activeFilters: updated });
    }
  };
  selectFilterType = filterType => {
    const { currentFilterType } = this.state;
    if (currentFilterType !== filterType) {
      this.setState({ currentValue: '', currentFilterType: filterType });
    }
  };
  updateCurrentValue = event => {
    this.setState({ currentValue: event.target.value });
  };

  filterPlanRequestTasks = () => {
    const { activeFilters } = this.state;
    const { planRequestTasks } = this.props;
    return listFilter(activeFilters, planRequestTasks);
  };

  filterSortPaginatePlanRequestTasks = (filteredTasks = this.filterPlanRequestTasks()) => {
    const { currentSortType, isSortNumeric, isSortAscending, pagination } = this.state;
    return paginate(
      sortFilter(currentSortType, isSortNumeric, isSortAscending, filteredTasks),
      pagination.page,
      pagination.perPage
    );
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

  filterAdded = (field, value) => {
    let filterText = field.title || field;

    filterText += ': ';
    filterText += value.title || value;

    this.setState(prevState => ({
      activeFilters: [...prevState.activeFilters, { label: filterText, field, value: value.title || value }],
      pagination: {
        ...prevState.pagination,
        page: 1
      },
      pageChangeValue: 1
    }));
  };
  totalPages = () => {
    const { activeFilters, pagination } = this.state;
    const { planRequestTasks } = this.props;
    const allFilteredTasks = listFilter(activeFilters, planRequestTasks);

    return Math.ceil(allFilteredTasks.length / pagination.perPage);
  };

  renderInput = () => {
    const { currentFilterType, currentValue } = this.state;
    if (!currentFilterType) {
      return null;
    }
    if (currentFilterType.filterType === 'select') {
      return (
        <Filter.ValueSelector
          filterValues={currentFilterType.filterValues}
          placeholder={currentFilterType.placeholder}
          currentValue={currentValue}
          onFilterValueSelected={this.filterValueSelected}
        />
      );
    }
    return (
      <FormControl
        type={currentFilterType.filterType}
        value={currentValue}
        placeholder={currentFilterType.placeholder}
        onChange={e => this.updateCurrentValue(e)}
        onKeyPress={e => this.onValueKeyPress(e)}
      />
    );
  };

  onSelect = (eventKey, task) => {
    const { downloadLogAction, fetchOrchestrationStackUrl, fetchOrchestrationStackAction } = this.props;
    if (eventKey === 'migration') {
      downloadLogAction(task);
    } else {
      fetchOrchestrationStackAction(fetchOrchestrationStackUrl, eventKey, task);
    }
  };

  overlayTriggerClick = task => {
    if (task.options.playbooks) {
      const playbookStatuses = task.options.playbooks;
      let runningPlaybook = null;

      for (const scheduleType in playbookStatuses) {
        if (playbookStatuses[scheduleType].job_state === 'active') {
          runningPlaybook = scheduleType;
        }
      }

      if (runningPlaybook) {
        const {
          plan: {
            options: { config_info }
          },
          fetchAnsiblePlaybookTemplateUrl,
          fetchAnsiblePlaybookTemplateAction
        } = this.props;
        const configInfoKey = `${runningPlaybook}_service_id`;

        fetchAnsiblePlaybookTemplateAction(fetchAnsiblePlaybookTemplateUrl, config_info[configInfoKey]);
      }
    }
  };

  getCancelSelectionState = () => {
    const { selectedCancelTasks } = this.state;
    const filteredTasks = this.filterPlanRequestTasks();
    const incompleteTasks = filteredTasks.filter(task => !task.completed);
    return {
      filteredTasks,
      incompleteTasks,
      allSelected: selectedCancelTasks.length === incompleteTasks.length,
      noneSelected: selectedCancelTasks.length === 0
    };
  };

  handleCheckboxChange = task => {
    const { selectedCancelTasks } = this.state;
    const selectedTask = selectedCancelTasks.find(t => t.id === task.id);
    let updatedSelectedTasks;
    if (selectedTask) {
      updatedSelectedTasks = selectedCancelTasks.filter(r => !(r.id === task.id));
    } else {
      updatedSelectedTasks = [...selectedCancelTasks, task];
    }
    this.setState({ selectedCancelTasks: updatedSelectedTasks });
  };

  handleSelectAllCheckboxChange = () => {
    const { allSelected } = this.getCancelSelectionState();
    if (allSelected) {
      this.deselectAllTasks();
    } else {
      this.selectAllInProgressTasks();
    }
  };

  taskIsSelected = task => {
    const { selectedCancelTasks } = this.state;
    return selectedCancelTasks.findIndex(t => t.id === task.id) > -1;
  };

  selectAllInProgressTasks = () => {
    const { incompleteTasks } = this.getCancelSelectionState();
    this.setState({ selectedCancelTasks: incompleteTasks });
  };

  deselectAllTasks = () => {
    this.setState({ selectedCancelTasks: [] });
  };

  onCancelMigrationsCancel = () => {
    this.setState({ showConfirmCancel: false });
  };

  onCancelMigrationsClick = () => {
    this.setState({ showConfirmCancel: true });
  };

  onCancelMigrationsConfirm = () => {
    // todo: call this from the Confirmation Modal instead
    // gather the selected tasks in state and feed them through
    const { selectedCancelTasks } = this.state;
    const { cancelPlanRequestTasksAction, cancelPlanRequestTasksUrl } = this.props;
    cancelPlanRequestTasksAction(cancelPlanRequestTasksUrl, selectedCancelTasks);
  };

  render() {
    const {
      activeFilters,
      filterTypes,
      currentFilterType,
      sortFields,
      currentSortType,
      isSortNumeric,
      isSortAscending,
      pagination,
      pageChangeValue,
      showConfirmCancel,
      selectedCancelTasks
    } = this.state;

    const { downloadLogInProgressTaskIds, ansiblePlaybookTemplate, planRequestTasks } = this.props;

    const { filteredTasks, allSelected, noneSelected } = this.getCancelSelectionState();

    const paginatedSortedFiltersTasks = this.filterSortPaginatePlanRequestTasks(filteredTasks);
    const totalNumTasks = planRequestTasks.length;

    const selectAllCheckbox = (
      <input
        type="checkbox"
        checked={allSelected}
        onClick={event => {
          // Don't open the dropdown when clicking directly on the checkbox.
          event.stopPropagation();
        }}
        onChange={this.handleSelectAllCheckboxChange}
      />
    );

    return (
      <React.Fragment>
        <Grid.Row>
          <Toolbar>
            <FormGroup style={{ paddingLeft: 0 }}>
              <DropdownButton title={selectAllCheckbox} id="bulk-selector">
                <MenuItem eventKey="1" disabled={allSelected} onClick={this.selectAllInProgressTasks}>
                  {__('Select All')}
                </MenuItem>
                <MenuItem eventKey="2" disabled={noneSelected} onClick={this.deselectAllTasks}>
                  {__('Select None')}
                </MenuItem>
              </DropdownButton>
            </FormGroup>
            <Filter style={{ paddingLeft: 20 }}>
              <Filter.TypeSelector
                filterTypes={filterTypes}
                currentFilterType={currentFilterType}
                onFilterTypeSelected={this.selectFilterType}
              />
              {this.renderInput()}
            </Filter>
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
            <Toolbar.RightContent>
              <Button disabled={selectedCancelTasks.length === 0} onClick={this.onCancelMigrationsClick}>
                Cancel Migration
              </Button>
            </Toolbar.RightContent>
            {activeFilters &&
              activeFilters.length > 0 && (
                <Toolbar.Results>
                  <h5>
                    {paginatedSortedFiltersTasks.itemCount}{' '}
                    {paginatedSortedFiltersTasks.itemCount === 1 ? __('Result') : __('Results')}
                  </h5>
                  <Filter.ActiveLabel>{__('Active Filters')}:</Filter.ActiveLabel>
                  <Filter.List>
                    {activeFilters.map((item, index) => (
                      <Filter.Item key={index} onRemove={this.removeFilter} filterData={item}>
                        {item.label}
                      </Filter.Item>
                    ))}
                  </Filter.List>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      this.clearFilters();
                    }}
                  >
                    {__('Clear All Filters')}
                  </a>
                </Toolbar.Results>
              )}
          </Toolbar>
          {selectedCancelTasks.length > 0 && (
            <Toolbar>
              <Toolbar.RightContent>
                {sprintf(__('%s of %s selected'), selectedCancelTasks.length, totalNumTasks)}
              </Toolbar.RightContent>
            </Toolbar>
          )}
        </Grid.Row>
        <div style={{ overflow: 'auto', paddingBottom: 300, height: '100%' }}>
          <ListView className="plan-request-details-list">
            {paginatedSortedFiltersTasks.tasks.map((task, n) => {
              let leftContent;
              if (task.message === 'Pending') {
                leftContent = (
                  <ListView.Icon
                    type="pf"
                    name="pending"
                    size="md"
                    style={{ width: 'inherit', backgroundColor: 'transparent' }}
                  />
                );
              } else if (task.completed && !task.completedSuccessfully) {
                leftContent = (
                  <ListView.Icon
                    type="pf"
                    name="error-circle-o"
                    size="md"
                    style={{ width: 'inherit', backgroundColor: 'transparent' }}
                  />
                );
              } else if (task.completed) {
                leftContent = (
                  <ListView.Icon
                    type="pf"
                    name="ok"
                    size="md"
                    style={{ width: 'inherit', backgroundColor: 'transparent' }}
                  />
                );
              } else {
                leftContent = <Spinner loading />;
              }
              const label = sprintf(__('%s of %s Migrated'), task.diskSpaceCompletedGb, task.totalDiskSpaceGb);

              const popoverContent = (
                <Popover
                  id={`popover${task.id}${n}`}
                  title={V2V_MIGRATION_STATUS_MESSAGES[task.message]}
                  className="task-info-popover"
                >
                  <div>
                    <div>
                      <b>{__('Elapsed Time')}: </b>
                      {formatDateTime(task.startDateTime)}
                    </div>
                    {task.options.prePlaybookRunning || task.options.postPlaybookRunning ? (
                      <div>
                        <b>{__('Running playbook service')}: </b>
                        {ansiblePlaybookTemplate.name}
                      </div>
                    ) : (
                      <div>
                        <b>{__('Description')}: </b>
                        {task.options.progress &&
                          V2V_MIGRATION_STATUS_MESSAGES[task.options.progress.current_description]}
                      </div>
                    )}
                    <div>
                      <b>{__('Conversion Host')}: </b>
                      {task.transformation_host_name}
                    </div>
                    {task.completed &&
                      task.options.virtv2v_wrapper &&
                      task.options.virtv2v_wrapper.v2v_log.length > 0 && (
                        <div>
                          <br />
                          <strong>{__('Log:')}</strong>
                          <br />
                          {task.options.virtv2v_wrapper.v2v_log}
                        </div>
                      )}
                  </div>
                </Popover>
              );
              return (
                <ListView.Item
                  key={task.id}
                  checkboxInput={
                    <input
                      type="checkbox"
                      disabled={!!task.completed}
                      checked={this.taskIsSelected(task)}
                      onChange={() => {
                        this.handleCheckboxChange(task);
                      }}
                    />
                  }
                  leftContent={leftContent}
                  heading={task.vmName}
                  additionalInfo={[
                    <ListView.InfoItem
                      key={`${task.id}-message`}
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginRight: 80,
                        minWidth: 200
                      }}
                    >
                      <div>
                        <span>{task.message}</span>
                        &nbsp;
                        {/* Todo: revisit FieldLevelHelp props in patternfly-react to support this */}
                        <OverlayTrigger
                          rootClose
                          trigger="click"
                          onEnter={() => this.overlayTriggerClick(task)}
                          placement="left"
                          overlay={popoverContent}
                        >
                          <Button bsStyle="link">
                            <Icon type="pf" name="info" />
                          </Button>
                        </OverlayTrigger>
                      </div>
                      <div>
                        <ListView.Icon type="fa" size="lg" name="clock-o" />
                        <TickingIsoElapsedTime
                          startTime={task.startDateTime}
                          endTime={task.completed ? task.lastUpdateDateTime : null}
                        />
                      </div>
                    </ListView.InfoItem>,
                    <ListView.InfoItem key={`${task.id}-times`} style={{ minWidth: 150, paddingRight: 20 }}>
                      <UtilizationBar
                        now={task.percentComplete}
                        min={0}
                        max={100}
                        description={label}
                        label=" "
                        usedTooltipFunction={(max, now) => (
                          <Tooltip id={Date.now()}>
                            {now} % {__('Migrated')}
                          </Tooltip>
                        )}
                        availableTooltipFunction={(max, now) => (
                          <Tooltip id={Date.now()}>
                            {max - now} % {__('Remaining')}
                          </Tooltip>
                        )}
                        descriptionPlacementTop
                      />
                    </ListView.InfoItem>
                  ]}
                  actions={
                    downloadLogInProgressTaskIds &&
                    downloadLogInProgressTaskIds.find(element => element === task.id) ? (
                      <label htmlFor="downloadLog">
                        <span id="downloadLogInProgress">{__('Download log in progress...')}</span>
                      </label>
                    ) : (
                      <DropdownButton
                        id={`${task.id}-${task.descriptionPrefix}_download_log_dropdown`}
                        title={__('Download Log')}
                        pullRight
                        onSelect={eventKey => this.onSelect(eventKey, task)}
                      >
                        {(task.options.prePlaybookRunning || task.options.prePlaybookComplete) && (
                          <MenuItem eventKey="preMigration">{__('Pre-migration log')}</MenuItem>
                        )}
                        <MenuItem eventKey="migration">{__('Migration log')}</MenuItem>
                        {(task.options.postPlaybookRunning || task.options.postPlaybookComplete) && (
                          <MenuItem eventKey="postMigration">{__('Post-migration log')}</MenuItem>
                        )}
                      </DropdownButton>
                    )
                  }
                  stacked
                />
              );
            })}
          </ListView>
          <PaginationRow
            viewType={PAGINATION_VIEW.LIST}
            pagination={pagination}
            pageInputValue={pageChangeValue}
            amountOfPages={paginatedSortedFiltersTasks.amountOfPages}
            itemCount={paginatedSortedFiltersTasks.itemCount}
            itemsStart={paginatedSortedFiltersTasks.itemsStart}
            itemsEnd={paginatedSortedFiltersTasks.itemsEnd}
            onPerPageSelect={this.onPerPageSelect}
            onFirstPage={this.onFirstPage}
            onPreviousPage={this.onPreviousPage}
            onPageInput={this.onPageInput}
            onNextPage={this.onNextPage}
            onLastPage={this.onLastPage}
            onSubmit={this.onSubmit}
          />
        </div>
        <ConfirmModal
          show={showConfirmCancel}
          title={__('Cancel Migrations')}
          body={
            <React.Fragment>
              <p>
                {__('If you cancel, these VMs will not be migrated and will be fully restored in the source provider.')}
              </p>
              <ul>{selectedCancelTasks.map(task => <li key={task.id}>{task.vmName}</li>)}</ul>
              <p>{__('Do you want to cancel?')}</p>
            </React.Fragment>
          }
          cancelButtonLabel={__('No')}
          confirmButtonLabel={__('Cancel Migrations')}
          onConfirm={this.onCancelMigrationsConfirm}
          onCancel={this.onCancelMigrationsCancel}
        />
      </React.Fragment>
    );
  }
}

PlanRequestDetailList.propTypes = {
  planRequestTasks: PropTypes.array,
  downloadLogAction: PropTypes.func,
  downloadLogInProgressTaskIds: PropTypes.array,
  plan: PropTypes.object,
  fetchAnsiblePlaybookTemplateUrl: PropTypes.string,
  fetchAnsiblePlaybookTemplateAction: PropTypes.func,
  ansiblePlaybookTemplate: PropTypes.object,
  fetchOrchestrationStackUrl: PropTypes.string,
  fetchOrchestrationStackAction: PropTypes.func,
  cancelPlanRequestTasksAction: PropTypes.func,
  cancelPlanRequestTasksUrl: PropTypes.string
};

export default PlanRequestDetailList;
