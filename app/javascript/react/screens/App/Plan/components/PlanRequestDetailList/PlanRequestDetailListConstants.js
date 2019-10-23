import { MIGRATION_STATUS_MESSAGE_MAP } from '../../PlanConstants';

export const FINISHED_PLAN_FILTER_TYPES = [
  {
    id: 'vmName',
    title: __('VM Name'),
    placeholder: __('Filter by VM Name'),
    filterType: 'text'
  },
  {
    id: 'status',
    title: __('Status'),
    placeholder: __('Filter by Status'),
    filterType: 'select',
    filterValues: [{ title: __('Ok'), id: 'Ok' }, { title: __('Error'), id: 'Error' }]
  }
];

export const ACTIVE_PLAN_FILTER_TYPES = [
  {
    id: 'vmName',
    title: __('VM Name'),
    placeholder: __('Filter by VM Name'),
    filterType: 'text'
  },
  {
    id: 'message',
    title: __('Status'),
    placeholder: __('Filter by Status'),
    filterType: 'select',
    filterValues: [
      {
        title: MIGRATION_STATUS_MESSAGE_MAP.VALIDATING.text,
        id: MIGRATION_STATUS_MESSAGE_MAP.VALIDATING.apiString
      },
      {
        title: MIGRATION_STATUS_MESSAGE_MAP.PRE_MIGRATION.text,
        id: MIGRATION_STATUS_MESSAGE_MAP.PRE_MIGRATION.apiString
      },
      {
        title: MIGRATION_STATUS_MESSAGE_MAP.MIGRATING.text,
        id: MIGRATION_STATUS_MESSAGE_MAP.MIGRATING.apiString
      },
      {
        title: MIGRATION_STATUS_MESSAGE_MAP.VM_TRANSFORMATIONS_COMPLETED.text,
        id: MIGRATION_STATUS_MESSAGE_MAP.VM_TRANSFORMATIONS_COMPLETED.apiString
      },
      {
        title: MIGRATION_STATUS_MESSAGE_MAP.VM_TRANSFORMATIONS_COMPLETED.text,
        id: MIGRATION_STATUS_MESSAGE_MAP.VM_TRANSFORMATIONS_FAILED.apiString
      }
    ]
  }
];

export const FINISHED_PLAN_SORT_FIELDS = [
  { id: 'elapsedTime', title: __('Elapsed Time'), isNumeric: false },
  {
    id: 'vmName',
    title: __('VM Name'),
    isNumeric: false
  },
  { id: 'status', title: __('Status'), isNumeric: false }
];

export const ACTIVE_PLAN_SORT_FIELDS = [
  { id: 'elapsedTime', title: __('Elapsed Time'), isNumeric: false },
  {
    id: 'vmName',
    title: __('VM Name'),
    isNumeric: false
  },
  { id: 'message', title: __('Status'), isNumeric: false }
];
