export const getCancellationRequestIds = requestsWithTasks => {
  const cancellationRequestIds = [];
  for (const request of requestsWithTasks) {
    for (const task of request.miq_request_tasks) {
      if (task.options.cancellation_request_id) {
        cancellationRequestIds.push(task.options.cancellation_request_id);
      }
    }
  }
  // to return a mock cancellation task, just return a request that you know exists...
  // return [{ href: 'http://0.0.0.0:8080/api/requests/3' }];
  return cancellationRequestIds;
};
