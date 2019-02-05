import { attachTargetProvider } from '../helpers';
import { TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES } from '../../Mappings/screens/MappingWizard/MappingWizardConstants';

describe('attachTargetProvider', () => {
  const { rhevm } = TRANSFORMATION_MAPPING_ITEM_DESTINATION_TYPES;

  test('does not modify orphaned plans (plans whose mapping has been deleted)', () => {
    const plan = { name: 'plan' };
    const result = attachTargetProvider(plan);
    expect(result).toEqual(plan);
  });

  test('finds the target provider through the cluster mapping and adds it to the plan', () => {
    const targetClusterId = '1';
    const providerId = '2';
    const plan = {
      transformation_mapping: {
        transformation_mapping_items: [
          { destination_type: rhevm.cluster, destination_id: targetClusterId },
          { destination_type: rhevm.datastore },
          { destination_type: rhevm.network }
        ]
      }
    };
    const clusters = [{ id: targetClusterId, ems_id: providerId }];
    const provider = { id: providerId };
    const result = attachTargetProvider(plan, [provider], clusters, 'rhevm');

    expect(result).toEqual({ ...plan, targetProvider: provider });
  });
});
