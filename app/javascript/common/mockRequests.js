let mockedRequests;

export const APImock = {
  reset: () => {
    mockedRequests = { GET: {}, POST: {}, PUT: {}, PATCH: {}, DELETE: {} };
  },
  mock: (method, url, status, response) => {
    mockedRequests[method][url] = { status, response };
  },
  respond: (method, url) => {
    const mockMatchingUrl = mockedRequests[method][url];
    const mocksMatchingMethod = Object.values(mockedRequests[method]);
    const mocked = mockMatchingUrl || (mocksMatchingMethod.length > 0 && mocksMatchingMethod[0]);
    if (mocked) {
      if (mocked.status === 200) {
        return Promise.resolve(mocked.response);
      }
      return Promise.reject(new Error('<mocked error>'));
    }
    return Promise.reject(new Error(`<no such mocked request ${method} ${url}>`));
  }
};

export const mockRequest = ({ method = 'GET', url, status = 200, response = null }) =>
  APImock.mock(method, url, status, response);

export const mockReset = () => APImock.reset();
