import { array } from 'yup';
import { playbookSchema } from './serviceTemplateAnsiblePlaybook';

export const playbooksSchema = array()
  .of(playbookSchema)
  .nullable();
