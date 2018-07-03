import { array, string, object } from 'yup';

export const plansSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      name: string().required(),
      description: string().nullable(),
      options: object()
        .shape({
          config_info: object().shape({
            transformation_mapping_id: string().required(),
            vm_ids: array()
              .of(string())
              .required()
          })
        })
        .required(),
      created_at: string().required(),
      miq_requests: array()
        .of(
          object().shape({
            href: string().required(),
            id: string().required(),
            description: string().required(),
            created_on: string().required(),
            updated_on: string().nullable(),
            fulfilled_on: string().nullable(),
            request_state: string().required(),
            status: string().required(),
            options: object()
              .shape({
                src_id: string(),
                delivered_on: string().nullable()
              })
              .required()
          })
        )
        .nullable()
    })
  )
  .nullable();
