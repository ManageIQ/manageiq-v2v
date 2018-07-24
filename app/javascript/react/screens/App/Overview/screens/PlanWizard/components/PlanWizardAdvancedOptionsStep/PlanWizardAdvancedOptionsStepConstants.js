export const FETCH_V2V_PLAYBOOKS = 'FETCH_V2V_PLAYBOOKS';
export const SET_V2V_ADVANCED_OPTIONS_STEP_VMS = 'SET_V2V_ADVANCED_OPTIONS_STEP_VMS';
export const RESET_V2V_ADVANCED_OPTIONS_STEP_VMS = 'RESET_V2V_ADVANCED_OPTIONS_STEP_VMS';

export const FILTER_TYPES = [
  {
    id: 'name',
    title: __('VM Name'),
    placeholder: __('Filter by VM Name'),
    filterType: 'text'
  },
  {
    id: 'cluster',
    title: __('Source Cluster'),
    placeholder: __('Filter by Source Cluster'),
    filterType: 'text'
  }
];
