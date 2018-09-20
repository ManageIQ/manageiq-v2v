export const asyncValidate = (values, dispatch, props) =>
  new Promise((resolve, reject) => {
    const { name: newTransformationName } = values;
    const { transformationMappings, editingMapping } = props;
    const existingTransformationNames = transformationMappings.reduce(
      (names, transformationMapping) => [...names, transformationMapping.name.trim()],
      []
    );
    const duplicateName = existingTransformationNames.find(
      existingTransformationName => existingTransformationName === newTransformationName.trim()
    );
    const duplicateIsEditingMappingName = editingMapping && duplicateName === editingMapping.name;

    if (duplicateName && !duplicateIsEditingMappingName) {
      props.showAlertAction(sprintf(__('Infrastructure mapping %s already exists'), newTransformationName));
      const error = { name: __('Please enter a unique name') };
      reject(error);
    } else {
      resolve();
    }
  });

export const onChange = (values, dispatch, props) => {
  if (props.valid) {
    props.hideAlertAction();
  }
};
