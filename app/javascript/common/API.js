const { API } = window;

export default {
  get(url, headers = {}, params = {}) {
    return API.get(url, {
      transformResponse: e => ({ data: e }),
      headers,
      params
    });
  },
  put(url, data = {}, headers = {}) {
    return API.put(url, data, {
      headers
    });
  },
  post(url, data = {}, headers = {}) {
    return API.post(url, data, {
      headers,
      transformResponse: e => ({ data: e })
    });
  },
  delete(url, headers = {}) {
    return API.delete(url, {
      headers
    });
  },
  patch(url, data = {}, headers = {}) {
    return API.patch(url, data, {
      headers
    });
  }
};
