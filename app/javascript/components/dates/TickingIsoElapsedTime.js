import React from 'react';
import PropTypes from 'prop-types';
import { IsoElapsedTime } from './IsoElapsedTime';

class TickingIsoElapsedTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: props.endTime || Date.now()
    };
    this._tickInterval = null;
    this.dateProps = this.dateProps.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this._tickInterval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._tickInterval);
  }

  dateProps() {
    // The new Date() constructor, when passed a Date object, just returns that object.
    // So it can be used to "cast" unknown string-or-Date props into known Date objects.
    const { startTime, endTime } = this.props;
    return {
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null
    };
  }

  tick() {
    const { endTime } = this.dateProps();
    this.setState({
      now: endTime || Date.now()
    });
  }

  render() {
    const { startTime } = this.dateProps();
    const { now } = this.state;
    return <React.Fragment>{IsoElapsedTime(startTime, now)}</React.Fragment>;
  }
}

TickingIsoElapsedTime.propTypes = {
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
};

TickingIsoElapsedTime.defaultProps = {
  endTime: null // If a null endTime is passed, the time will tick each second.
  // A non-null endTime will stop the ticking and just display the difference.
};

export default TickingIsoElapsedTime;
