export const FETCH_V2V_PLAN_REQUEST = 'FETCH_V2V_PLAN_REQUEST';
export const FETCH_V2V_PLAN = 'FETCH_V2V_PLAN';
export const FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN = 'FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN';
export const QUERY_V2V_PLAN_VMS = 'QUERY_V2V_PLAN_VMS';
export const RESET_PLAN_STATE = 'RESET_PLAN_STATE';
export const FETCH_V2V_MIGRATION_TASK_LOG = 'FETCH_V2V_MIGRATION_TASK_LOG';
export const DOWNLOAD_LOG_CLICKED = 'DOWNLOAD_LOG_CLICKED';
export const DOWNLOAD_LOG_COMPLETED = 'DOWNLOAD_LOG_COMPLETED';
export const FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE = 'FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE';
export const FETCH_V2V_ORCHESTRATION_STACK = 'FETCH_V2V_ORCHESTRATION_STACK';
export const CANCEL_V2V_PLAN_REQUEST_TASKS = 'CANCEL_V2V_PLAN_REQUEST_TASKS';
export const REMOVE_TASKS_SELECTED_FOR_CANCELLATION = 'REMOVE_TASKS_SELECTED_FOR_CANCELLATION';
export const UPDATE_TASKS_SELECTED_FOR_CANCELLATION = 'UPDATE_TASKS_SELECTED_FOR_CANCELLATION';
export const DELETE_ALL_TASKS_SELECTED_FOR_CANCELLATION = 'DELETE_ALL_TASKS_SELECTED_FOR_CANCELLATION';
export const ADD_TASKS_TO_MARKED_FOR_CANCELLATION = 'ADD_TASKS_TO_MARKED_FOR_CANCELLATION';
export const ADD_TASK_TO_NOTIFICATION_SENT_LIST = 'ADD_TASK_TO_NOTIFICATION_SENT_LIST';
export const FETCH_V2V_REQUEST_TASK = 'FETCH_V2V_REQUEST_TASK';
export const FETCH_V2V_CONVERSION_HOST = 'FETCH_V2V_CONVERSION_HOST';

export const REQUEST_TASKS_URL = '/api/request_tasks';

export const MIGRATION_STATUS_MESSAGE_MAP = {
  ACQUIRE_TRANSFORMATION_HOST: { apiString: 'Acquire Transformation Host', text: __('Acquire Transformation Host') },
  ASSESS_MIGRATION: { apiString: 'Assess Migration', text: __('Assess Migration') },
  AUTOMATION_STARTING: { apiString: 'Automation Starting', text: __('Automation Starting') },
  COLLAPSE_SNAPSHOTS: { apiString: 'Collapse Snapshots', text: __('Collapse Snapshots') },
  CONVERT_DISKS: { apiString: 'Convert disks', text: __('Convert disks') },
  CONVERTING_DISKS: { apiString: 'Converting disks', text: __('Converting disks') },
  FAILED: { apiString: 'Failed', text: __('Failed') },
  SOURCE_MIGRATED: { apiString: 'Mark source as migrated', text: __('Marking source as migrated') },
  MIGRATING: { apiString: 'Migrating', text: __('Migrating') },
  MIGRATION_COMPLETE: { apiString: 'Migration complete', text: __('Migration complete') },
  POST_MIGRATION: { apiString: 'Post-migration', text: __('Postmigration') },
  POWER_OFF: { apiString: 'Power off', text: __('Power off') },
  POWER_ON: { apiString: 'Power-on VM', text: __('Power-on VM') },
  SHUTTING_DOWN_VM: { apiString: 'Shutting down virtual machine', text: __('Shutting down virtual machine') },
  POWERING_ON_VM: { apiString: 'Power on virtual machine', text: __('Powering on virtual machine') },
  PRE_MIGRATION: { apiString: 'Pre-migration', text: __('Premigration') },
  PRE_TRANSFORM_VM: { apiString: 'Pre Transform VM', text: __('Premigrate VM') },
  REFRESH_INVENTORY: { apiString: 'Refresh inventory', text: __('Refresh inventory') },
  RESTORE_VM_ATTRIBUTES: { apiString: 'Restore VM Attributes', text: __('Restoring VM Attributes') },
  RUN_PRE_MIGRATION_PLAYBOOK: { apiString: 'Run pre-migration playbook', text: __('Run premigration playbook') },
  RUN_POST_MIGRATION_PLAYBOOK: { apiString: 'Run post-migration playbook', text: __('Run postmigration playbook') },
  RUNNING_PRE_MIGRATION_PLAYBOOK: {
    apiString: 'Running pre-migration playbook',
    text: __('Running premigration playbook')
  },
  RUNNING_POST_MIGRATION_PLAYBOOK: {
    apiString: 'Running post-migration playbook',
    text: __('Running postmigration playbook')
  },
  TRANSFORM_VM: { apiString: 'Transform VM', text: __('Migrate VM') },
  UPDATE_DESCRIPTION: { apiString: 'Update description of VM', text: __('Update description of VM') },
  VALIDATING: { apiString: 'Validating', text: __('Validating') },
  VM_TRANSFORMATIONS_COMPLETED: { apiString: 'VM Transformations completed', text: __('VM migrations completed') },
  VM_MIGRATED: { apiString: 'Virtual machine migrated', text: __('Virtual machine migrated') },
  VM_TRANSFORMATIONS_FAILED: { apiString: 'VM Transformations failed', text: __('VM migrations failed') },
  CANCELLED: { apiString: 'VM cancelled', text: __('VM cancelled') },
  PRECOPYING: { apiString: 'Precopying disks', text: __('Pre-copying disks') },
  WAITING_FOR_IP: { apiString: 'Waiting for VM IP address', text: __('Waiting for VM IP address') },
  WAITING_FOR_INVENTORY_REFRESH: { apiString: 'Identify destination VM', text: __('Waiting for inventory refresh') },
  APPLYING_RIGHT_SIZING: {
    apiString: 'Apply Right-Sizing Recommendation',
    text: __('Applying Right-Sizing Recommendation')
  },
  ABORTING_VIRTV2V: { apiString: 'Abort virt-v2v operation', text: __('Aborting virt-v2v operation') }
};

const STATUS_MESSAGES_BY_API_STRING = Object.keys(MIGRATION_STATUS_MESSAGE_MAP).reduce((messages, id) => {
  const message = MIGRATION_STATUS_MESSAGE_MAP[id];
  return { ...messages, [message.apiString]: message.text };
}, {});

export const migrationStatusMessage = apiString => STATUS_MESSAGES_BY_API_STRING[apiString] || apiString || '';

const DOWNLOAD_LOG_STATUS_MESSAGES = {};
DOWNLOAD_LOG_STATUS_MESSAGES.DOWNLOAD_LOG_ERROR_NO_HOST = __('Conversion host was not found');
DOWNLOAD_LOG_STATUS_MESSAGES.DOWNLOAD_LOG_ERROR_NO_CREDS_SET = __('Credentials not set on conversion host');
DOWNLOAD_LOG_STATUS_MESSAGES.DOWNLOAD_LOG_ERROR_SCP_ISSUE = __('Log file was not found on conversion host');

const BACKEND_ERROR_MESSAGES = {};
BACKEND_ERROR_MESSAGES.DOWNLOAD_LOG_ERROR_NO_HOST =
  'Conversion host was not found. Download of transformation log aborted.';
BACKEND_ERROR_MESSAGES.DOWNLOAD_LOG_ERROR_NO_CREDS_SET =
  'Credential was not found for host [^]*. Download of transformation log aborted.';
BACKEND_ERROR_MESSAGES.DOWNLOAD_LOG_ERROR_SCP_ISSUE =
  'Download of transformation log for [^]* with ID [^]* failed with error: [^]*';

export { DOWNLOAD_LOG_STATUS_MESSAGES as V2V_DOWNLOAD_LOG_STATUS_MESSAGES };
export { BACKEND_ERROR_MESSAGES as V2V_BACKEND_ERROR_MESSAGES };
