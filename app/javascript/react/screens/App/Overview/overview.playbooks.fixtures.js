import Immutable from 'seamless-immutable';

export const playbooks = Immutable({
  resources: [
    {
      href: 'http://0.0.0.0:8080/api/service_templates/1',
      name: 'create file',
      description: '',
      created_at: '2018-07-20T19:39:01Z',
      id: '1'
    },
    {
      href: 'http://0.0.0.0:8080/api/service_templates/2',
      name: 'delete-file',
      description: '',
      created_at: '2018-07-20T19:40:02Z',
      id: '2'
    }
  ]
});
