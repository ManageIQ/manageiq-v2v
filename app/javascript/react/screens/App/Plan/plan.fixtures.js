import { transformationPlans } from '../Overview/overview.transformationPlans.fixtures';

const [
  planQueued,
  ,
  planInProgressOne,
  ,
  ,
  planInProgressTwo
] = transformationPlans.resources;

const planStore = {
  [planQueued.id]: planQueued,
  [planInProgressOne.id]: planInProgressOne,
  [planInProgressTwo.id]: planInProgressTwo
};

export const requestPlanData = id => ({
  method: 'GET',
  fetchPlanUrl: '/api/dummyPlan',
  response: { data: planStore[id] }
});
