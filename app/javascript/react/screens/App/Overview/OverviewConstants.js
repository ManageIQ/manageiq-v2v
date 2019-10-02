// reminder... we need to go back and prefix these: V2V_
export const SHOW_PLAN_WIZARD = 'SHOW_PLAN_WIZARD';
export const SHOW_PLAN_WIZARD_EDIT_MODE = 'SHOW_PLAN_WIZARD_EDIT_MODE';
export const HIDE_PLAN_WIZARD = 'HIDE_PLAN_WIZARD';
export const SHOW_EDIT_PLAN_TITLE_MODAL = 'SHOW_EDIT_PLAN_TITLE_MODAL';
export const HIDE_EDIT_PLAN_TITLE_MODAL = 'HIDE_EDIT_PLAN_TITLE_MODAL';
export const PLAN_WIZARD_EXITED = 'PLAN_WIZARD_EXITED';
export const PLAN_WIZARD_NEXT = 'PLAN_WIZARD_NEXT';
export const PLAN_WIZARD_BACK = 'PLAN_WIZARD_BACK';
export const CONTINUE_TO_PLAN = 'CONTINUE_TO_PLAN';
export const V2V_SET_MIGRATIONS_FILTER = 'V2V_SET_MIGRATIONS_FILTER';
export const V2V_AUTO_SET_MIGRATIONS_FILTER = 'V2V_AUTO_SET_MIGRATIONS_FILTER';
export const V2V_RETRY_MIGRATION = 'V2V_RETRY_MIGRATION';
export const V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL = 'V2V_TOGGLE_SCHEDULE_MIGRATION_MODAL';
export const V2V_SCHEDULE_MIGRATION = 'V2V_SCHEDULE_MIGRATION';
export const V2V_EDIT_PLAN_REQUEST = 'V2V_EDIT_PLAN_REQUEST';
export const V2V_CANCEL_PLAN_REQUEST = 'V2V_CANCEL_PLAN_REQUEST';
export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL';
export const HIDE_CONFIRM_MODAL = 'HIDE_CONFIRM_MODAL';
export const ARCHIVE_TRANSFORMATION_PLAN = 'ARCHIVE_TRANSFORMATION_PLAN';
export const DELETE_TRANSFORMATION_PLAN = 'DELETE_TRANSFORMATION_PLAN';

export const FETCH_V2V_TRANSFORMATION_MAPPINGS = 'FETCH_V2V_TRANSFORMATION_MAPPINGS';

export const FETCH_V2V_TRANSFORMATION_PLANS = 'FETCH_V2V_TRANSFORMATION_PLANS';
export const FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS = 'FETCH_V2V_SERVICE_TEMPLATE_ANSIBLE_PLAYBOOKS';
export const FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS = 'FETCH_V2V_ARCHIVED_TRANSFORMATION_PLANS';

export const CREATE_V2V_TRANSFORMATION_PLAN_REQUEST = 'CREATE_V2V_TRANSFORMATION_PLAN_REQUEST';

export const FETCH_V2V_ALL_REQUESTS_WITH_TASKS = 'FETCH_V2V_ALL_REQUESTS_WITH_TASKS';
export const FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS = 'FETCH_V2V_ALL_ARCHIVED_PLAN_REQUESTS_WITH_TASKS';

export const MIGRATIONS_FILTERS = {
  notStarted: __('Not Started Plans'),
  inProgress: __('In Progress Plans'),
  completed: __('Completed Plans'),
  archived: __('Archived Plans')
};

export const OSP_TENANT = 'CloudTenant';
export const OSP_VOLUME = 'CloudVolumeType';
export const OSP_NETWORK = 'CloudNetwork';
export const EMS_CLUSTER = 'EmsCluster';

export const FETCH_TRANSFORMATION_PLANS_URL =
  '/api/service_templates/?' +
  "filter[]=type='ServiceTemplateTransformationPlan'" +
  '&filter[]=active=true' +
  '&expand=resources,schedules' +
  '&attributes=name,description,miq_requests,options,created_at,transformation_mapping,transformation_mapping.transformation_mapping_items' +
  '&sort_by=updated_at' +
  '&sort_order=desc';

export const FETCH_ARCHIVED_TRANSFORMATION_PLANS_URL =
  '/api/service_templates/?' +
  "filter[]=type='ServiceTemplateTransformationPlan'" +
  '&filter[]=archived=true' +
  '&expand=resources' +
  '&attributes=name,description,miq_requests,options,created_at,transformation_mapping' +
  '&sort_by=updated_at' +
  '&sort_order=desc';

export const TRANSFORMATION_PLAN_REQUESTS_URL = '/api/requests';

export const WAITING_FOR_CONVERSION_HOST_MESSAGE =
  __('Waiting for an available conversion host. You can continue waiting or go to the Migration Settings page to increase the number of migrations per host'); // prettier-ignore
