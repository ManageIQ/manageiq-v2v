import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

const LoadingPage = ({ error, pastDelay, timedOut }) => {
  if (error) {
    return <div>Error! Please refresh and try again.</div>;
  } else if (timedOut) {
    return <div>Timed out. Please refresh and try again.</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  }
  return null;
};

export default options =>
  Loadable({
    ...options,
    loading: LoadingPage,
    delay: 200,
    timeout: 10000
  });

LoadingPage.propTypes = {
  error: PropTypes.bool,
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool
};
