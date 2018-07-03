import { array, string, object } from 'yup';

export const networksSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      switch_id: string().required(),
      name: string().required(),
      uid_ems: string().required()
    })
  )
  .nullable();
