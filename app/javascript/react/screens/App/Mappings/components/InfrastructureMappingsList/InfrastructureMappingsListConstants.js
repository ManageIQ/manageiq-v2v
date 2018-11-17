export const INFRA_MAPPINGS_FILTER_TYPES = [
  {
    id: 'name',
    title: __('Name'),
    placeholder: __('Filter by Name'),
    filterType: 'text'
  },
  {
    id: 'description',
    title: __('Description'),
    placeholder: __('Filter by Description'),
    filterType: 'text'
  }
];

export const INFRA_MAPPINGS_SORT_FIELDS = [
  {
    id: 'name',
    title: __('Name'),
    isNumeric: false
  },
  {
    id: 'associatedPlansCount',
    title: __('Number of Associated Plans'),
    isNumeric: true
  }
];

export const MAPPING_TYPE_RESOURCE_MAP = {
  openstack: {
    networks: {
      source: 'Lan',
      target: 'CloudNetwork'
    }
  },
  rhevm: {
    networks: {
      source: 'Lan',
      target: 'Lan'
    }
  }
};
