import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import getPlanScheduleInfo from './helpers/getPlanScheduleInfo';

const ScheduleMigrationButton = ({
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
  const { migrationScheduled, staleMigrationSchedule, migrationStarting } = getPlanScheduleInfo(plan);
  const showScheduleButton = staleMigrationSchedule && !migrationStarting;

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

  return (
    <React.Fragment>
      {showScheduleButton && (
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
      {!showScheduleButton && (
        <Button
          id={`unschedule_${plan.id}`}
          onClick={e => {
            e.stopPropagation();

            showConfirmModalAction({
              ...confirmModalProps,
              onConfirm
            });
          }}
          disabled={isMissingMapping || loading === plan.href || migrationStarting}
        >
          {__('Unschedule')}
        </Button>
      )}
    </React.Fragment>
  );
};

ScheduleMigrationButton.propTypes = {
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

export default ScheduleMigrationButton;
