import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Grid,
  FormControl,
  ListView,
  Popover,
  OverlayTrigger,
  Spinner,
  Toolbar,
  Filter,
  Sort,
  Tooltip,
  UtilizationBar
} from 'patternfly-react';
import { IsoElpasedTime } from '../../../../../components/dates/IsoElapsedTime';
import listFilter from './listFilter';
import sortFilter from './sortFilter';

class PlanRequestDetailList extends React.Component {
  constructor(props) {
    super(props);
    const filterTypes = [
      {
        id: 'transformation_host_name',
        title: 'Host Name',
        placeholder: 'Filter by Host Name',
        filterType: 'text'
      },
      {
        id: 'message',
        title: 'Status',
        placeholder: 'Filter by Status',
        filterType: 'select',
        filterValues: [
          { title: 'Pending', id: 'Pending' },
          { title: 'Validating', id: 'Validating' },
          { title: 'Pre-migration', id: 'Pre-migration' },
          { title: 'Migrating', id: 'Migrating' },
          {
            title: 'VM Transformations completed',
            id: 'VM Transformations completed'
          }
        ]
      }
    ];
    const sortFields = [
      { id: 'delivered_on', title: 'Started', isNumeric: true },
      { id: 'transformation_host_name', title: 'Host Name', isNumeric: false },
      { id: 'message', title: 'Status', isNumeric: false }
    ];
    this.state = {
      filterTypes,
      currentFilterType: filterTypes[0],
      currentValue: '',
      activeFilters: [],
      sortFields,
      currentSortType: sortFields[0],
      isSortNumeric: sortFields[0].isNumeric,
      isSortAscending: true
    };
  }

  /**
   * filter methods
   */
  onValueKeyPress = keyEvent => {
    const { currentValue, currentFilterType } = this.state;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      this.setState({ currentValue: '' });
      this.filterAdded(currentFilterType, currentValue);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  };

  filterAdded = (field, value) => {
    let filterText = field.title || field;

    filterText += ': ';
    filterText += value.title || value;

    const activeFilters = [
      ...this.state.activeFilters,
      { label: filterText, field, value: value.title || value }
    ];
    this.setState({ activeFilters });
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
    this.setState({ activeFilters: [] });
  };
  removeFilter = filter => {
    const { activeFilters } = this.state;
    const index = activeFilters.indexOf(filter);
    if (index > -1) {
      const updated = [
        ...activeFilters.slice(0, index),
        ...activeFilters.slice(index + 1)
      ];
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

  filterSortPlanRequestTasks = tasks => {
    const {
      activeFilters,
      currentSortType,
      isSortNumeric,
      isSortAscending
    } = this.state;
    const { planRequestTasks } = this.props;

    return sortFilter(
      currentSortType,
      isSortNumeric,
      isSortAscending,
      listFilter(activeFilters, planRequestTasks)
    );
  };
  /**
   * sort methods
   */
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

  render() {
    const {
      activeFilters,
      filterTypes,
      currentFilterType,
      sortFields,
      currentSortType,
      isSortNumeric,
      isSortAscending
    } = this.state;

    const planRequestTasks = this.filterSortPlanRequestTasks();

    return (
      <React.Fragment>
        <Grid.Row>
          <Toolbar>
            <Filter>
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
            {activeFilters &&
              activeFilters.length > 0 && (
                <Toolbar.Results>
                  <h5>
                    {planRequestTasks.length}{' '}
                    {planRequestTasks.length === 1
                      ? __('Result')
                      : __('Results')}
                  </h5>
                  <Filter.ActiveLabel>
                    {__('Active Filters')}:
                  </Filter.ActiveLabel>
                  <Filter.List>
                    {activeFilters.map((item, index) => (
                      <Filter.Item
                        key={index}
                        onRemove={this.removeFilter}
                        filterData={item}
                      >
                        {__('label=')}
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
        </Grid.Row>
        <div style={{ overflow: 'auto', paddingBottom: 100, height: '100%' }}>
          <ListView className="plan-request-details-list">
            {planRequestTasks.map((task, n) => {
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
              const currentTime = new Date();
              const startDateTime = task.delivered_on;
              const lastUpdateDateTime = task.updated_on;
              const elapsedTime = IsoElpasedTime(
                startDateTime,
                task.completed ? lastUpdateDateTime : currentTime
              );
              const label = sprintf(
                __('%s of %s Migrated'),
                task.diskSpaceCompletedGb,
                task.totalDiskSpaceGb
              );

              const states = [];
              if (task.options.progress.states) {
                Object.entries(task.options.progress.states).forEach(
                  ([key, value]) => {
                    states.push(
                      <div key={`key${task.id}`}>
                        <small>
                          <i>{key}:</i>&nbsp;
                          {value.description}
                        </small>
                      </div>
                    );
                  }
                );
              }

              const popoverContent = (
                <Popover id={`popover${task.id}${n}`} title={task.message}>
                  <div>
                    <div>
                      <strong>Status:</strong> {task.status}
                    </div>
                    <div>
                      <strong>State:</strong> {task.state}
                    </div>
                    <div>
                      <strong>Log:</strong>{' '}
                      {task.options.virtv2v_wrapper &&
                        task.options.virtv2v_wrapper.v2v_log}
                    </div>
                    <div>
                      <strong>Progress:</strong>
                    </div>
                    {states}
                  </div>
                </Popover>
              );
              return (
                <ListView.Item
                  key={task.id}
                  leftContent={leftContent}
                  heading={task.transformation_host_name}
                  additionalInfo={[
                    <div style={{ paddingRight: 60 }} key={`${task.id}-times`}>
                      <span>
                        <strong>{__('Started')}: </strong>
                        {moment(startDateTime).format('YYYY-MM-DD HH:mm:ss A')}
                      </span>
                      <br />
                      <span>
                        <strong>{__('Elapsed')}: </strong>
                        {elapsedTime}
                      </span>
                    </div>,
                    <div key={`${task.id}-message`}>
                      <OverlayTrigger
                        rootClose
                        trigger="click"
                        placement="left"
                        overlay={popoverContent}
                      >
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                          }}
                        >
                          {task.message}
                        </a>
                      </OverlayTrigger>
                    </div>
                  ]}
                  actions={
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
                  }
                  stacked
                />
              );
            })}
          </ListView>
        </div>
      </React.Fragment>
    );
  }
}

PlanRequestDetailList.propTypes = {
  planRequestTasks: PropTypes.array
};

export default PlanRequestDetailList;
