import { string, object } from 'yup';

export const schedulesSchema = object().shape({
  href: string().required(),
  id: string().required(),
  run_at: object()
    .shape({
      start_time: string().required()
    })
    .required()
});
