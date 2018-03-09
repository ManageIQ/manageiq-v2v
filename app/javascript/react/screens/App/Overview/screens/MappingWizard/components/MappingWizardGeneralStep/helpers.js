export const asyncValidate = (values, dispatch, props) => {
  return new Promise(resolve => {
    resolve();
  }).then(() => {
    const { name: newTransformationName } = values;
    const { transformationMappings } = props;
    const existingTransformationNames = transformationMappings.reduce(
      (names, transformationMapping) => {
        return [...names, transformationMapping.name.trim()];
      },
      []
    );
    const duplicateName = existingTransformationNames.find(
      existingTransformationName => {
        return existingTransformationName === newTransformationName.trim();
      }
    );
    if (duplicateName) {
      throw { name: 'Please enter a unique name' };
    }
  });
};

export const onChange = (values, dispatch, props) => {
  if (props.valid) {
    props.hideAlertAction();
  }
};
