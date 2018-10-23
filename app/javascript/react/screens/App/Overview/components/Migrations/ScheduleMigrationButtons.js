import React from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, Icon } from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';

const ScheduleMigrationButtons = ({
  showConfirmModalAction,
  hideConfirmModalAction,
  loading,
  toggleScheduleMigrationModal,
  scheduleMigration,
  fetchTransformationPlansAction,
  fetchTransformationPlansUrl,
  plan,
  isMissingMapping,
  migrationScheduled,
  migrationStarting,
  showInitialScheduleButton
}) => {
  const confirmationWarningText = (
    <React.Fragment>
      <p>
        {sprintf(
          __('Are you sure you want to unschedule plan %s  targeted to run on %s ?'),
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

  const editScheduleDisabled = isMissingMapping || loading === plan.href || migrationStarting;

  return (
    <React.Fragment>
      {showInitialScheduleButton && (
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
      )}
      {!showInitialScheduleButton && (
        <React.Fragment>
          <MenuItem
            id={`edit_schedule_${plan.id}`}
            onClick={e => {
              e.stopPropagation();
              if (!editScheduleDisabled) {
                toggleScheduleMigrationModal({ plan });
              }
            }}
            disabled={editScheduleDisabled}
          >
            {__('Edit schedule')}
          </MenuItem>
          <MenuItem
            id={`unschedule_${plan.id}`}
            onClick={e => {
              e.stopPropagation();
              if (!editScheduleDisabled) {
                showConfirmModalAction({
                  ...confirmModalProps,
                  onConfirm
                });
              }
            }}
            disabled={editScheduleDisabled}
          >
            {__('Delete schedule')}
          </MenuItem>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

ScheduleMigrationButtons.propTypes = {
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  loading: PropTypes.string,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigration: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  plan: PropTypes.object,
  isMissingMapping: PropTypes.bool,
  migrationScheduled: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  migrationStarting: PropTypes.bool,
  showInitialScheduleButton: PropTypes.bool
};

export default ScheduleMigrationButtons;
