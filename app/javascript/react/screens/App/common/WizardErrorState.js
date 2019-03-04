import React from 'react';
import PropTypes from 'prop-types';

const WizardErrorState = ({ title, message, onClose }) => (
  <div className="wizard-pf-complete blank-slate-pf">
    <div className="wizard-pf-success-icon">
      <span className="pficon pficon-error-circle-o" />
    </div>
    <h3 className="blank-slate-pf-main-action">{title}</h3>
    <p className="blank-slate-pf-secondary-action">{message}</p>
    {onClose ? (
      <button type="button" className="btn btn-lg btn-primary" onClick={onClose}>
        {__('Close')}
      </button>
    ) : null}
  </div>
);

WizardErrorState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func
};

WizardErrorState.defaultProps = {
  message: ''
};

export default WizardErrorState;
