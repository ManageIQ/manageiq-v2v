import { array, string, object } from 'yup';

export const datastoresSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required()
    })
  )
  .nullable();
