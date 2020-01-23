import React from 'react';
import { Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import { initializeDatepicker } from '../../helpers';

class ScheduleMigrationModalBody extends React.Component {
  componentDidMount() {
    if (this.props.showDatepicker) {
      const { handleDatepickerChange, defaultDate } = this.props;
      initializeDatepicker(handleDatepickerChange, defaultDate);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.showDatepicker !== this.props.showDatepicker) {
      if (this.props.showDatepicker) {
        const { handleDatepickerChange, defaultDate } = this.props;
        initializeDatepicker(handleDatepickerChange, defaultDate);
      }
    }
  }

  render() {
    const { setScheduleMode, startNowLabel, startLaterLabel, showDatepicker } = this.props;

    const handleRadioChange = event => {
      setScheduleMode(event.currentTarget.value === 'schedule_migration_now');
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
                    checked={!showDatepicker}
                  />
                  {startNowLabel}
                </label>
              </div>
              <div className="radio">
                <label style={{ fontWeight: '600' }}>
                  <input
                    type="radio"
                    name="schedule_migration_start"
                    value="schedule_migration_later"
                    onChange={handleRadioChange}
                    checked={showDatepicker}
                  />
                  {startLaterLabel}
                </label>
              </div>
            </div>
          </div>
        </div>
        {showDatepicker && (
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
  setScheduleMode: PropTypes.func,
  defaultDate: PropTypes.instanceOf(Date),
  startNowLabel: PropTypes.string,
  startLaterLabel: PropTypes.string,
  showDatepicker: PropTypes.bool
};

export default ScheduleMigrationModalBody;
