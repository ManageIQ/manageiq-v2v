export const getLocalStorageState = key => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveLocalStorageState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.err(err);
  }
};

export const LOCAL_STORAGE_KEYS = {
  V2V_TRANSFORMATION_MAPPINGS: 'V2V_TRANSFORMATION_MAPPINGS',
  V2V_PLANS: 'V2V_PLANS'
};
