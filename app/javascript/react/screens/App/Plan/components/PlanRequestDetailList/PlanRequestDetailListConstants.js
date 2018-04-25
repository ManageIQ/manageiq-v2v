export const FINISHED_PLAN_FILTER_TYPES = [
  {
    id: 'transformation_host_name',
    title: 'Host Name',
    placeholder: 'Filter by Host Name',
    filterType: 'text'
  },
  {
    id: 'status',
    title: 'Status',
    placeholder: 'Filter by Status',
    filterType: 'select',
    filterValues: [{ title: 'Ok', id: 'Ok' }, { title: 'Error', id: 'Error' }]
  }
];

export const ACTIVE_PLAN_FILTER_TYPES = [
  {
    id: 'transformation_host_name',
    title: 'Host Name',
    placeholder: 'Filter by Host Name',
    filterType: 'text'
  },
  {
    id: 'message',
    title: 'Status',
    placeholder: 'Filter by Status',
    filterType: 'select',
    filterValues: [
      { title: 'Pending', id: 'Pending' },
      { title: 'Validating', id: 'Validating' },
      { title: 'Pre-migration', id: 'Pre-migration' },
      { title: 'Migrating', id: 'Migrating' },
      {
        title: 'VM Transformations completed',
        id: 'VM Transformations completed'
      }
    ]
  }
];

export const FINISHED_PLAN_SORT_FIELDS = [
  { id: 'delivered_on', title: 'Started', isNumeric: true },
  {
    id: 'transformation_host_name',
    title: 'Host Name',
    isNumeric: false
  },
  { id: 'status', title: 'Status', isNumeric: false }
];

export const ACTIVE_PLAN_SORT_FIELDS = [
  { id: 'delivered_on', title: 'Started', isNumeric: true },
  {
    id: 'transformation_host_name',
    title: 'Host Name',
    isNumeric: false
  },
  { id: 'message', title: 'Status', isNumeric: false }
];
