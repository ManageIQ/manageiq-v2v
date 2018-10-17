import { SOURCE_HREF_SLUGS, DESTINATION_HREF_SLUGS } from './MappingWizardResultsStepConstants';

const normalizeTransformationItem = (transformationItem, targetProvider) => ({
  source: `${SOURCE_HREF_SLUGS[transformationItem.source_type]}${transformationItem.source_id}`,
  destination: `${DESTINATION_HREF_SLUGS[targetProvider][transformationItem.destination_type]}${
    transformationItem.destination_id
  }`
});

export const transformationHasBeenEdited = (transformation, postBody, targetProvider) => {
  const originalTransformationItems = JSON.stringify(
    transformation.transformation_mapping_items.map(item => normalizeTransformationItem(item, targetProvider))
  );
  const currentTransformationItems = JSON.stringify(postBody.transformation_mapping_items);

  return (
    transformation.name !== postBody.name ||
    transformation.description !== postBody.description ||
    originalTransformationItems !== currentTransformationItems
  );
};
