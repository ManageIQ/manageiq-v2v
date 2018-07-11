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
      { title: __('Pending'), id: 'Pending' },
      { title: __('Validating'), id: 'Validating' },
      { title: __('Pre-migration'), id: 'Pre-migration' },
      { title: __('Migrating'), id: 'Migrating' },
      {
        title: __('VM Transformations completed'),
        id: 'VM Transformations completed'
      },
      {
        title: __('VM Transformations failed'),
        id: 'VM Transformations failed'
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
