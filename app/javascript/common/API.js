import axios from 'axios';

const getAuthToken = () =>
  localStorage.miq_token ? localStorage.miq_token : '';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-Auth-Token'] = getAuthToken();

export default {
  get(url, headers = {}, params = {}) {
    return axios.get(url, {
      headers,
      params
    });
  },
  put(url, data = {}, headers = {}) {
    return axios.put(url, data, {
      headers
    });
  },
  post(url, data = {}, headers = {}) {
    return axios.post(url, data, {
      headers
    });
  },
  delete(url, headers = {}) {
    return axios.delete(url, {
      headers
    });
  },
  patch(url, data = {}, headers = {}) {
    return axios.patch(url, data, {
      headers
    });
  }
};

export const globalMockMode = true;

export const globalLocalStorageMode = true;
