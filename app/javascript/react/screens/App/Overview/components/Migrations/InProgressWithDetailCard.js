import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import InProgressCard from './InProgressCard';

const InProgressWithDetailCard = ({ plan, failedOverlay, handleClick, children }) => (
  <InProgressCard
    onClick={e => {
      if (!e.target.classList.contains('pficon-error-circle-o')) {
        handleClick(`/migration/plan/${plan.id}`);
      }
    }}
    className="in-progress"
    title={
      <h3 className="card-pf-title">
        {failedOverlay}
        {plan.name}
      </h3>
    }
  >
    {children}
  </InProgressCard>
);

InProgressWithDetailCard.propTypes = {
  plan: PropTypes.object,
  failedOverlay: PropTypes.node,
  handleClick: PropTypes.func,
  children: PropTypes.node
};

InProgressWithDetailCard.defaultProps = {
  plan: {},
  failedOverlay: null,
  handleClick: noop,
  children: null
};

export default InProgressWithDetailCard;
