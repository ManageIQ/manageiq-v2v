import Immutable from 'seamless-immutable';

export const servers = Immutable({
  name: 'servers',
  count: 2,
  subcount: 2,
  pages: 1,
  resources: [
    {
      href: 'http://0.0.0.0:8080/api/servers/42000000000001'
    },
    {
      href: 'http://0.0.0.0:8080/api/servers/42000000000002'
    }
  ]
});

export const settings = Immutable({
  transformation: {
    limits: {
      max_concurrent_tasks_per_host: 10,
      max_concurrent_tasks_per_ems: 10
    }
  },
  otherSettings: {
    mock: 'data'
  }
});

export const settingsFormValues = Immutable({
  max_concurrent_tasks_per_host: 10,
  max_concurrent_tasks_per_ems: 10
});

export const fetchServersData = {
  method: 'GET',
  fetchServersUrl: '/api/servers?expand=resources',
  response: { data: servers }
};

export const fetchSettingsData = {
  method: 'GET',
  fetchSettingsUrl: '/api/settings',
  response: { data: settings }
};

export const patchSettingsData = {
  method: 'PATCH',
  response: { data: settings }
};
