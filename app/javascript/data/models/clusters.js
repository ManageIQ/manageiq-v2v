import { array, string, object } from 'yup';

export const clustersSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      ems_id: string().required(),
      uid_ems: string().required(),
      ext_management_system: object()
        .shape({
          emstype: string().required(),
          name: string().required()
        })
        .required(),
      v_parent_datacenter: string().nullable()
    })
  )
  .nullable();
