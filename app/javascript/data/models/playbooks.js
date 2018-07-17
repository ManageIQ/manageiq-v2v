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

export const PLAYBOOK_JOB_STATES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  FINISHED: 'finished'
};

export const PLAYBOOK_JOB_STATUS = {
  OK: 'Ok',
  ERROR: 'Error'
};
