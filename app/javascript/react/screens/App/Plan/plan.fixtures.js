import { transformationPlans } from '../Overview/overview.transformationPlans.fixtures';

const [planQueued, , planInProgressOne, planFailed, planComplete, planInProgressTwo] = transformationPlans.resources;

const planStore = {
  [planQueued.id]: planQueued,
  [planInProgressOne.id]: planInProgressOne,
  [planInProgressTwo.id]: planInProgressTwo,
  [planFailed.id]: planFailed,
  [planComplete.id]: planComplete
};

export const requestPlanData = id => ({
  method: 'GET',
  fetchPlanUrl: '/api/dummyPlan',
  response: { data: planStore[id] }
});
