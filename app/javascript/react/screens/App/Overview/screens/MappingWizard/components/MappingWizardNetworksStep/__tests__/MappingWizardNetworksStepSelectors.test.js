import { sourceClusterNetworks } from '../mappingWizardNetworksStep.fixtures';
import { uniqueNetworks } from '../MappingWizardNetworksStepSelectors';

test('uniqueNetworks creates a mapping of grouped networks', () => {
  const sourceNetworks = sourceClusterNetworks[0].lans;

  expect(uniqueNetworks(sourceNetworks)).toMatchSnapshot();
});
