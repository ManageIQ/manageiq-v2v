import React from 'react';
import PropTypes from 'prop-types';
import { IsoElapsedTime } from './IsoElapsedTime';

class TickingIsoElapsedTime extends React.Component {
  constructor() {
    super();
    this.state = { now: Date.now() };
    this._tickInterval = null;
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({ now: Date.now() });
  }

  componentDidMount() {
    this._tickInterval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._tickInterval);
  }
  
  render() {
    const { startTime } = this.props;
    const { now } = this.state;
    return (
      <React.Fragment>
        {IsoElapsedTime(new Date(startTime), now)}
      </React.Fragment>
    );
  }

}

TickingIsoElapsedTime.propTypes = {
  startTime: PropTypes.string, // any string you can pass to new Date()
};

export default TickingIsoElapsedTime;