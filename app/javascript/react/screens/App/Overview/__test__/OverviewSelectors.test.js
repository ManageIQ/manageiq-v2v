import {
  notStartedTransformationPlansFilter,
  activeTransformationPlansFilter,
  finishedTransformationPlansFilter,
  requestsProcessingCancellationFilter,
  attachTargetProviderToOspPlans
} from '../OverviewSelectors';
import { urlBuilder } from '../components/Migrations/helpers';
import { transformationPlans } from '../overview.transformationPlans.fixtures';
import { TRANSFORMATION_PLAN_REQUESTS_URL } from '../OverviewConstants';
import { TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES } from '../../Mappings/screens/MappingWizard/MappingWizardConstants';

const { resources: plans } = transformationPlans;

describe('notStartedTransformationPlansFilter', () => {
  test('returns all pending transformation plans', () => {
    const [pendingPlan] = plans;
    const result = notStartedTransformationPlansFilter(plans);

    expect(result).toEqual([pendingPlan]);
  });
});

describe('activeTransformationPlansFilter', () => {
  test('returns all active transformation plans', () => {
    const [
      ,
      activePlanOne,
      activePlanTwo,
      ,
      ,
      activePlanThree,
      activePlanFour,
      activePlan5,
      activePlan6,
      activePlan7
    ] = plans;
    const result = activeTransformationPlansFilter(plans);

    expect(result).toEqual([
      activePlanOne,
      activePlanTwo,
      activePlanThree,
      activePlanFour,
      activePlan5,
      activePlan6,
      activePlan7
    ]);
  });
});

describe('finishedTransformationPlansFilter', () => {
  test('returns all finished (complete or failed) transformation plans', () => {
    const [, , , finishedPlanOne, finishedPlanTwo] = plans;
    const result = finishedTransformationPlansFilter(plans);

    expect(result).toEqual([finishedPlanOne, finishedPlanTwo]);
  });
});

describe('requestsProcessingCancellationFilter', () => {
  test('returns all requests processing cancellation', () => {
    const plan = plans[6];
    const [requestProcessingCancellation] = plan.miq_requests;
    const url = urlBuilder(TRANSFORMATION_PLAN_REQUESTS_URL, requestProcessingCancellation.id);
    const result = requestsProcessingCancellationFilter(plans);

    expect(result).toEqual([url]);
  });
});

describe('attachTargetProviderToOspPlans', () => {
  const { openstack, rhevm } = TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES;
  const providerId = '1';
  const ospPlan = {
    transformation_mapping: {
      transformation_mapping_items: [
        { destination_type: openstack.cluster, destination_id: '1' },
        { destination_type: openstack.datastore },
        { destination_type: openstack.network }
      ]
    }
  };
  const provider = {
    id: providerId
  };
  const cloudTenants = [
    {
      id: '1',
      ems_id: providerId
    }
  ];

  test('adds the matching target OSP provider to each plan', () => {
    const result = attachTargetProviderToOspPlans([ospPlan], [provider], cloudTenants);
    expect(result).toEqual([{ ...ospPlan, targetProvider: provider }]);
  });

  test('does not modify orphaned plans (plans whose mapping has been deleted)', () => {
    const ospPlans = [{ name: 'plan' }];
    const result = attachTargetProviderToOspPlans(ospPlans, [provider], cloudTenants);
    expect(result).toEqual(ospPlans);
  });

  test('does not modify non-OSP plans', () => {
    const rhvPlan = {
      transformation_mapping: {
        transformation_mapping_items: [{ destination_type: rhevm.cluster, destination_id: '1' }]
      }
    };
    const result = attachTargetProviderToOspPlans([rhvPlan], [provider], cloudTenants);
    expect(result).toEqual([rhvPlan]);
  });
});
