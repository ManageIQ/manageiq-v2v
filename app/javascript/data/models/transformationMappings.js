import { array, string, object } from 'yup';

export const mappingsSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      name: string().required(),
      created_at: string().required(),
      service_templates: array()
        .of(
          object().shape({
            id: string().required(),
            name: string().required()
          })
        )
        .nullable(),
      transformation_mapping_items: array()
        .of(
          object().shape({
            id: string().required(),
            source_id: string().required(),
            source_type: string().required(),
            destination_id: string().required(),
            destination_type: string().required(),
            transformation_mapping_id: string().required()
          })
        )
        .required()
    })
  )
  .nullable();
