import { array, string, object } from 'yup';

export const serviceTemplatePlaybookSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      name: string().required()
    })
  )
  .nullable();
