import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'patternfly-react';
import ScheduleMigrationModalBody from './ScheduleMigrationModalBody';
import getPlanScheduleInfo from '../Migrations/helpers/getPlanScheduleInfo';
import isPlanWarmMigration from '../Migrations/helpers/isPlanWarmMigration';

class ScheduleMigrationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTimeInput: null,
      startMigrationNow: null
    };
  }

  render() {
    const {
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlan,
      scheduleMigration,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      scheduleMigrationNow,
      scheduleCutover
    } = this.props;

    const handleDatepickerChange = event => {
      this.setState({ dateTimeInput: event });
    };

    const setScheduleMode = event => {
      this.setState({ startMigrationNow: event });
    };

    const modalClose = () => {
      toggleScheduleMigrationModal();
    };

    const modalMode = plan => {
      let mode = 'migration';
      if (isPlanWarmMigration(plan) && plan.status === 'Ok') {
        mode = 'cutover';
      } else if (plan != null && (plan.status === 'Error' || plan.status === 'Denied')) {
        mode = 'retry';
      }
      return mode;
    };

    const MODAL_STRINGS = {
      migration: [
        __('Schedule Migration'),
        __('Start migration immediately'),
        __('Select date and time for the start of the migration')
      ],
      cutover: [__('Schedule Cutover'), __('Start cutover immediately'), __('Select date and time to start cutover')],
      retry: [__('Schedule Retry'), __('Retry migration immediately'), __('Select date and time to retry migration')]
    };

    const modalTitle = plan => MODAL_STRINGS[modalMode(plan)][0];

    const modalBodyStrings = plan => [MODAL_STRINGS[modalMode(plan)][1], MODAL_STRINGS[modalMode(plan)][2]];

    const { migrationScheduled, migrationCutover } = getPlanScheduleInfo(scheduleMigrationPlan);
    const defaultDate = isPlanWarmMigration(scheduleMigrationPlan)
      ? new Date(migrationCutover)
      : new Date(migrationScheduled);

    return (
      <Modal show={scheduleMigrationModal} onHide={modalClose} backdrop="static">
        <Modal.Header>
          <Modal.CloseButton onClick={modalClose} />
          <Modal.Title>{modalTitle(scheduleMigrationPlan)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScheduleMigrationModalBody
            handleDatepickerChange={handleDatepickerChange}
            setScheduleMode={setScheduleMode}
            defaultDate={defaultDate}
            startNowLabel={modalBodyStrings(scheduleMigrationPlan)[0]}
            startLaterLabel={modalBodyStrings(scheduleMigrationPlan)[1]}
            showDatepicker={!this.state.startMigrationNow}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" className="btn-cancel" onClick={modalClose}>
            {__('Cancel')}
          </Button>
          <Button
            bsStyle="primary"
            onClick={() => {
              if (modalMode(scheduleMigrationPlan) === 'cutover') {
                let cutoverDatetime = this.state.dateTimeInput;
                if (this.state.startMigrationNow) {
                  // now == schedule warm migration cutover 2 minutes from now
                  cutoverDatetime = moment(new Date())
                    .add(2, 'm')
                    .toDate();
                }
                scheduleCutover({
                  plan: scheduleMigrationPlan,
                  cutoverTime: cutoverDatetime
                }).then(() => {
                  fetchTransformationPlansAction({
                    url: fetchTransformationPlansUrl,
                    archived: false
                  });
                });
              } else if (this.state.startMigrationNow) {
                scheduleMigrationNow(scheduleMigrationPlan.href);
                toggleScheduleMigrationModal();
              } else {
                scheduleMigration({
                  plan: scheduleMigrationPlan,
                  scheduleTime: this.state.dateTimeInput
                }).then(() => {
                  fetchTransformationPlansAction({
                    url: fetchTransformationPlansUrl,
                    archived: false
                  });
                });
              }
            }}
          >
            {__('Schedule')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ScheduleMigrationModal.propTypes = {
  scheduleMigrationModal: PropTypes.bool,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  scheduleMigrationNow: PropTypes.func,
  scheduleCutover: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string
};

export default ScheduleMigrationModal;
