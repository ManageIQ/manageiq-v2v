import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, intlShape } from 'react-intl';
import i18n from '../../common/i18n';

const IsoDate = ({ data }, context) => {
  const { date, defaultValue } = data;

  if (date) {
    const title = context.intl.formatRelative(date);

    return (
      <span title={title}>
        <FormattedDate value={date} day="2-digit" month="2-digit" year="numeric" timeZone={i18n.timezone} />
      </span>
    );
  }
  return <span>{defaultValue}</span>;
};

IsoDate.contextTypes = {
  intl: intlShape
};

IsoDate.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.any,
    defaultValue: PropTypes.string
  })
};

export default IsoDate;
