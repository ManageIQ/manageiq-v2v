import React from 'react';
import { Icon } from 'patternfly-react';
import PropTypes from 'prop-types';

class ScheduleMigrationModalBody extends React.Component {
  componentDidMount() {
    const { handleChange, defaultDate } = this.props;
    const datetimeSelector = $('#dateTimePicker');

    const minDate = new Date(Date.now() + 120000);
    const validDefaultDate = defaultDate && new Date(defaultDate) > minDate ? new Date(defaultDate) : false;

    datetimeSelector.datetimepicker({
      defaultDate: validDefaultDate,
      useCurrent: !validDefaultDate,
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
      handleChange(e.date._d);
    });

    const picker = datetimeSelector.data('DateTimePicker');
    handleChange(picker.date().toDate());
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
  handleChange: PropTypes.func,
  defaultDate: PropTypes.string
};

export default ScheduleMigrationModalBody;
