export const addAssociatedPlansCount = mappings =>
  mappings.map(mapping => {
    mapping.associatedPlansCount = mapping.service_templates && mapping.service_templates.length;
    return mapping;
  });
