import getMostRecentRequest from '../common/getMostRecentRequest';
import { urlBuilder } from './components/Migrations/helpers';
import { TRANSFORMATION_PLAN_REQUESTS_URL } from './OverviewConstants';

export const notStartedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => transformationPlan.miq_requests.length === 0);

export const activeTransformationPlansFilter = (transformationPlans, planId) =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.id === planId) {
      return true;
    }
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return (
        mostRecentRequest.request_state === 'active' ||
        mostRecentRequest.request_state === 'pending' ||
        (mostRecentRequest.approval_state === 'denied' && !mostRecentRequest.options.denial_acknowledged)
      );
    }
    return false;
  });

export const finishedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return (
        (mostRecentRequest.request_state === 'finished' && mostRecentRequest.approval_state !== 'denied') ||
        mostRecentRequest.request_state === 'failed' ||
        (mostRecentRequest.approval_state === 'denied' && mostRecentRequest.options.denial_acknowledged)
      );
    }
    return false;
  });

export const finishedWithErrorTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return (
        (mostRecentRequest.request_state === 'finished' && mostRecentRequest.status === 'Error') ||
        mostRecentRequest.approval_state === 'denied'
      );
    }
    return false;
  });

export const requestsProcessingCancellationFilter = transformationPlans =>
  transformationPlans.reduce((requests, plan) => {
    if (plan.miq_requests.length) {
      const mostRecentRequest = getMostRecentRequest(plan.miq_requests);

      if (mostRecentRequest.cancelation_status) {
        return [...requests, urlBuilder(TRANSFORMATION_PLAN_REQUESTS_URL, mostRecentRequest.id)];
      }
    }
    return requests;
  }, []);

export const combineRequestsProcessingCancellation = (requestsFromMemory, requestsFromDb) => [
  ...new Set([...requestsFromMemory, ...requestsFromDb])
];
