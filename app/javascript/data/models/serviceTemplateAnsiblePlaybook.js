import { string, object } from 'yup';

export const playbookSchema = object().shape({
  href: string().required(),
  id: string().required(),
  name: string().required(),
  description: string().nullable()
});
