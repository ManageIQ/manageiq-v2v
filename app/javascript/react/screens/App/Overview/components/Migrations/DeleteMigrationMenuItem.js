import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'patternfly-react';

const DeleteMigrationMenuItem = ({
  showConfirmModalAction,
  hideConfirmModalAction,
  deletePlanAction,
  addNotificationAction,
  fetchTransformationPlansAction,
  deletePlanUrl,
  fetchTransformationPlansUrl,
  planId,
  planName
}) => {
  const confirmModalBaseProps = {
    title: __('Delete Migration Plan'),
    body: (
      <p>
        {__('Are you sure you want to delete the migration plan ')}
        <strong>{planName}</strong>?
      </p>
    ),
    confirmButtonLabel: __('Delete')
  };

  const onConfirm = () => {
    showConfirmModalAction({
      ...confirmModalBaseProps,
      disableCancelButton: true,
      disableConfirmButton: true
    });
    deletePlanAction(deletePlanUrl, planId)
      .then(() => {
        addNotificationAction({
          message: sprintf(__('%s successfully deleted'), planName),
          notificationType: 'success'
        });
        return fetchTransformationPlansAction({
          url: fetchTransformationPlansUrl,
          archived: false
        });
      })
      .then(() => {
        hideConfirmModalAction();
      });
  };

  return (
    <MenuItem
      onClick={e => {
        e.stopPropagation();
        showConfirmModalAction({
          ...confirmModalBaseProps,
          onConfirm
        });
      }}
    >
      {__('Delete')}
    </MenuItem>
  );
}

DeleteMigrationMenuItem.propTypes = {
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  deletePlanAction: PropTypes.func,
  addNotificationAction: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  deletePlanUrl: PropTypes.string,
  fetchTransformationPlansUrl: PropTypes.string,
  planId: PropTypes.string,
  planName: PropTypes.string
};

export default DeleteMigrationMenuItem;
