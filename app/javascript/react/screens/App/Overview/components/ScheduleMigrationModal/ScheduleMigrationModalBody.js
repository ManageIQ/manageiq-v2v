import React from 'react';
import { Icon } from 'patternfly-react';
import PropTypes from 'prop-types';

class ScheduleMigrationModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDatepicker: false
    };
  }

  componentDidMount() {
    const { startMigrationNowHandler } = this.props;
    startMigrationNowHandler(!this.state.showDatepicker);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.showDatepicker !== this.state.showDatepicker) {
      const { startMigrationNowHandler } = this.props;
      startMigrationNowHandler(!this.state.showDatepicker);

      if (this.state.showDatepicker) {
        const { handleDatepickerChange, defaultDate } = this.props;
        const datetimeSelector = $('#dateTimePicker');
        const minDate = new Date(Date.now() + 120000);

        datetimeSelector.datetimepicker({
          defaultDate: defaultDate > minDate ? defaultDate : minDate,
          useCurrent: !defaultDate,
          allowInputToggle: true,
          showTodayButton: true,
          minDate,
          toolbarPlacement: 'bottom',
          sideBySide: true,
          icons: {
            today: 'today-button-pf'
          }
        });

        datetimeSelector.on('dp.change', e => {
          handleDatepickerChange(e.date._d);
        });

        const picker = datetimeSelector.data('DateTimePicker');
        handleDatepickerChange(picker.date().toDate());
      }
    }
  }

  render() {
    const handleRadioChange = event => {
      this.setState({
        showDatepicker: event.currentTarget.value === 'schedule_migration_later'
      });
    };

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <div className="radio">
                <label style={{ fontWeight: '600' }}>
                  <input
                    type="radio"
                    name="schedule_migration_start"
                    value="schedule_migration_now"
                    onChange={handleRadioChange}
                    checked={!this.state.showDatepicker}
                  />
                  {__('Start migration immediately')}
                </label>
              </div>
              <div className="radio">
                <label style={{ fontWeight: '600' }}>
                  <input
                    type="radio"
                    name="schedule_migration_start"
                    value="schedule_migration_later"
                    onChange={handleRadioChange}
                  />
                  {__('Select date and time for the start of the migration')}
                </label>
              </div>
            </div>
          </div>
        </div>
        {this.state.showDatepicker && (
          <div className="row">
            <div className="col-xs-12">
              <div className="form-group">
                <div id="dateTimePicker" className="input-group date-time-picker-pf">
                  <input id="dateTimeInput" type="text" className="form-control" />
                  <span className="input-group-addon">
                    <Icon type="fa" name="calendar" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ScheduleMigrationModalBody.propTypes = {
  handleDatepickerChange: PropTypes.func,
  startMigrationNowHandler: PropTypes.func,
  defaultDate: PropTypes.instanceOf(Date)
};

export default ScheduleMigrationModalBody;
