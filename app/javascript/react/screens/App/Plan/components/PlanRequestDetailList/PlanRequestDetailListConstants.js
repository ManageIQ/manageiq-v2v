import { V2V_MIGRATION_STATUS_MESSAGES, STATUS_MESSAGE_KEYS } from '../../PlanConstants';

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
      { title: V2V_MIGRATION_STATUS_MESSAGES[STATUS_MESSAGE_KEYS.VALIDATING], id: STATUS_MESSAGE_KEYS.VALIDATING },
      {
        title: V2V_MIGRATION_STATUS_MESSAGES[STATUS_MESSAGE_KEYS.PRE_MIGRATION],
        id: STATUS_MESSAGE_KEYS.PRE_MIGRATION
      },
      { title: V2V_MIGRATION_STATUS_MESSAGES[STATUS_MESSAGE_KEYS.MIGRATING], id: STATUS_MESSAGE_KEYS.MIGRATING },
      {
        title: V2V_MIGRATION_STATUS_MESSAGES[STATUS_MESSAGE_KEYS.VM_MIGRATIONS_COMPLETED],
        id: STATUS_MESSAGE_KEYS.VM_MIGRATIONS_COMPLETED
      },
      {
        title: V2V_MIGRATION_STATUS_MESSAGES[STATUS_MESSAGE_KEYS.VM_MIGRATIONS_FAILED],
        id: STATUS_MESSAGE_KEYS.VM_MIGRATIONS_FAILED
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
