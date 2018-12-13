import { array, string, object } from 'yup';

export const providersSchema = array()
  .of(
    object().shape({
      href: string().required(),
      type: string().required(),
      id: string().required(),
      authentications: array().nullable()
    })
  )
  .nullable();
