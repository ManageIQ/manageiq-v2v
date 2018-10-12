import React from 'react';
import { Icon } from 'patternfly-react';
import PropTypes from 'prop-types';

class ScheduleMigrationModalBody extends React.Component {
  componentDidMount() {
    const { handleChange, defaultDate } = this.props;
    const datetimeSelector = $('#dateTimePicker');

    datetimeSelector.datetimepicker({
      allowInputToggle: true,
      showTodayButton: true,
      minDate: new Date(Date.now() + 120000),
      toolbarPlacement: 'bottom',
      sideBySide: true,
      icons: {
        today: 'today-button-pf'
      }
    });

    if (defaultDate) {
      datetimeSelector.data("DateTimePicker").date(new Date(defaultDate));
    }

    datetimeSelector.on('dp.change', e => {
      handleChange(e.date._d);
    });
  }
  render() {
    return (
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
    );
  }
}

ScheduleMigrationModalBody.propTypes = {
  handleChange: PropTypes.func
};

export default ScheduleMigrationModalBody;
