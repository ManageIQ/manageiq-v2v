export const asyncValidate = (values, dispatch, props) =>
  new Promise((resolve, reject) => {
    const { name: newPlanName } = values;
    const { transformationPlans, archivedTransformationPlans, editingPlan } = props;
    const existingTransformationPlanNames = transformationPlans.reduce(
      (names, plan) => [...names, plan.name.trim()],
      []
    );
    const existingArchivedPlanNames = archivedTransformationPlans.reduce(
      (names, plan) => [...names, plan.name.trim()],
      []
    );

    const allPlanNames = [...existingTransformationPlanNames, ...existingArchivedPlanNames];
    const duplicateName = allPlanNames.find(existingPlanName => existingPlanName === newPlanName.trim());
    const duplicateIsEditingPlanName = editingPlan && duplicateName === editingPlan.name;

    if (duplicateName && !duplicateIsEditingPlanName) {
      props.showAlertAction(sprintf(__('Name %s already exists'), newPlanName));
      const error = { name: 'Please enter a unique name' };
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
