import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';

const WizardLoadingState = ({ title, message }) => (
  <div className="wizard-pf-process blank-slate-pf">
    <Spinner loading size="lg" className="blank-slate-pf-icon" />
    <h3 className="blank-slate-pf-main-action">{title}</h3>
    <p className="blank-slate-pf-secondary-action">{message}</p>
  </div>
);

WizardLoadingState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string
};

WizardLoadingState.defaultProps = {
  message: ''
};

export default WizardLoadingState;
