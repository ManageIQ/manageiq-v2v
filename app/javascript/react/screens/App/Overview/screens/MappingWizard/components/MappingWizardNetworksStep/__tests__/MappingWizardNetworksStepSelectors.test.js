import { sourceClusterNetworks } from '../mappingWizardNetworksStep.fixtures';
import { groupByUidEms } from '../MappingWizardNetworksStepSelectors';

test('groupByUidEms creates a mapping of networks organized by uid_ems', () => {
  const sourceNetworks = sourceClusterNetworks[0].lans;

  expect(groupByUidEms(sourceNetworks)).toMatchSnapshot();
});
