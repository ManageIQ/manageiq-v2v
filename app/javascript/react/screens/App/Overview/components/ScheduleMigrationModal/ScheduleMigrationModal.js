import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'patternfly-react';
import ScheduleMigrationModalBody from './ScheduleMigrationModalBody';
import getPlanScheduleInfo from '../Migrations/helpers/getPlanScheduleInfo';

class ScheduleMigrationModal extends React.Component {
  constructor(props) {
    super(props);

    const { scheduleMigrationPlan } = this.props;
    const { migrationScheduled } = getPlanScheduleInfo(scheduleMigrationPlan) || '';

    this.state = {
      dateTimeInput: migrationScheduled ? new Date(migrationScheduled) : null,
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
      migrateClick
    } = this.props;

    const handleDatepickerChange = event => {
      this.setState({ dateTimeInput: event });
    };

    const startMigrationNowHandler = event => {
      this.setState({ startMigrationNow: event });
    };

    const modalClose = () => {
      toggleScheduleMigrationModal();
    };

    const modalTitle = plan =>
      plan != null && (plan.status === 'Error' || plan.status === 'Denied')
        ? __('Schedule Retry')
        : __('Schedule Migration');

    return (
      <Modal show={scheduleMigrationModal} onHide={modalClose} backdrop="static">
        <Modal.Header>
          <Modal.CloseButton onClick={modalClose} />
          <Modal.Title>{modalTitle(scheduleMigrationPlan)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScheduleMigrationModalBody
            handleDatepickerChange={handleDatepickerChange}
            startMigrationNowHandler={startMigrationNowHandler}
            defaultDate={this.state.dateTimeInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" className="btn-cancel" onClick={modalClose}>
            {__('Cancel')}
          </Button>
          <Button
            bsStyle="primary"
            onClick={() => {
              if (this.state.startMigrationNow) {
                migrateClick(scheduleMigrationPlan.href);
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
  migrateClick: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string
};

export default ScheduleMigrationModal;
