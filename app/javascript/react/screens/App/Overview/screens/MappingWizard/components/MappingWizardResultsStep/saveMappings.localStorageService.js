import {
  getLocalStorageState,
  saveLocalStorageState,
  LOCAL_STORAGE_KEYS
} from '../../../../../../../../common/LocalStorage';

const _formatLocalStorageMappings = mapping => {
  // emulate server response
  const mapped = mapping.transformation_mapping_items.map((item, i) => {
    item = item.setIn(['source_id'], item.source.split('/').slice(-1)[0]);
    item = item.setIn(
      ['destination_id'],
      item.destination.split('/').slice(-1)[0]
    );
    if (item.source.indexOf('clusters') > -1) {
      item = item.setIn(['source_type'], 'EmsCluster');
    }
    if (item.destination.indexOf('clusters') > -1) {
      item = item.setIn(['destination_type'], 'EmsCluster');
    }
    if (item.source.indexOf('data_stores') > -1) {
      item = item.setIn(['source_type'], 'Storage');
    }
    if (item.destination.indexOf('data_stores') > -1) {
      item = item.setIn(['destination_type'], 'Storage');
    }
    if (item.source.indexOf('lans') > -1) {
      item = item.setIn(['source_type'], 'Lan');
    }
    if (item.destination.indexOf('lans') > -1) {
      item = item.setIn(['destination_type'], 'Lan');
    }
    return item;
  });
  return mapping.set('transformation_mapping_items', mapped);
};

export const saveMappingToLocalStorage = mapping => {
  let existingMappings = getLocalStorageState(
    LOCAL_STORAGE_KEYS.V2V_TRANSFORMATION_MAPPINGS
  );
  let formattedMapping = _formatLocalStorageMappings(mapping);
  formattedMapping = formattedMapping.set('created_at', new Date().toString());
  if (existingMappings) {
    const existingIndex = existingMappings.findIndex(
      m => m.name === formattedMapping.name
    );
    if (existingIndex > -1) {
      formattedMapping = formattedMapping.set('id', existingIndex.toString());
      existingMappings[existingIndex] = formattedMapping;
    } else {
      formattedMapping = formattedMapping.set(
        'id',
        existingMappings.length.toString()
      );
      existingMappings.push(formattedMapping);
    }
  } else {
    formattedMapping = formattedMapping.set('id', '0');
    existingMappings = [formattedMapping];
  }

  saveLocalStorageState(
    LOCAL_STORAGE_KEYS.V2V_TRANSFORMATION_MAPPINGS,
    existingMappings
  );
  return {
    results: [formattedMapping]
  };
};
