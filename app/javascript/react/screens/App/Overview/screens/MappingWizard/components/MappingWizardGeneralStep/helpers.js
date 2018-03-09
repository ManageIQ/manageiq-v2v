export const asyncValidate = (values, dispatch, props) =>
  new Promise(resolve => {
    resolve();
  }).then(() => {
    const { name: newTransformationName } = values;
    const { transformationMappings } = props;
    const existingTransformationNames = transformationMappings.reduce(
      (names, transformationMapping) => [
        ...names,
        transformationMapping.name.trim()
      ],
      []
    );
    const duplicateName = existingTransformationNames.find(
      existingTransformationName =>
        existingTransformationName === newTransformationName.trim()
    );
    if (duplicateName) {
      props.showAlertAction(
        sprintf(
          __('Infrastructure mapping %s already exists'),
          newTransformationName
        )
      );
      const err = { name: 'Please enter a unique name' };
      throw err;
    }
  });

export const onChange = (values, dispatch, props) => {
  if (props.valid) {
    props.hideAlertAction();
  }
};
