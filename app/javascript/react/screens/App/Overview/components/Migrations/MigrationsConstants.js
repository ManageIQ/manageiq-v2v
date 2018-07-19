export const MIGRATIONS_NOT_STARTED_SORT_FIELDS = [
  { id: 'name', title: __('Name'), isNumeric: false },
  {
    id: 'infraMappingName',
    title: __('Infrastructure Mapping'),
    isNumeric: false
  },
  {
    id: 'configVmLength',
    title: __('Number of VMs'),
    isNumeric: true
  },
  { id: 'scheduleTime', title: __('Scheduled Time'), isNumeric: true }
];

export const MIGRATIONS_COMPLETED_SORT_FIELDS = [
  { id: 'name', title: __('Name'), isNumeric: false },
  { id: 'status', title: __('Status'), isNumeric: false }
];
