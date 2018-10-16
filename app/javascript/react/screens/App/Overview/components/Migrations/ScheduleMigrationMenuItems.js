import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Icon } from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';

const ScheduleMigrationMenuItems = ({
  showConfirmModalAction,
  hideConfirmModalAction,
  loading,
  toggleScheduleMigrationModal,
  scheduleMigration,
  fetchTransformationPlansAction,
  fetchTransformationPlansUrl,
  plan,
  isMissingMapping
}) => {
  const migrationScheduled = (plan.schedules && plan.schedules[0].run_at.start_time) || 0;
  const staleMigrationSchedule = new Date(migrationScheduled).getTime() < Date.now();
  const confirmationWarningText = (
    <React.Fragment>
      <p>
        {sprintf(
          __('Are you sure you want to unschedule plan %s  targted to run on %s ?'),
          plan.name,
          formatDateTime(migrationScheduled)
        )}
      </p>
    </React.Fragment>
  );

  const confirmModalProps = {
    title: __('Unschedule Migration Plan'),
    body: confirmationWarningText,
    icon: <Icon className="confirm-warning-icon" type="pf" name="warning-triangle-o" />,
    confirmButtonLabel: __('Unschedule')
  };

  const onConfirm = () => {
    scheduleMigration({
      plan
    }).then(() => {
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
    });
    hideConfirmModalAction();
  };

  const scheduleDisabled = isMissingMapping || loading === plan.href || plan.schedule_type;
  const rescheduleDisabled = isMissingMapping || loading === plan.href;

  return (
    <React.Fragment>
      {staleMigrationSchedule && (
        <MenuItem
          id={`schedule_${plan.id}`}
          onClick={e => {
            e.stopPropagation();
            if (!scheduleDisabled) {
              toggleScheduleMigrationModal({ plan });
            }
          }}
          disabled={scheduleDisabled}
        >
          {__('Schedule')}
        </MenuItem>
      )}
      {!staleMigrationSchedule && (
        <React.Fragment>
          <MenuItem
            id={`unschedule_${plan.id}`}
            onClick={e => {
              e.stopPropagation();

              if (!rescheduleDisabled) {
                showConfirmModalAction({
                  ...confirmModalProps,
                  onConfirm
                });
              }
            }}
            disabled={rescheduleDisabled}
          >
            {__('Unschedule')}
          </MenuItem>
          <MenuItem
            id={`reschedule_${plan.id}`}
            onClick={e => {
              e.stopPropagation();
              if (!rescheduleDisabled) {
                toggleScheduleMigrationModal({ plan });
              }
            }}
            disabled={rescheduleDisabled}
          >
            {__('Reschedule')}
          </MenuItem>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

ScheduleMigrationMenuItems.propTypes = {
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  loading: PropTypes.string,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigration: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  plan: PropTypes.object,
  isMissingMapping: PropTypes.bool
};

export default ScheduleMigrationMenuItems;
