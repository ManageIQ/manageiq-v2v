import React from 'react';
import PropTypes from 'prop-types';

const ConversionHostsList = ({ conversionHosts }) => (
  <React.Fragment>
    <h2>TODO: render a list view here using the ListViewToolbar pattern we have elsewhere</h2>
    {conversionHosts.map(conversionHost => (
      <pre key={conversionHost.id}>{JSON.stringify(conversionHost)}</pre>
    ))}
  </React.Fragment>
);

ConversionHostsList.propTypes = {
  conversionHosts: PropTypes.arrayOf(PropTypes.object)
};

export default ConversionHostsList;
