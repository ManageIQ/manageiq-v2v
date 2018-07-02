import { array, string, object } from 'yup';

export const requestsSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      description: string().nullable(),
      approval_state: string().nullable(),
      created_on: string().required(),
      updated_on: string().nullable(),
      fulfilled_on: string().nullable(),
      request_state: string().nullable(),
      status: string(),
      options: object()
        .shape({
          delivered_on: string()
        })
        .required(),
      miq_request_tasks: array()
        .of(
          object().shape({
            href: string().required(),
            id: string().required(),
            description: string().required(),
            state: string().required(),
            options: object()
              .shape({
                src_id: string(),
                delivered_on: string().nullable(),
                transformation_host_name: string().nullable()
              })
              .required(),
            created_on: string().required(),
            updated_on: string().nullable(),
            message: string().required(),
            status: string().required()
          })
        )
        .nullable()
    })
  )
  .nullable();
