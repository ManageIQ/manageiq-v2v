import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'patternfly-react';

const DeleteMigrationMenuItem = ({
  showConfirmModalAction,
  hideConfirmModalAction,
  deleteTransformationPlanAction,
  addNotificationAction,
  fetchTransformationPlansAction,
  deleteTransformationPlanUrl,
  fetchTransformationPlansUrl,
  fetchArchivedTransformationPlansUrl,
  planId,
  planName,
  archived,
  fetchTransformationMappingsAction,
  fetchTransformationMappingsUrl
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
    deleteTransformationPlanAction(deleteTransformationPlanUrl, planId)
      .then(() => {
        addNotificationAction({
          message: sprintf(__('%s successfully deleted'), planName),
          notificationType: 'success'
        });
        return fetchTransformationPlansAction({
          url: !archived ? fetchTransformationPlansUrl : fetchArchivedTransformationPlansUrl,
          archived
        });
      })
      .then(() => fetchTransformationMappingsAction(fetchTransformationMappingsUrl))
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
};

DeleteMigrationMenuItem.propTypes = {
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  deleteTransformationPlanAction: PropTypes.func,
  addNotificationAction: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  deleteTransformationPlanUrl: PropTypes.string,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchArchivedTransformationPlansUrl: PropTypes.string,
  planId: PropTypes.string,
  planName: PropTypes.string,
  archived: PropTypes.bool,
  fetchTransformationMappingsAction: PropTypes.func,
  fetchTransformationMappingsUrl: PropTypes.string
};

DeleteMigrationMenuItem.defaultProps = {
  archived: false
};

export default DeleteMigrationMenuItem;
