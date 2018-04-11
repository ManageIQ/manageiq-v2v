import moment from 'moment';

export const IsoElpasedTime = (startTime, endTime) => {
  const elapsedHours = moment(endTime).diff(startTime, 'hours');
  const elapsedMinutes = moment(endTime).diff(startTime, 'minutes') % 60;

  let elapsedTime;
  if (elapsedHours >= 48) {
    elapsedTime = sprintf(
      __('%s days %sh %sm elapsed'),
      Math.floor(elapsedHours / 24),
      elapsedHours % 24,
      elapsedMinutes
    );
  } else if (elapsedHours >= 24) {
    elapsedTime = sprintf(
      __('1 day %sh %sm elapsed'),
      elapsedHours % 24,
      elapsedMinutes
    );
  } else {
    elapsedTime = sprintf(__('%sh %sm elapsed'), elapsedHours, elapsedMinutes);
  }
  return elapsedTime;
};
