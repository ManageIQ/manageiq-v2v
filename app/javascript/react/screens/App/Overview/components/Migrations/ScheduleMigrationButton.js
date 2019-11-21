import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const ScheduleMigrationButton = ({ loading, toggleScheduleMigrationModal, plan, isMissingMapping }) => {
  const buttonLabel = migrationPlan => {
    let label = __('Schedule Migration');
    if (migrationPlan.options.config_info.warm_migration && migrationPlan.status === 'Ok') {
      label = __('Schedule Cutover');
    } else if (migrationPlan.status === 'Error' || migrationPlan.status === 'Denied') {
      label = __('Schedule Retry');
    }
    return label;
  };

  return (
    <Button
      id={`schedule_${plan.id}`}
      onClick={e => {
        e.stopPropagation();
        toggleScheduleMigrationModal({ plan });
      }}
      disabled={isMissingMapping || loading === plan.href || plan.schedule_type}
    >
      {buttonLabel(plan)}
    </Button>
  );
};

ScheduleMigrationButton.propTypes = {
  loading: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toggleScheduleMigrationModal: PropTypes.func,
  plan: PropTypes.object,
  isMissingMapping: PropTypes.bool
};

export default ScheduleMigrationButton;
