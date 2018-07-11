import moment from 'moment';

export const IsoElapsedTime = (startTime, endTime) => {
  let elapsedHours = moment(endTime).diff(startTime, 'hours');
  const elapsedMinutes = moment(endTime).diff(startTime, 'minutes') % 60;
  const elapsedSeconds = moment(endTime).diff(startTime, 'seconds') % 60;
  const elapsedDays = Math.floor(elapsedHours / 24);
  elapsedHours %= 24;

  let elapsedTime;
  if (elapsedDays >= 2) {
    elapsedTime = sprintf(__('%s days %02s:%02s:%02s'), elapsedDays, elapsedHours, elapsedMinutes, elapsedSeconds);
  } else if (elapsedDays === 1) {
    elapsedTime = sprintf(__('1 day %02s:%02s:%02s'), elapsedHours, elapsedMinutes, elapsedSeconds);
  } else {
    elapsedTime = sprintf(__('%02s:%02s:%02s'), elapsedHours, elapsedMinutes, elapsedSeconds);
  }
  return elapsedTime;
};
