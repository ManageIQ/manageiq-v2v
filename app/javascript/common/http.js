const { http } = window;

export default {
  get(url, headers = {}, params = {}) {
    return http.get(url, {
      transformResponse: e => ({ data: e }),
      headers,
      params
    });
  },
  post(url, data = {}, headers = {}) {
    return http.post(url, data, {
      headers,
      transformResponse: e => ({ data: e })
    });
  }
};
