import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const ScheduleMigrationButton = ({ loading, toggleScheduleMigrationModal, plan, isMissingMapping }) => (
  <Button
    id={`schedule_${plan.id}`}
    onClick={e => {
      e.stopPropagation();
      toggleScheduleMigrationModal({ plan });
    }}
    disabled={isMissingMapping || loading === plan.href || plan.schedule_type}
  >
    {__('Schedule')}
  </Button>
);

ScheduleMigrationButton.propTypes = {
  loading: PropTypes.string,
  toggleScheduleMigrationModal: PropTypes.func,
  plan: PropTypes.object,
  isMissingMapping: PropTypes.bool
};

export default ScheduleMigrationButton;
