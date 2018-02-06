import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, intlShape } from 'react-intl';
import i18n from '../../common/i18n';

const LongDateTime = ({ data }, context) => {
  const { date, defaultValue } = data;
  if (date) {
    const title = context.intl.formatRelative(date);
    const seconds = data.seconds ? '2-digit' : undefined;

    return (
      <span title={title}>
        <FormattedDate
          value={date}
          day="2-digit"
          month="long"
          hour="2-digit"
          minute="2-digit"
          second={seconds}
          year="numeric"
          timeZone={i18n.timezone}
        />
      </span>
    );
  }
  return <span>{defaultValue}</span>;
};

LongDateTime.contextTypes = {
  intl: intlShape
};

LongDateTime.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.any,
    defaultValue: PropTypes.string
  })
};

export default LongDateTime;
